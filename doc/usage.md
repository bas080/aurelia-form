# Usage

Aurelia form makes it possible for you to programmatically generate forms.

I assume you have done a `jspm install aurelia-form`. The next step is
registering aurelia-form as a plugin in your aurelia project.

## Configure

> main.js

```js

  .plugin('aurelia-form')

```

See the [configuration](doc/configuration.md) section.

## View Model

This is an aurelia view model. It can be the view model of a component or
a page.

> page.js

```js

export class Page {
  constructor() {
    let schema = [{
      key: 'email',
      type: 'string'
    },{
      key: 'password',
      type: 'string'
    }];

    let credentials = {
      email: '',
      password: ''
    };

    let submit = (credentials) => {
      console.log(credentials);
    };

    this.loginForm = {schema, credentials, submit};
  }
}
```

## View

In this template you can see how to use one of the [components](doc/components.md)
aurelia-form has to offer.

> page.html

```html
<template>

  <schema-form
    submit.delegate="loginForm.submit(loginForm.credentials)"
    schema.bind="this.loginForm.schema"
    model.bind="this.loginForm.credentials"
  ></schema-form>

<template>

```

If done correctly you should see an HTML form when this component activates.
