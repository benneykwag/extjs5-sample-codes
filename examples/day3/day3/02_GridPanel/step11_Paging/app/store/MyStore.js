Ext.define('MyApp.store.MyStore', {
    extend: 'Ext.data.Store',
    autoLoad: true,
    model: 'MyApp.model.MyModel',
    proxy: {
        url: 'data.json',
        type: 'ajax',
        reader: {
            type: 'json',
            root: 'items',
            totalProperty : 'totalCount'
        }
    },
    pageSize:10
});