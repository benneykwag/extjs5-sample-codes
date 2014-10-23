Ext.define('MyApp.view.CodeComboBox', {
    extend: 'Ext.form.field.ComboBox',  // #1
    xtype: 'codecombo',                 // #2
    displayField: 'codeNm',
    valueField: 'codeCd',
    config: {               // #3
        filterFld : 'grpCd', // #4
        filterCd: 'G000',   // #5
        preload : false     // #6
    },
    initComponent: function () {
        var me = this;
        me.initConfig();    // #7
        this.store = Ext.create('Ext.data.Store', { // #8
            autoLoad : me.preload,  // #9
            fields: ['codeNm', 'codeCd', 'grpCd', 'grpNm'],
            proxy: {
                url: 'codes.json',
                type: 'ajax',
                reader: {
                    type: 'json',
                    root: 'items'
                }
            },
            filters: [
                {
                    property: me.getFilterFld(), // #10
                    value: me.getFilterCd() // #11
                }
            ]
        });

        me.callParent(arguments);
    }
})