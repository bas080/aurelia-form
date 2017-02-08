import {bindable, customElement} from 'aurelia-framework';

@customElement('form-option')
export class FormOption {

  @bindable name
  @bindable value

  @computedFrom('name', 'value')
  get value() {
    return this.value || this.name;
  }

  @computedFrom('name', 'value')
  get name() {
    return this.name || this.value
  }

}
