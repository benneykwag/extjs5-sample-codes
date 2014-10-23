Ext.define('MyApp.view.SurveyRadio', {
    extend: 'Ext.container.Container',
    xtype: 'surveyradio',
    requires: ['MyApp.data.DataSet','MyApp.model.Data'],
    config: {
        code : 'NA'
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
        this.on('render', function(){
            var store = new Ext.data.Store({
                model: MyApp.model.Data,
                proxy: {
                    type: 'memory',
                    reader: {
                        type: 'array'
                    }
                },
                data: eval('MyApp.data.DataSet.'+me.code)
            });

            store.each(function(item, idx){
                me.add({
                    xtype: 'radiofield',
                    name : me.getCode(),
                    inputValue : item.get('code'),
                    boxLabel: item.get('name')
                });
            });
        })
    }
});