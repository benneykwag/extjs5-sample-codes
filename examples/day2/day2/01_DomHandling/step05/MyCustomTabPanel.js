Ext.define('MyCustomTabPanel', {
    extend: 'Ext.Component',
    alias: 'widget.mycustomtabpanel',

    onRender: function () {
        this.callParent(arguments);
        Ext.core.DomHelper.append(this.getEl(),
            '<div class="main_dashboard">' +
                '<div class="tab_bg">' +
                '<ul class="dashboard_tab_menu" id="ulroot">' +
                '</ul>' +
                '</div>' +
                '</div>'
        );

        this.setTabMenu();
    },

    setTabMenu: function(){
        var root = this.el.select('.dashboard_tab_menu').first();

        var html = '<li><a href="#" tabidx="{tabIdx}" class="{tabCls}">{tabName}</a></li>';

        var tpl = Ext.DomHelper.createTemplate(html);

        Ext.Ajax.request({
            url : 'tablist.json',
            method : 'GET',
            success : function(result, request){
                var obj = Ext.JSON.decode(result.responseText);
                console.log(obj.entitys);
                Ext.each(obj.entitys, function(item){
                    tpl.append(root, item);
                });
            },
            failure : function(result, request){
                Ext.Msg.alert("Fail", result.responseText);
            }
        })
    },

    initComponent: function () {
        var me = this;

        me.callParent(arguments);
        me.on('afterrender', function () {
            me.el.on("click", function (eventObj, htmlElement) {
                var targetA = Ext.get(htmlElement).up('.dashboard_tab_menu').query('a');

                Ext.each(targetA, function (item, idx) {
                   Ext.get(item).removeCls('on');
                });
                Ext.get(htmlElement).addCls('on');

                var idx = Ext.get(htmlElement).getAttribute('tabIdx');

                me.fireEvent('tabselect', idx);

            }, me, {
                delegate: "a",
                preventDefault: true
            });
        });
    }
});