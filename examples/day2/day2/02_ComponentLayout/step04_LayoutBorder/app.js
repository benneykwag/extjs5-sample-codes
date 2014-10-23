Ext.onReady(function() {

Ext.create('Ext.container.Viewport', {  // #1
    layout : 'border',          // #2
    items : [ {
        region : 'north',       // #3
        title : 'north',
        margins : 5,
        height : 100,           // #4
        xtype : 'panel'
    }, {
        title : 'West',
        region : 'west',        // #5
        margins : '0 5 0 5',
        width : 100,
        collapsible : true,     // #6
        split : true,
        titleCollapse : true    // #7
    }, {
        title : 'Center',
        region : 'center'       // #8
    }, {
        title : 'East',
        region : 'east',        // #9
        margins : '0 5 0 5',
        flex :.5,               // #10
        collapsible : true,     // #11
        collapsed : false       // #12
    }, {
        title : 'South',
        region : 'south',       // #13
        margins : '0 5 5 5',
        flex : .3,              // #14
        split : true
    } ]
});

});
