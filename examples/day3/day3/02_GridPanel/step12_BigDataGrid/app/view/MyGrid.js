/***
 * step1 : 대량 데이터를 로드하기 위해 store의 pageSize를 10000으로 변경한다.
 *          콘솔에 document의 길이를 확인한다. document.getElementsByTagName("*").length;
 * step2 : plugin을 추가한다.
 *          plugins: [
 *              {
 *                  ptype: 'bufferedrenderer',
 *                  trailingBufferZone: 10, // #1
 *                  leadingBufferZone: 10 // #2
 *              }
 *          ]
 *         - 돔사이즈를 재확인한다.
 * step3 : store의 pageSize 를 100으로 변경하고 buffered:true설정을 추가한다.
 * step4 : bufferrender의 leadingBufferZone을 100, traillingBufferZone을 100으로 변경한다.
 *
 */

Ext.define('MyApp.view.MyGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.mygrid',
    padding: '5 5 5 5',
    height: 300,
    initComponent: function () {
        var me = this;
        me.store = Ext.create('MyApp.store.MyStore');   // #1

        Ext.apply(this, {
            /*plugins: [
                {
                    ptype: 'bufferedrenderer',
                    leadingBufferZone: 10,
                    trailingBufferZone: 10
                }
            ],*/
            dockedItems: [
                {
                    dock: 'bottom',
                    xtype: 'pagingtoolbar',     // #2
                    store: me.store
                },
                {
                    dock: 'top',
                    xtype: 'toolbar',
                    items: [
                        {
                            xtype: 'component',     // #3
                            itemId: 'status',
                            tpl: '전체 게시물 : {count}',
                            style: 'margin-left:15px'
                        }
                    ]
                }
            ],

            columns: this.getColumnConfig()
        });


        me.callParent(arguments);
        me.store.on('totalcountchange', me.onStoreSizeChange, me);  // #4
    },

    onStoreSizeChange: function () {    // #5
        this.down('#status').update({count: this.store.getTotalCount()});
    },

    getColumnConfig: function () {
        var me = this;
        return   [
            {
                xtype: 'rownumberer',
                width: 50,
                sortable: false,
                renderer: function (value, meta, record, row, col, store) {
                    // #6
                    return store.getTotalCount() - row - ((store.currentPage - 1) * store.pageSize);
                }
            },
            {
                text: "Topic",
                dataIndex: 'title',
                flex: 1,
                sortable: false
            },
            {
                text: "Author",
                dataIndex: 'username',
                width: 100,
                hidden: true,
                sortable: false
            },
            {
                text: "Replies",
                dataIndex: 'replycount',
                align: 'center',
                width: 70,
                sortable: false
            },
            {
                id: 'last',
                text: "Last Post",
                dataIndex: 'lastpost',
                width: 130,
                renderer: Ext.util.Format.dateRenderer('n/j/Y g:i A'),
                sortable: false
            }
        ];
    }
})
;