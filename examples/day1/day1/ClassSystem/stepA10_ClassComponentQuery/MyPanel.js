Ext.define('MyPanel', {
    extend: 'Ext.panel.Panel',
    height: 500,
    width: 500,
    renderTo: Ext.getBody(),
    margin: 50,
    buttons: [
        {
            text: 'child Button'
        }
    ],

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'button',
            text: 'aa'
        },
        {
            xtype: 'tabpanel',
            itemId: 'mainTabPanel',
            flex: 1,
            items: [
                {
                    xtype: 'panel',
                    title: 'Users',
                    id: 'usersPanel',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    tbar: [
                        {
                            xtype: 'button',
                            text: 'Edit',
                            itemId: 'editButton'
                        }
                    ],
                    items: [
                        {
                            xtype: 'form',
                            border: 0,
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Name',
                                    hidden: true,
                                    allowBlank: true
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Email',
                                    allowBlank: false,
                                    itemId: 'aaa'
                                }
                            ],
                            buttons: [
                                {
                                    xtype: 'button',
                                    text: 'Save',
                                    id: 'SaveButton000',
                                    action: 'saveUser',
                                    handler: function (btn, event) {
                                        var validField = Ext.ComponentQuery.query('form > textfield{isValid()}');
//                        console.log(validField);
                                        console.log(this.up('panel'))
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'grid',
                            flex: 1,
                            border: 0,
                            columns: [
                                {
                                    header: 'Name',
                                    dataIndex: 'Name',
                                    flex: 1
                                },
                                {
                                    header: 'Email',
                                    dataIndex: 'Email'
                                }
                            ],
                            store: Ext.create('Ext.data.Store', {
                                fields: [ 'Name', 'Email' ],
                                data: [
                                    {
                                        Name: 'Joe Bloggs',
                                        Email: 'joe@example.com'
                                    },
                                    {
                                        Name: 'Jane Doe',
                                        Email: 'jane@example.com'
                                    }
                                ]
                            })
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'component',
            itemId: 'footerComponent',
            html: 'Footer Information',
            extraOptions: {
                option1: 'test',
                option2: 'test'
            },
            height: 40
        }
    ]
});
