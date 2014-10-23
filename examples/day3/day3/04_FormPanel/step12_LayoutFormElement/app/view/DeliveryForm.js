Ext.define('MyApp.view.DeliveryForm', {
    extend: 'Ext.form.FieldSet',
    xtype: 'deliveryform',
    title: '배송지 정보',
    layout: 'column',

    initComponent: function () {
        var remoteJsonStore = Ext.create('Ext.data.JsonStore', {
            fields: [ 'zipcode', 'address'],
            proxy: {
                type: 'ajax',
                url: 'data/jusoData.json',
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
                            name: 'findaddress',
                            queryMode: 'remote',        // #1
                            width: 400,
                            labelWidth: 55,
                            fieldLabel: '주소검색',
                            forceSelection: true,       // #2선택만 되고 텍스트 필드에 값을 입력해 전송은 안된다.
                            displayField: 'address',    // #3
                            valueField: 'address',      // #4
                            pageSize: 5,                // #5
                            minChars: 1,                // #6
                            triggerAction: 'query',     // #7 all, query가 있다. all은 값을 입력하자 않고 요청가능해 전체를 불려올수 있고 query는 값이 입력되어야 요청이 가능하다.
                            store: remoteJsonStore,     // #8
                            listConfig: {               // #9   listConfig내부 코드는 Combo가 입력된 값 또는 우측 트리고를 클릭하면 실제 보여지는 내용은 BoudList클래스가 담당한다. listConfig는 이 BoundList클래스를 콤보박스 내부에서 생성할때 innerTpl함수를 전달하게
                                //                                되고 전달된 innerTpl함수가 생성된 BoundList클래스에서 사용된다.
                                getInnerTpl: function (displayField) {
                                    console.log('내부에서....................', arguments)
                                    return  '<div data-qtip="{fullName}">' +
                                        '<div class="combo">{zipcode}</div>' +
                                        '<div class="combo-address">{address}</div>' +
                                        '</div>';
                                }
                            },

                            listeners: {
                                select: function (combo, records) {                          // #1
                                    var zipcode = records[0].get('zipcode').split('-'),     // #2
                                        address = records[0].get('address'),                // #3
                                        zipcodeField = this.query('[name=zipcode1],[name=zipcode2]'),// #4
                                        addressField = this.down('[name=address1]');        // #5

                                    Ext.each(zipcodeField, function (field, idx) {    // #6
                                        field.setValue(zipcode[idx]);               // #7
                                    });
                                    addressField.setValue(address);                 // #8

                                },
                                scope: this                                         // #9
                            }
                        },
                        {
                            xtype: 'checkbox',
                            name: 'basicaddress',
                            margin: '0 0 0 5',
                            boxLabel: '기본 배송지로 저장.'
                        }
                    ]
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    itemId: 'zipcodeContainer',
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
                            name: 'zipcode2',
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

    resetDelivery: function (radio, checked) {  // #1
        if (!checked) return;                   // #2
        var me = this,
            delivery = ['zipcode1', 'zipcode2', 'address1', 'address2']; // #3


        Ext.each(delivery, function (field) {   // #4
            me.down('textfield[name=' + field + ']').setValue();    // #5
        });
    },

    clickLatestDelivery: function (radio, checked) {
        if (!checked) return;
        var me = this;
        // Case 1
        this.ownerCt.getForm().load({           // #1
            url: 'data/memberAddress.json',     // #2
            params: {                           // #3
                addressnum: radio.inputValue    // #4
            }
        });

        Ext.Ajax.request({
            url: 'data/memberAddress.json',
            success: function (response) {
                var response = Ext.decode(response.responseText);       // #1
                // Case 2
                this.ownerCt.getForm().setValues(response.data);

                var model = Ext.create('MyApp.model.CheckOut');
                // Case 2
                Ext.apply(model.data, response.data);
                this.ownerCt.getForm().loadRecord(model)

            },
            scope: this
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
        var response = Ext.decode(response.responseText);       // #1

        if (response.success) {                                 // #2
            var radiogroup = {                               // #3
                xtype: 'radiogroup',                            // #4
                itemId: 'latestDelivery',
                fieldLabel: '최근 배송지',
                columnWidth: .5,                                // #5
                items: []                                       // #6
            };

            var i, len = response.data.length;                  // #7
            for (i = 0; i < len; i++) {
                record = response.data[i];                      // #8

                radiogroup.items.push({                      // #9
                    boxLabel: record.label,                     // #10
                    name: 'latestDelivery',
                    inputValue: record.latestnum,
                    handler: this.clickLatestDelivery,          // #11
                    scope: this                                 // #12
                });
            }
            this.insert(1, radiogroup);                      // #13
        }
    }
});