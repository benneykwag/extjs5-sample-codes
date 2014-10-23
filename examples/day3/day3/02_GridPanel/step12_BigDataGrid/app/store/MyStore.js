Ext.define('MyApp.store.MyStore', {
    extend: 'Ext.data.Store',
    model: 'MyApp.model.MyModel',
    pageSize: 50,
//    buffered : true,
    proxy: {
        type: 'jsonp',
        url: 'http://www.sencha.com/forum/remote_topics/index.php',
        reader: {
            root: 'topics',
            totalProperty: 'totalCount'
        }
    },
    autoLoad: true
});

