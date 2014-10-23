Ext.define('MyApp.view.MyGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.mygrid',
    height: 300,
    columnLines: true,
    multiSelection: true,
    initComponent: function () {
        var me = this;
        Ext.apply(this, {
            store: Ext.create('MyApp.store.MyStore'),
            columns: this.getColumnConfig()
        });
        me.dockedItems = this.getDockItems();   // #5
        me.callParent(arguments);
        me.on('select', function(selectionModel){
            console.log(selectionModel.lastSelected);
        })
    },

    getDockItems: function () {
        return [
            {
                xtype: 'pagingtoolbar', // #1
                dock: 'bottom',         // #2
                store : this.store,     // #3
                displayInfo : true      // #4
            }
        ]
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
                }
            },
            {
                text: '주문수량',
                style: 'text-align:center',
                align: 'right',
                width: 60,
                dataIndex: 'orderCnt'
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
                      '</tpl>']
            },
            {
                text: '고객평가',
                align: 'center',
                width: 70,
                dataIndex: 'estimate',
                renderer: function (value, metaData) {
                    metaData.tdCls = 'thumb-' + value;    // #11
                    return '';
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
                }
            },
            {
                text: '회원여부',
                align: 'center',
                width: 100,
                dataIndex: 'isMember',
                xtype: 'booleancolumn',
                trueText: '회원구매',
                falseText: '비회원구매'
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
})
;