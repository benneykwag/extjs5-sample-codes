Ext.define('MyApp.view.CheckOutMaster', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.data.*',
        'Ext.form.*',
        'MyApp.view.DeliveryForm',
        'MyApp.view.SurveyRadio',
        'MyApp.view.SurveyForm'
    ],
    alias: 'widget.checkoutmaster',


    title: '배송/결제',
    bodyPadding: 5,

    initComponent: function () {

        Ext.apply(this, {
            width: 700,
            fieldDefaults: {
                labelAlign: 'right',
                labelWidth: 80,
                msgTarget: 'qtip'
            },

            items: [
                {
                    xtype: 'deliveryform'
                },
                {
                    xtype: 'fieldset',
                    title: '수취인 정보',
                    defaultType: 'textfield',
                    layout: 'anchor',
                    defaults: {
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            margin: '0 0 5 0',
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: '이름',
                                    name: 'deliveryusername',
                                    flex: 1,
                                    allowBlank: false
                                },
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    columnWidth: 1,
                                    defaultType: 'textfield',
                                    margin: '0 0 5 0',
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            name: 'deliverycellphone1',
                                            fieldLabel: '휴대폰',
                                            labelWidth: 60,
                                            width: 110
                                        },
                                        {
                                            xtype: 'label',
                                            text: '-',
                                            margin: '0 5 0 5'
                                        },
                                        {
                                            xtype: 'textfield',
                                            name: 'deliverycellphone2',
                                            width: 40,
                                            margin: '0 5 0 0'
                                        },
                                        {
                                            xtype: 'label',
                                            text: '-',
                                            margin: '0 5 0 5'
                                        },
                                        {
                                            xtype: 'textfield',
                                            name: 'deliverycellphone3',
                                            width: 40
                                        },
                                        {
                                            xtype: 'textfield',
                                            name: 'deliveryphone1',
                                            fieldLabel: '연락처',
                                            labelWidth: 60,
                                            width: 110
                                        },
                                        {
                                            xtype: 'label',
                                            text: '-',
                                            margin: '0 5 0 5'
                                        },
                                        {
                                            xtype: 'textfield',
                                            name: 'deliveryphone2',
                                            width: 40,
                                            margin: '0 5 0 0'
                                        },
                                        {
                                            xtype: 'label',
                                            text: '-',
                                            margin: '0 5 0 5'
                                        },
                                        {
                                            xtype: 'textfield',
                                            name: 'deliveryphone3',
                                            width: 40
                                        }
                                    ]
                                },
                                {

                                }
                            ]
                        }
                    ]
                },

                {
                    xtype: 'fieldset',
                    title: '결제정보',
                    layout: 'anchor',
                    defaults: {
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'radiogroup',
                            anchor: 'none',
                            layout: {
                                autoFlex: false
                            },
                            defaults: {
                                name: 'ccType',
                                margin: '0 15 0 0'
                            },
                            items: [
                                {
                                    inputValue: 'visa',
                                    boxLabel: 'VISA',
                                    checked: true
                                },
                                {
                                    inputValue: 'mastercard',
                                    boxLabel: 'MasterCard'
                                },
                                {
                                    inputValue: 'amex',
                                    boxLabel: 'American Express'
                                },
                                {
                                    inputValue: 'discover',
                                    boxLabel: 'Discover'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            margin: '0 0 5 0',
                            items: [
                                {
                                    xtype: 'textfield',
                                    name: 'ccNumber',
                                    fieldLabel: '카드번호',
                                    flex: 1,
                                    allowBlank: false,
                                    minLength: 15,
                                    maxLength: 16,
                                    enforceMaxLength: true,
                                    maskRe: /\d/
                                },
                                {
                                    xtype: 'fieldcontainer',
                                    fieldLabel: '유효일',
                                    labelWidth: 75,
                                    layout: 'hbox',
                                    items: [
                                        {
                                            xtype: 'combobox',
                                            name: 'ccExpireMonth',
                                            displayField: 'name',
                                            valueField: 'num',
                                            queryMode: 'local',
                                            emptyText: 'Month',
                                            hideLabel: true,
                                            margins: '0 6 0 0',
                                            store: new Ext.data.Store({
                                                fields: ['name', 'num'],
                                                data: (function () {
                                                    var data = [];
                                                    Ext.Array.forEach(Ext.Date.monthNames, function (name, i) {
                                                        data[i] = {name: name, num: i + 1};
                                                    });
                                                    return data;
                                                })()
                                            }),
                                            width: 100,
                                            allowBlank: false,
                                            forceSelection: true
                                        },
                                        {
                                            xtype: 'numberfield',
                                            name: 'ccExpireYear',
                                            hideLabel: true,
                                            width: 70,
                                            value: new Date().getFullYear(),
                                            minValue: new Date().getFullYear(),
                                            allowBlank: false
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'surveyform'
                }
            ],

            buttons: [
                {
                    text: 'Reset',
                    scope: this,
                    handler: this.onResetClick
                },
                {
                    text: 'Submit',
                    scope: this,
                    handler: this.onCompleteClick
                }
            ]
        });
        this.callParent();
    },

    onResetClick: function () {
        this.getForm().reset();
    },

    onCompleteClick: function () {
        var form = this.getForm();
        if (form.isValid()) {
            console.log('Submitted Values', form.getValues(true));
            form.submit({
                url: 'sever.jsp'
            })
        }
    },

    onMailingAddrFieldChange: function (field) {
        console.log(field, this)
        var copyToBilling = this.down('[name=billingSameAsMailing]').getValue(),
            copyField = this.down('[name=' + field.billingFieldName + ']');

        if (copyToBilling) {
            copyField.setValue(field.getValue());
        } else {
            copyField.clearInvalid();
        }
    },

    /**
     * Enables or disables the billing address fields according to whether the checkbox is checked.
     * In addition to disabling the fields, they are animated to a low opacity so they don't take
     * up visual attention.
     */
    onSameAddressChange: function (box, checked) {
        var fieldset = box.ownerCt

        Ext.Array.forEach(fieldset.previousSibling().query('textfield'), this.onMailingAddrFieldChange, this);
        Ext.Array.forEach(fieldset.query('textfield'), function (field) {
            field.setDisabled(checked);
            // Animate the opacity on each field. Would be more efficient to wrap them in a container
            // and animate the opacity on just the single container element, but IE has a bug where
            // the alpha filter does not get applied on position:relative children.
            // This must only be applied when it is not IE6, as it has issues with opacity when cleartype
            // is enabled
            if (!Ext.isIE6) {
                field.el.animate({opacity: checked ? 0.3 : 1});
            }
        });
    }
});