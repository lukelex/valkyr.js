#Valkyr.js

[![Build Status](https://travis-ci.org/lukelex/valkyr.js.png)](https://travis-ci.org/lukelex/valkyr.js) [![Code Climate](https://codeclimate.com/github/lukelex/valkyr.js.png)](https://codeclimate.com/github/lukelex/valkyr.js)

*The power of judgment over your forms!*

ValkyrJS is the first validation library that has all the following characteristics at the same time:

* Friendly API;
* No external dependencies;
* Well tested (jasmine);
* Readable well-written codebase;
* Rules extensibility;
* Rules inheritance.

##Usage

ValkyrJS needs only two parameters to start of, the form element and a list of constraints to compose the rules. For each constraint you need to pass in the name of the element to be validated, as in `name="username"`, and the rules that should be applyed to it.

```html
<form action="/signin" method="post">
  <input type="text" name="email" />
  <input type="password" name="password" />
</form>
```
```javascript
var form = document.forms[0];

validator(form, [{
  name: "email",
  rules: "email"
}, {
  name: "password",
  rules: "required"
}]).onError(function(errors){
  // handle and display your errors
});
```

A more complex example:

```html
<form action="/signup" method="post">
  <input type="text" name="name" />
  <input type="text" name="email" />
  <input type="text" name="age" />
  <input type="password" name="password" />
  <input type="password" name="password_confirmation" />
  <input type="checkbox" name="terms" />
</form>
```

```javascript
var form = document.forms[0];

validator(form, [{
  name: "name",
  rules: "minLength[4]"
},{
  name: "email",
  rules: "email"
},{
  name: "age",
  rules: "numeric"
},{
  name: "password",
  rules: "required"
},{
  name: "password_confirmation",
  rules: "required|equals[password]"
},{
  name: "terms",
  rules: "required"
}]).onError(function(errors){
  console.log(errors);
});
```

##Available Rules

* **required**       - sets the field as mandatory;
* **email**          - checks for a valid email;
* **url**            - checks for a valid URL;
* **minLength[n]**   - checks the minimum length of the value;
* **maxLength[n]**   - checks the maximum length of the value;
* **exactLength[n]** - checks the exact length of the value;
* **numeric**        - checks for a numeric value;
* **integer**        - checks for a valid integer number;
* **decimal**        - checks for a valid decimal number;
* **natural**        - checks for a valid natural number;
* **alphabetical**   - checks if it's composed of only A-Z charactes;
* **equals[field]**  - checks equality between two fields;
* **credit-card**    - checks for a valid credit card number;
* **ip**             - checks for a valid IP number;

##Constraint options
While declaring the form constraints you can set some extra options:

```jacascript
validator(form, [{
  ...
  as: "" // change the name that should be displayed in the error message
}]);
```

##On-demand Validation
Sometimes you will need to check if your form is in a valid state without trigering the submit. ValkyrJS also helps you with that.

```javascript
var form = document.forms[0];

var signUpForm = validator(form, [{...}]);

signUpForm.validate(); // this will update the `errors` variable with the current state of the form
signUpForm.errors; // {email: [...], password: [...]}

// or if you don't care about the errors and just want to know if the form is valid

signUpForm.isValid() // true or false
```

##Custom Rules
Often you will need to define your own rules. ValkyrJS offers you a clean way to do it.

```javascript
valkyr.Rule.build({
  name: "negative",
  message: "The %s field must be a negative number.",
  validator: function (value) {
    return value < 0;
  }
});

validator(form, [{
  ...
  rules: "negative"
}]);
```

##Rule inheritance
Rules can be extended and composed based on previously defined rules throught the use of the `inherits` param. This allow rules to have sharable validations.

Example: a VISA credit card validation would check if the credit card number starts with a `4` but would also verify if the overall number is a valid credit card. Since ValkyrJS already has the `credit-card` rule pre-defined you can just create the VISA rule and inherit from it.

```javascript
valkyr.Rule.build({
  name: "VISA",
  message: "The %s field does not have a valid VISA credit-card number.",
  inherits: "credit-card"
  validator: function(number){
    return !!number.match(/^4/);
  }
})
```

**You can inherit from any rule, either pre-defined by ValkyrJS or you**
