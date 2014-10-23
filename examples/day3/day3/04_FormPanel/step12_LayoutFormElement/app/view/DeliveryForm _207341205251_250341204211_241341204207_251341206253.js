Ext.define('MyApp.view.DeliveryForm', {
    extend: 'Ext.form.FieldSet',
    xtype: 'deliveryform',
    title: '배송지 정보',
    layout: 'column',

    initComponent: function () {
        var remoteJsonStore = Ext.create('Ext.data.JsonStore', {
            storeId: 'people',
            fields: [ 'zipcode', 'address'],
            proxy: {
                type: 'ajax',
                url:'data/jusoData.json',
                reader: {
                    type: 'json',
                    root: 'data',
                    totalProperty: 'totalCount'
                }
            }
        });

        Ext.apply(this, {

            items: [
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: '배송지 주소',
                    columnWidth: .5,
                    layout: 'hbox',
                    combineErrors: true,
                    defaultType: 'radio',
                    defaults: {
                        hideLabel: 'true'
                    },
                    items: [
                        {
                            name: 'delivery',
                            inputValue: 'newDelivery',
                            boxLabel: '새로운 배송지',
                            checked: true,
                            handler: this.resetDelivery,
                            scope: this,
                            margin: '0 5 0 0'
                        },
                        {
                            name: 'delivery',
                            inputValue: '0',
                            boxLabel: '회원정보 주소',
                            handler: this.clickLatestDelivery,
                            scope: this,
                            margin: '0 5 0 0'
                        }
                    ]
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    columnWidth: 1,
                    defaultType: 'textfield',
                    margin: '0 0 5 80',
                    items: [
                        {
                            xtype: 'combo',
                            queryMode: 'remote',
                            width: 400,
                            labelWidth: 55,
                            fieldLabel: '주소검색',
                            forceSelection: true,  // 선택만 되고 텍스트 필드에 값을 입력해 전송은 안된다.
                            displayField: 'address',
                            valueField: 'address',
                            pageSize: 5,
                            minChars: 1,
                            triggerAction: 'all',
                            store: remoteJsonStore,
                            listConfig: {
                                getInnerTpl: function () {
                                    return  '<div data-qtip="{fullName}">' +
                                        '<div class="combo">{zipcode}</div>' +
                                        '<div class="combo-address">{address}</div>' +
                                        '</div>';
                                }
                            },

                            listeners: {
                                select: function(combo, records) {
                                    var zipcode = records[0].get('zipcode').split('-'),
                                        zipcodeField = this.query('[name=zipcode1],[name=zipcode2]'),
                                        addressField = this.down('[name=address1]'),
                                        address = records[0].get('address');

                                    Ext.each(zipcodeField, function(field, idx){
                                        field.setValue(zipcode[idx])
                                    });
                                    addressField.setValue(address);

                                },scope: this

                            }
                        },
                        {
                            xtype: 'checkbox',
                            margin: '0 0 0 5',
                            boxLabel: '기본 배송지로 저장.'
                        }
                    ]
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    itemId : 'zipcodeContainer',
                    columnWidth: 1,
                    defaultType: 'textfield',
                    margin: '0 0 5 85',
                    defaults: {
                        readOnly: true
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            name: 'zipcode1',
                            width: 50
                        },
                        {
                            xtype: 'label',
                            text: '-',
                            margin: '0 5 0 5'
                        },
                        {
                            xtype: 'textfield',
                            name : 'zipcode2',
                            width: 50,
                            margin: '0 5 0 0'
                        },
                        {
                            xtype: 'textfield',
                            name: 'address1',
                            flex: 1
                        }
                    ]
                },
                {
                    xtype: 'textfield',
                    columnWidth: 1,
                    name: 'address2',
                    margin: '0 0 5 85'
                },
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: '배송요청일',
                    layout: 'hbox',
                    columnWidth: 1,
                    defaultType: 'textfield',
                    margin: '0 0 5 0',
                    items: [
                        {
                            xtype: 'datefield',
                            width: 100
                        },
                        {
                            xtype: 'label',
                            text: '~',
                            margin: '0 5 0 5'
                        },
                        {
                            xtype: 'datefield',
                            width: 100,
                            margin: '0 5 0 0'
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: '배송예정일',
                            width: 180
                        },
                        {
                            xtype: 'label',
                            text: '~',
                            margin: '0 5 0 5'
                        },
                        {
                            xtype: 'datefield',
                            width: 100,
                            margin: '0 5 0 0'
                        }
                    ]
                }
            ]
        });
        this.callParent();
        this.setLatestDelivery();
    },

    resetDelivery: function (radio, checked) {
        var me = this,
            delivery = ['zipcode1', 'zipcode2', 'address1', 'address2'];


        Ext.each(delivery, function (field) {
            me.down('textfield[name=' + field + ']').setValue();
        });
    },

    clickLatestDelivery: function (radio, checked) {
        if (!checked) return;
        var me = this,
            delivery = ['zipcode1', 'zipcode2', 'address1', 'address2'];
        this.ownerCt.getForm().load({
            url: 'data/memberAddress.json',
            params: {
                addressnum: radio.inputValue
            }
        });
    },

    setLatestDelivery: function () {
        Ext.Ajax.request({
            url: 'data/latestDelivery.json',
            success: this.onLoad,
            scope: this
        });
    },

    onLoad: function (response) {
        var response = Ext.decode(response.responseText);

        if (response.success) {
            var checkboxGroup = {
                xtype: 'radiogroup',
                itemId: 'latestDelivery',
                fieldLabel: '최근 배송지',
                columnWidth: .5,
                items: []
            };

            var i, len = response.data.length;
            for (i = 0; i < len; i++) {
                record = response.data[i];

                checkboxGroup.items.push({
                    boxLabel: record.label,
                    name: 'latestDelivery',
                    inputValue: record.latestnum,
                    handler: this.clickLatestDelivery,
                    scope: this
                });
            }
            this.insert(1, checkboxGroup);
        }
    }
});