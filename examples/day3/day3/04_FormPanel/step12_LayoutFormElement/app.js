Ext.Loader.setPath('MyApp', 'app');

Ext.require('MyApp.view.CheckOutMaster');

Ext.onReady(function () {

    Ext.create('Ext.container.Viewport', {
        layout : 'vbox',
        items: [
            {
                xtype: 'checkoutmaster'
            }
        ]
    });

});
