Ext.define('MyApp.view.SurveyCheck', {
    extend: 'Ext.container.Container',
    xtype: 'surveycheck',
    requires: ['MyApp.data.DataSet', 'MyApp.model.Data'],
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    initComponent: function () {
        var me = this;

        Ext.apply(this, {
            items: [
                {
                    xtype: 'component',
                    html: me.label,
                    cls: 'x-form-check-group-label'
                }
            ]
        });
        this.callParent();
        this.on('render', function () {
            var store = new Ext.data.Store({
                model: MyApp.model.Data,
                proxy: {
                    type: 'memory',
                    reader: {
                        type: 'array'
                    }
                },
                data: eval('MyApp.data.DataSet.' + me.code)
            });
            var checkboxGroup = {
                xtype: 'checkboxgroup',
                columns: me.columns,
                name: me.code,
                style: {
                    padding: '5px 10px 5px 10px'
                },
                items: []
            };

            store.each(function (item) {
                checkboxGroup.items.push({
                    xtype: 'checkbox',
                    name: me.code,
                    inputValue : item.get('code'),
                    boxLabel: item.get('name')
                });
            });
            this.add(checkboxGroup);
        })
    }
});
