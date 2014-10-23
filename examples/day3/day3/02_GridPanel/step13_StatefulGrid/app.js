/***
 * 그리드의 상태를 유지한다. 컬럼을 변경하고 재로딩하면 상태가 유지된다.
 * 아래 코드를 콘솔에서 실행하여 길이와 높이를 변경하고 재실행한 후 유지되는지 확인한다.
 * grid = Ext.ComponentQuery.query('grid')[0];
 * grid.setWidth(200);
 * grid.setHeight(250);
 */

Ext.define('MyApp.view.MyGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.mygrid',
    title : '그리드 패널',
    collapsible: true,  // #1
    height: 200,
    padding : '5 5 5 5',
    columnLines: true,
    initComponent: function () {
        var me = this;
        Ext.apply(this, {
            store: Ext.create('Ext.data.Store', {
                fields: ['name', 'id'],
                data: [
                    {
                        name: '홍길동',
                        id: 'hong'
                    },
                    {
                        name: '이순신',
                        id: 'lee'
                    }
                ]
            }),
            columns: this.getColumnConfig()
        });
        me.callParent(arguments);
    },

    getColumnConfig: function () {
        var me = this;
        return   [
            {
                text: 'ID',
                align: 'center',
                width: 70,
                dataIndex: 'name'
            },
            {
                text: 'NAME',
                align: 'center',
                width: 80,
                dataIndex: 'id'
            }
        ];
    }
});

Ext.onReady(function () {
    Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider'));  // #2

    Ext.create('MyApp.view.MyGrid', {
        stateful: true,     // #3
        stateId: 'stateGrid',   // #4
        renderTo : document.body
    })
});