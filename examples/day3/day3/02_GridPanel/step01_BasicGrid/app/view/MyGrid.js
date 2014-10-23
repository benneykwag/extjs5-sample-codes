/**
 * Step 1 Basic Grid
 */
 Ext.define('MyApp.view.MyGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.mygrid',        // #1
    height: 200,
    columnLines: true,
    initComponent: function () {
        var me = this;
        Ext.apply(this, {
            store: Ext.create('MyApp.store.MyStore'), // #2
            columns: this.getColumnConfig()            // #3
        });
        me.callParent(arguments);
    },

    getColumnConfig: function () {
        var me = this;
        return   [
            {
                text: '주문자',
                align: 'center',   // #4
                width: 70,
                dataIndex: 'customName'  // #5
            },
            {
                text: '주문일자',
                align: 'center',
                width: 80,
                dataIndex: 'orderDate'
            },
            {
                text: '주문금액',
                style: 'text-align:center',    // #6
                align: 'right',
                width: 100,
                dataIndex: 'orderAmount'
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
                dataIndex: 'orderDesc'
            },
            {
                text: '누적금액',
                style: 'text-align:center',
                align: 'right',
                width: 100,
                dataIndex: 'accrueAmount'
            },
            {
                text: '회원여부',
                align: 'center',
                width: 70,
                dataIndex: 'isMember'
            }
        ];
    }
});
