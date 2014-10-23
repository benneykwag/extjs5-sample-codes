/***
 * Step3 Columns renderer
 * 컬럼종류에 맞는 렌더러를 설정해 보자.
 * 렌더러의 기본 사용법은
 *  1. 간략하게 아래와 같이
 *  renderer : 'usMoney' >> 미화 표시
 *  renderer : 'uppercase' >> 대문자 치환
 *  renderer : 'lowercase' >> 소문자 치환
 *  또는 아래와 같이 쓸수 있다.
 *  renderer : Ext.util.Format.usMoney
 *  renderer: Ext.util.Format.uppercase
 *  renderer: Ext.util.Format.lowercase
 *  renderer: Ext.util.Format.uppercase
 *  renderer: Ext.util.Format.numberRenderer('0,000')
 *  renderer: Ext.util.Format.dateRenderer('Y-m-d')
 *
 *  2.  renderer: function(){
 *          Ext.each(arguments, function(item, idx){
 *              console.log('No : ', idx, item)
 *          })
 *      }
 *      #1. value : 실제 표현할 데이터갑.
 *      #2. metaData : 현재 cell의 메타데이터를 포함한 컬렉션 객체다.
 *      #3. record : 현재 cell이 포함된 모델레코드
 *      #4. rowIndex : 현재 cell이 몇번째 로우에 위치하는지에 대한 인덱스
 *      #5. colIndex : 현재 cell이 몇번째 컬럼에 위치하는지에 대한 인덱스
 *      #6. store : 그리드의 스토어 객체
 *      #7. view : 현 그리드의 뷰로 수정하거나 리프레시 할 수 있다.
 *
 *      이제 이를 renderer함수에 대입하면
 *      renderer : function(value, metaData, record, rowIndex, colIndex, store, view)
 *
 *  3. value에 대해 설명한다.
 *      renderer : function(value, metaData, record, rowIndex, colIndex, store, view){
 *          return '['+value+']';
 *      }
 *
 *  4. metaData
 */

Ext.define('MyApp.view.MyGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.mygrid',
    columnLines: true,
    initComponent: function () {
        var me = this;
        Ext.apply(this, {

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
                dataIndex: 'customName'
            },
            {
                text: '주문일자',
                align: 'center',
                xtype: 'datecolumn',   // #2
                format: 'Y.m.d',       // #3
                width: 100,
                dataIndex: 'orderDate'
            },
            {
                text: '주문금액',
                xtype: 'numbercolumn',  // #8
                format: '0,000',        // #9
                style: 'text-align:center',
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
                dataIndex: 'estimate'
            },
            {
                text: '누적금액',
                style: 'text-align:center',
                align: 'right',
                flex: 1,
                name: 'accrueAmount',
                dataIndex: 'accrueAmount'
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
    }
});