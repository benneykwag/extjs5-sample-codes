Ext.define('MyApp.view.MyGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.mygrid',
    requires: ['MyApp.view.GroupChangeCombo',
               'MyApp.view.CodeComboBox'],
    height: 500,
    columnLines: true,
    initComponent: function () {
        var me = this;
        Ext.apply(this, {
            plugins: [
                {
                    ptype: 'cellediting',
                    clicksToEdit: 1
                }
            ],
            features: [
                {
                    ftype: 'groupingsummary'    // 또는 summary
                },
                {
                    ftype: 'rowbody', // #1
                    getAdditionalData: function (data, rowIndex, record, orig) { // #2
                        var headerCt = this.view.headerCt,  // #3
                            colspan = headerCt.getColumnCount();    // #4
                        return {
                            rowBody: '주문자 : ' + record.get('customName') + '<br> 주문내역 : ' + record.get('orderDesc'),   // #5
                            rowBodyCls: (rowIndex % 2) ? "my-body-class" : this.rowBodyCls,   // #6
                            rowBodyColspan: colspan // #7
                        };
                    }
                }
            ],
            tbar: [
                {
                    xtype: 'grpchgcbx',
                    labelAlign: 'right',
                    labelWidth: 70,
                    fieldLabel: '그룹변경',
                    listeners: {
                        change: function (radio, newValue, oldValue) {
                            me.getStore().group(newValue);
                            me.getView().refresh();
                        }
                    }
                }
            ],
            store: Ext.create('MyApp.store.MyStore'),
            columns: this.getColumnConfig()
        });
        me.callParent(arguments);
    },

    getColumnConfig: function () {
        var me = this;
        return   [
            {
                xtype: 'rownumberer'
            },
            {
                text: '주문지역',
                align: 'center',
                width: 100,
                dataIndex: 'areaNm'
            },
            {
                text: '주문자',
                align: 'center',
                width: 70,
                dataIndex: 'customName',
                renderer: function (value) {
                    return value + '님';     // #1
                }
            },
            {
                text: '주문일자',
                align: 'center',
                //                xtype: 'datecolumn',   // #2
                //                format: 'Y.m.d',       // #3
                width: 100,
                dataIndex: 'orderDate',
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    if ((rowIndex % 2) == 0) {  // #4
                        metaData.align = 'left';    // #5
                        metaData.tdAttr = 'style="color:red;"';  // #6
                    } else {
                        metaData.align = 'right';
                        metaData.tdAttr = 'style="color:blue;"';
                    }
                    return Ext.util.Format.date(value, 'Y-m-d');    // #7
                },
                editor: { //step 3
                    xtype: 'datefield',
                    format: 'Y-m-d',
                    allowBlank: false
                }
            },
            {
                text: '주문금액',
                //                xtype: 'numbercolumn',  // #8
                //                format: '0,000',        // #9
                style: 'text-align:center',
                align: 'right',
                width: 100,
                dataIndex: 'orderAmount',
                renderer: function (value) {
                    return this.setMoney(value, 'Korea');   // #10
                },
                summaryType: 'sum',
                editor: {
                    xtype: 'numberfield',
                    step: 1000
                }
            },
            {
                text: '주문수량',
                style: 'text-align:center',
                align: 'right',
                width: 60,
                dataIndex: 'orderCnt',
                summaryType: 'sum',    // #2
                summaryRenderer: function (value) {  // #3
                    return '총 ' + value + '개';    // #4
                }
            },
            {
                text: '주문내역',
                style: 'text-align:center',
                width: 200,
                flex: 1,
                dataIndex: 'orderDesc',
                xtype: 'templatecolumn',
                tpl: ['{orderDesc} >><br><tpl for="orderDetail">',
                      '상품번호: {detailNo}  상품명:{detailDesc}<br>',
                      '</tpl>'],
                summaryType: function (records, field) {    // #5
                    console.log(records, field);    // #6
                    var orderAmount = 'orderAmount',
                        sum = me.getStore().getSum(records, orderAmount),   // #7
                        average = me.getStore().getAverage(records, orderAmount),   // #8
                        min = me.getStore().getMin(records, orderAmount),       // #9
                        max = me.getStore().getMax(records, orderAmount);       // #10
                    return '주문액 : ' + me.setMoney(sum, 'Korea') +
                        ' / 평균주문액 :' + me.setMoney(average, 'Korea') +
                        ' / 최소주문액 :' + me.setMoney(min, 'Korea') +
                        ' / 최고주문액 :' + me.setMoney(max, 'Korea');
                },
                summaryRenderer: function (value) {  // #11
                    return value
                }
            },
            {
                text: '고객평가',
                align: 'center',
                width: 70,
                dataIndex: 'estimate',
                renderer: function (value, metaData) {
                    metaData.tdCls = 'thumb-' + value;    // #11
                    return '';
                },
                summaryType: 'count',  // #12
                summaryRenderer: function (value) {
                    return '총 ' + value + '건';
                },
                editor: {
                    xtype: 'codecombo',
                    preload: true,
                    filterCd: 'G002',
                    allowBlank: false
                }
            },
            {
                text: '누적금액',
                style: 'text-align:center',
                align: 'right',
                flex: 1,
                name: 'accrueAmount',
                dataIndex: 'accrueAmount',
                renderer: function (value) {
                    return this.setMoney(value, 'Korea');   // #12
                },
                summaryType: 'average',    // #13
                summaryRenderer: function (value) {
                    return '평균 ' + Ext.util.Format.number(value, ',0') + '원'; // #14
                }
            },
            {
                text: '회원여부',
                align: 'center',
                width: 100,
                dataIndex: 'isMember',
                xtype: 'booleancolumn',
                trueText: '회원구매',
                falseText: '비회원구매',
                editor: {
                    xtype: 'codecombo',
                    preload: true,
                    filterCd: 'G001',
                    allowBlank: false
                }
            },
            {
                xtype: 'actioncolumn',
                text: '주문변경',
                align: 'center',
                width: 100,
                tdCls: 'my-action-col-cell',
                items: [
                    {
                        icon: 'img/Save.png',
                        handler: function () {
                            alert('update')
                        }
                    },
                    {
                        icon: 'img/Schedule.png',
                        handler: function () {
                            alert('delete')
                        }
                    }
                ]
            }
        ]
            ;
    },
    /**
     * 국가 코드에 맞는 통화형식을 설정한다.
     * @param value
     * @param nation
     */
    setMoney: function (value, nation) {    // #13
        if (nation == 'Korea')
            nation = '￦';
        else if (nation == 'US')
            nation = '$';
        else if (nation == 'EU')
            nation = '€';
        else if (nation == 'UK')
            nation = '￡';
        else if (nation == 'JP')
            nation = '￥';
        return Ext.util.Format.currency(value, nation, 0); // #14
    }
});