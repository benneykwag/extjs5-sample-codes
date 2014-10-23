Ext.Loader.setConfig({
    enabled: true
});
Ext.Loader.setPath('MyApp', 'app');

Ext.onReady(function () {
    Ext.create('MyApp.view.MyGrid', {
        renderTo : document.body
    })
});