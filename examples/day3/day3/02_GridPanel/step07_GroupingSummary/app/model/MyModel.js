/***
 * step 1 Basic Grid
 * step 2 renderer
 */
Ext.define('MyApp.model.MyModel', {
    extend: 'Ext.data.Model',
    fields: [
        'customName',   // 주문자 명
        'orderDate',    // 주문일자
        'orderDesc',    // 주문내역
        {name: 'orderCnt', type: 'int'},     // 주문 수량
        {name: 'orderAmount', type: 'float'},  // 주문금액
        {name: 'accrueAmount', type: 'float'},  // 누적 주문액
        {name: 'isMember',type:'boolean'},    // 회원주문여부,
        'orderDetail',  // 주문 상세
        'estimate',      //고객평가
        'areaNm',        // 주문 지역
        'id','name','lastname'
    ],
    proxy : {
        type : 'ajax',
        actionMethods : {       // #1
            read : 'GET',       // #2
            create : 'POST',    // #3
            update : 'POST',     // #4
            destroy : 'POST'  // #5
        },
        api : {                 // #6
            read : 'boards.json?read',      // #7
            create : 'boards.json?create',    // #8
            update : 'boards.json?update',    // #9
            destroy : 'boards.json?destroy'    // #10
        },
        reader : {             // #11
            type : 'json',
            root : 'entitys'
        }
    },
    validations: [
        {type: 'inclusion', field: 'isMember',   list: [true, false]}
    ]
});