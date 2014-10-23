Ext.define('MyCustomTabPanel', {
    extend: 'Ext.container.Container',

    initComponent: function () {
        var me = this;

        Ext.apply(this, {
            cls: 'main_dashboard',
            autoEl: 'div',
            items: [
                {
                    xtype: 'container',
                    cls: 'tab_bg',
                    items: [
                        {
                            xtype: 'container',
                            autoEl: 'ul',
                            id: 'ulroot',
                            cls: 'dashboard_tab_menu',
                            items: [
                                {
                                    xtype: 'component',
                                    autoEl: 'li',
                                    html: '<a href="#" tabIdx="0">탭1번</a>'
                                },
                                {
                                    xtype: 'component',
                                    autoEl: 'li',
                                    html: '<a href="#" tabIdx="1" class="on">탭2번</a>'
                                },
                                {
                                    xtype: 'component',
                                    autoEl: 'li',
                                    html: '<a href="#" tabIdx="2">탭3번</a>'
                                }
                            ]
                        }
                    ]
                }
            ]
        });
        me.callParent(arguments);
    }
});

Ext.onReady(function () {

    Ext.create('MyCustomTabPanel', {
        renderTo: document.body,
        listeners: {
            afterrender: function () {
                Ext.select('.x-border-box').removeCls('x-border-box');
            }
        }
    });

    var insertBefore = Ext.select('li').item(1);

    console.log(insertBefore);

    var root = Ext.select('#ulroot-innerCt').first();

    console.log(root);

    root.createChild('<li><a href="#">탭90</a></li>');

    var html = '<li><a href="#" tabIdx="{idx}" class="{tabCls}">{tabName}</a></li>';

    var tpl = Ext.DomHelper.createTemplate(html);
    for(var i=0; i<2; i++){
        tpl.append(root, {
            tabIdx : i,
            tabCls : '',
            tabName : "탭"+i
        });
    }

});