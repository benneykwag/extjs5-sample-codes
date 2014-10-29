Ext.onReady(function () {

    Ext.define('MyClass', { // ①
        extend: 'Ext.panel.Panel', // ②

        initComponent: function () { // ③
            var me = this;
            Ext.apply(this, {
                title: '안녕하세요 환영합니다.^^',
                items: [
                    {
                        xtype: 'button' ,
                        text : 'Click Me!'
                    }
                ]
            });
            this.callParent(arguments); // ④
        }
    });

    var myClass = Ext.create('MyClass', { // ⑤
        renderTo: document.body
    });


    var panel = Ext.create('Ext.panel.Panel', {
        title: '안녕하세요 환영합니다.^^',
        items: [
            {
                xtype: 'button' ,
                text : 'Click Me!'
            }
        ],
        renderTo: document.body
    });


});