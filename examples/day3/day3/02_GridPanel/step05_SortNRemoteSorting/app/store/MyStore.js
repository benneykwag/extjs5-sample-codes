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
    // extjs에서 소트를 적용한다.
    sorters: [
        'customName',
        { property: 'orderAmount', direction: 'ASC'}
    ]
    // 서버에 소트정보를 보내고 extjs에서는 소트처리하지 않는다.
//    remoteSort:true
});