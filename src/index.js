import {Config as ViewManager}     from 'aurelia-view-manager';

function configure(aurelia, config) {

  aurelia.globalResources([
    'form-description',
    'form-group',
    'form-input-group',
    'form-input',
    'form-label',
    'form-option',
    'form-errors'
  ]);

  //@todo: make viewManager use aurelia-config;
  aurelia.container.get(ViewManager).configureNamespace('spoonx/form', {
  });

}

const config = {

  formGroup: {
    visible: () => true
  },

  formErrors: {
    errorMessages: errorMessages
  }

};

export {
  config,
  configure
}

function errorMessages(messages) {
  return messages.reduce((errors, message) => {
    if (message.valid === false) {
      errors.push(message.message);
    }

    return errors;
  }, []);
}
