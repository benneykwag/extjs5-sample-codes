Ext.define('MyApp.view.CheckOutMaster', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.data.*',
        'Ext.form.*',
        'MyApp.view.DeliveryForm',
        'MyApp.view.DeliveryPersonInfo',
        'MyApp.view.SurveyRadio',
        'MyApp.view.SurveyForm',
        'MyApp.view.PaymentOfCardInfo'
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
                    xtype: 'deliveryperson'
                },
                {
                    xtype: 'paymentcard'
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