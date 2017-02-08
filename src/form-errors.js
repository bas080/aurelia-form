import {customElement, bindable} from 'aurelia-framework';

@customElement('form-errors')
@inject(Configuration.of('aurelia-form'))
export class FormErrors {

  @bindable
  errors = []

  constructor(formConfig) {
    this.formConfig = formConfig;
  }

  @computedFrom('errors')
  get messages() {
    return this.formConfig.formErrors.messages(this.errors);
  }

}
