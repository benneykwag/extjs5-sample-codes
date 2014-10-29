Ext.define('MyCustomTabPanel', {
    extend: 'Ext.Component',
    initComponent: function () {
        var me = this;

        Ext.apply(this, {
            html: me.setTabTpl()
        });

        me.callParent(arguments);

    },

    setTabTpl : function(){
        return new Ext.XTemplate(
            '<div class="main_dashboard">',
                '<div class="tab_bg">',
                    '<ul class="dashboard_tab_menu">',
                        '<li><a href="#" class="tab1 on">탭1번</a></li>',
                        '<li><a href="#" class="tab2 on">탭2번</a></li>',
                        '<li><a href="#" class="tab3">탭3번</a></li>',
                        '<li><a href="#" class="tab4">탭4번</a></li>',
                    '</ul>',
                '</div>',
            '</div>'
        );
    }
});

Ext.onReady(function () {

    Ext.create('MyCustomTabPanel', {
        renderTo : document.body,
        listeners :{
            afterrender : function(){
                Ext.select('.x-border-box').removeCls('x-border-box');
            }
        }
    });
});