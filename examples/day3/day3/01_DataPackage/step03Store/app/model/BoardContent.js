Ext.define('MyApp.model.BoardContent', {
    extend: 'Ext.data.Model',
    idProperty: 'contentId',
    fields: [
        {
            name: 'boardId',
            type: 'int'
        },
        {
            name: 'contentId',
            type: 'int'
        },
        {
            name: 'subject',
            type: 'string'
        },
        {
            name: 'createEmail',
            type: 'string'
        },
        {
            name: 'content',
            type: 'string'
        },
        {
            name: 'createDate',
            type: 'date',
            dateFormat: 'Y.m.d'
        },
        {
            name: 'updateDate',
            type: 'date',
            dateFormat: 'Y.m.d'
        },
        {
            name: 'removeDate',
            type: 'date',
            dateFormat: 'Y.m.d'
        },
        {
            name: 'readCount',
            type: 'int'
        },
        {
            name: 'deleteYn',
            type: 'boolean',
            defaultValue: false
        }
    ],

    /*proxy: {
        type: 'ajax',
        actionMethods: {
            read: 'GET',
            create: 'POST',
            update: 'POST',
            destroy: 'POST'
        },
        api: {
            read: 'data/boardContent.json?read',
            create: 'data/boardContent.json?create',
            update: 'data/boardContent.json?update',
            destroy: 'data/boardContent.json?destroy'
        },
        reader: {
            type: 'json',
            root: 'data'
        }
    }*/
});
