import {inject, customElement} from 'aurelia-framework';
import {Config as ViewManager} from 'aurelia-view-manager';
import {Configuration} from 'aurelia-config';

@inject(ViewManager, Configuration.of('aurelia-form'))
@customElement('form-group')
export class FormGroup {

  constructor(viewManager, config) {
    this.viewManager = viewManager;
  }

  @bindable
  visible

  @bindable
  formType = 'horizontal';

  labelChanged(label) {
    if (typeof label === 'string') {
      this.label = {
        name: label
      };
    }
  }

}
