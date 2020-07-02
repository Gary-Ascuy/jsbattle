const DbService = require("moleculer-db");
const getDbAdapterConfig = require("../../lib/getDbAdapterConfig.js");
const validators = require("../../validators");

module.exports = (config) => {

  let adapterConfig = getDbAdapterConfig(config.data, 'scriptStore');

  return {
    ...adapterConfig,
    name: "scriptStore",
    mixins: [DbService],
    settings: {
      idField: 'id',
      fields: [
        "id",
        "ownerId",
        "ownerName",
        "scriptName",
        "namespace",
        "code",
        "createdAt",
        "modifiedAt",
        "hash",
      ],
      entityValidator: {
        ownerId: validators.entityId(),
        ownerName: validators.entityName(),
        scriptName: validators.entityName(),
        code: validators.code(),
        namespace: validators.entityName(),
        createdAt: validators.createDate(),
        modifiedAt: validators.modifyDate(),
        hash: validators.hash({optional: true})
      }
    },
    actions: {
      listUserScripts: require('./actions/listUserScripts.js'),
      createUserScript: {
        params: {
          scriptName: validators.entityName({optional: true}),
          code: validators.code({optional: true})
        },
        handler: require('./actions/createUserScript.js')
      },
      updateUserScript: {
        params: {
          id: validators.entityId(),
          scriptName: validators.entityName({optional: true}),
          code: validators.code({optional: true})
        },
        handler: require('./actions/updateUserScript.js')
      },
      getUserScript: {
        params: {
          id: validators.entityId()
        },
        handler: require('./actions/getUserScript.js')
      },
      deleteUserScript: {
        params: {
          id: validators.entityId()
        },
        handler: require('./actions/deleteUserScript.js')
      }
    },
    hooks: {
      before: {
        create: [require('./hooks/create.js')],
        update: [require('./hooks/update.js')]
      }
    }
  };
};
