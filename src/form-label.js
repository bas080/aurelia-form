import {bindable, customElement} from 'aurelia-framework';

@customElement('form-label')
export class FormLabel {

  @bindable
  label

  @bindable
  formType = 'horizontal'

}
