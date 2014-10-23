Ext.define('MyApp.view.SurveyForm', {
    extend: 'Ext.form.FieldSet',
    xtype: 'surveyform',
    requires: [
        'MyApp.view.SurveyRadio',
        'MyApp.view.SurveyCheck'
    ],
    title: '설문조사',
    layout: 'anchor',
    defaultAnchor: '100%',
    initComponent: function () {
        Ext.apply(this, {
            items: [
                {
                    xtype: 'container',
                    layout:  'hbox',
                    defaults : {
                        flex: 1
                    },
                    items: [
                        {
                            xtype: 'surveyradio',
                            label: '성별',
                            code: 'sex'
                        },
                        {
                            xtype: 'surveyradio',
                            label: '연령대',
                            code: 'age'
                        },
                        {
                            xtype: 'surveyradio',
                            label: '경력',
                            code: 'career'
                        },
                        {
                            xtype: 'surveyradio',
                            label: '직업',
                            code: 'job'
                        },
                        {
                            xtype: 'surveyradio',
                            label: '고용형태',
                            code: 'jobtype'
                        }
                    ]
                },
                {
                    xtype: 'surveycheck',
                    label : '관심분야(복수선택)',
                    code : 'interest',
                    columns: 5
                }
            ]
        });
        this.callParent();
    }
});