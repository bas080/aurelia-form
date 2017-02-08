import {customElement, bindable, bindingMode} from 'aurelia-framework';

@customElement('form-input')
export class FormInput {

  @bindable
  element

  @bindable({defaultBindingMode: bindingMode.twoWay})
  value;

  @bindable
  @children('form-option')
  options;

  @bindable
  disabled = false;

  @computedFrom('element')
  get elementPath() {
    return this.viewManager.resolve('spoonx/form', this.element);
  }

  @computedFrom('elementPath')
  get isViewOnlyInputElement() {
    return this.elementPath.endsWith('.html');
  }

}
