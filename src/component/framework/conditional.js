import {BindingEngine, inject} from 'aurelia-framework';
import {logger}                from '../../logger';

@inject(BindingEngine)
export class Conditional {

  constructor(bindingEngine) {
    this.bindingEngine = bindingEngine;
  }

  activate(field) {
    this.field = field;
    this.schema    = [];
    this.observers = [];

    let calculateSchema = () => {
      let schema = field.element.schema(field);

      if (Array.isArray(schema)) {
        this.schema = schema;

        return schema;
      }

      if (isPromise(schema)) {
        return schema.then(resolved => {
          this.schema = resolved;
        });
      }

      logger.error(`${field.element.type} does not return a schema`);
    };

    calculateSchema();

    if (!field.element.observe) {
      return logger.warn(`${field.element.key} does not have observers`);
    }

    let observe = Array.isArray(field.element.observe)
      ? field.element.observe
      : [field.element.observe];

    this.observers = observe.map(prop => {
      return this.bindingEngine
        .propertyObserver(field.model, prop)
        .subscribe(calculateSchema.bind(this));
    });
  }

  deactivate() {
    this.observers && this.observers.map(observer => observer.dispose());
  }

}

function isPromise(value) {
  return (value instanceof Promise);
}
