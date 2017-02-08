import {bindable, customElement} from 'aurelia-framework';

@customElement('form-input-group')
export class FormInputGroup {

  @bindable
  type;

  bind() {
    if (typeof this.type !== 'string') {
      logger.error(`<form-input-group> expects type bindable to be a string of value 'btn' or 'addon'`, this.type);
    }
  }

}
