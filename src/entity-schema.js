import extend from 'extend';

/**
 * Takes an entity and uses it's metadata to generate a form-schema. Entities
 * behave like normal objects in the way one can get and set the values on
 * it's properties.
 *
 * @param {object} entity
 *
 * @returns {object[]} a schema consisting out of element objects
 */
export function entitySchema(entity) {
  let metadata      = entity.getMeta();
  let types         = metadata.fetch('types') || {};
  let associations  = metadata.fetch('associations');
  let data          = metadata.fetch('data') || {};
  let schema        = [];
  let entityManager = entity.getRepository().entityManager;

  let isAssociation = key => Boolean(associations[key]);


  let isCollectionAssociation = key => associations[key].type === 'collection';

  for (let key of Object.keys(entity)) {
    /* should be fixed in orm */
    if (key === '__validationReporter__') {
      continue;
    }

    let element = {
      key: key,
      type: types[key]
    };

    if (isAssociation(key)) {
      let where = element.where || {};

      element.type    = 'computed';
      element.observe = Object.keys(where);
      element.schema  = field => {
        let query = Object.keys(where).reduce((result, attr) => {
          //make sure the id and not the entity is being used
          result[attr] = entityId(where[attr](entity));

          return result;
        }, {});

        let repository = isAssociation(key) ? entityManager.getRepository(associations[key].entity) : undefined;

        return repository.find(query).then(entries => {

          if (isCollectionAssociation(key)) {
            field.model[key] = field.model[key].map(ent => ent[element.idName || 'id']);
          } else {
            field.model[key] = field.model[key][element.idName || 'id'];
          }

          return [{
            key: key,
            type: 'options',
            multiple: isCollectionAssociation(key),
            options: entries.map(entry => {
              return {
                value: entry[element.idName || 'id'],
                name: entry[element.name || 'name']
              };
            })
          }];
        });
      };
    }

    element = extend(true, element, data[key] ? data[key].form || {} : {});

    schema.push(element);
  }

  return schema;
}


function entityId(entity) {
  if (typeof entity === 'object' && entity !== null) {
    entity.getId();
  }

  return entity;
}
