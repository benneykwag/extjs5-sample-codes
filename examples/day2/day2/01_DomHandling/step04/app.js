Ext.define('MyCustomTabPanel', {
    extend: 'Ext.Component',
    alias: 'widget.mycustomtabpanel',

    onRender: function () {
        this.callParent(arguments);
        Ext.core.DomHelper.append(this.getEl(),
            '<div class="main_dashboard">' +
                '<div class="tab_bg">' +
                '<ul class="dashboard_tab_menu" id="ulroot">' +
                '<li><a href="http://www.daum.net" class="">탭1번</a></li>' +
                '<li><a href="#" class="on">탭2번</a></li>' +
                '<li><a href="#" class="">탭3번</a></li>' +
                '</ul>' +
                '</div>' +
                '</div>'
        )
    },

    initComponent: function () {
        var me = this;

        me.callParent(arguments);
        me.on('afterrender', function () {
            me.el.on("click", function (eventObj, htmlElement) {
                var targetA = Ext.get(htmlElement).up('.dashboard_tab_menu').query('a');

                Ext.each(targetA, function (item, idx) {
                    console.log(idx, ':', Ext.get(item).removeCls('on'))
                });
                Ext.get(htmlElement).addCls('on');

            }, me, {
                delegate: "a",
                preventDefault: true
            });
        });
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


});