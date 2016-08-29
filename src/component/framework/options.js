import {logger} from '../../aurelia-form';
import {isPrimitive} from 'isPrimitive';

export class Options {

  constructor(bindingEngine) {
    this.bindingEngine = bindingEngine;
  }

  detached() {
    this.subscription.dispose();
  }

  activate(model) {
    let options = model.element.options;

    if (isPrimitive(options)) {
      logger.error('element \'s options should be an array, promise or function');
    }

    this.subscription = bindingEngine.propertyObserver('options', model.element).subscribe(optionsChanged);
  }

  optionsChanged(options) {
    if (typeof options === 'function') {
      model.element.options = model.element.options(model.model);
    }

    this.model.element.options = model.element.options(this.mode.model);
  }

}
