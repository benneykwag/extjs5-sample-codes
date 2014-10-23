Ext.onReady(function () {
    Ext.create('Ext.container.Viewport', {
        layout: 'border',
        items: [
            {
                region: 'north',
                xtype: 'mycustomtabpanel',
                listeners: {
                    tabselect: function (idx) {
                        var card = this.up('viewport').down('container[region=center]').getLayout();
                        card.setActiveItem(parseInt(idx) - 1)
                    }
                }
            },
            {
                region: 'center',
                xtype: 'container',
                layout: {
                    type: "card",
                    deferredRender: true
                },
                items: [
                    {
                        xtype: 'button',
                        text: '1번 패널'
                    },
                    {
                        xtype: 'grid',
                        columns: [
                            {
                                text: 'name',
                                dataIndex: 'name'
                            }
                        ],
                        title: '2번 패널'
                    },
                    {
                        xtype: 'panel',
                        title: '3번 패널'
                    },
                    {
                        xtype: 'panel',
                        title: '4번 패널'
                    }
                ],
                style: {
                    borderColor: '#000000',
                    borderStyle: 'solid',
                    borderWidth: '1px'
                }
            }
        ],
        listeners: {
            afterrender: function () {
                Ext.select('.x-border-box').removeCls('x-border-box');
            }
        }
    })
});