Ext.Loader.setConfig({
    enabled: true
});
Ext.Loader.setPath('MyApp', 'app');

Ext.require([
    'Ext.layout.container.Table',
    'Ext.ux.*'
]);

Ext.onReady(function () {
    Ext.create('MyApp.view.MyGrid', {
        renderTo : document.body
    })
});