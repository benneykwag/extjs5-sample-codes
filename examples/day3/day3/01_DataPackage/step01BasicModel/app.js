Ext.onReady(function () {

    Ext.define('Board', {
        extend: 'Ext.data.Model',

        fields: [
            {
                name: 'sequence',
                type: 'int'
            },
            {
                name: 'title',
                type: 'string'
            },
            {
                name: 'userName',
                type: 'string'
            },
            {
                name: 'role',
                type: 'string'
            },
            {
                name: 'content',
                type: 'string'
            },
            {
                name: 'createDate',
                type: 'date',
                dateFormat: 'Y.m.d'
            },
            {
                name: 'updateDate',
                type: 'date',
                dateFormat: 'Y.m.d'
            },
            {
                name: 'readCnt',
                type: 'int'
            },
            {
                name: 'deleteYn',
                type: 'boolean',
                defaultValue: false
            }
        ],
        validations: [
            {type: 'presence', field: 'title'},        // #1
            {type: 'length', field: 'content', min: 2, max: 10}, // #2
            {type: 'inclusion', field: 'deleteYn', list: [true, false]},  // #3
            {type: 'exclusion', field: 'role', list: ['Admin', 'Manager']}, // #4
            {type: 'format', field: 'userName', matcher: /^[ㄱ-힣"'\\{\\}\s]+$/}   // #5
        ]
    });

    var board = Ext.create('Board', {
        sequence: 1,
        title: '안녕하세요^^',              // #1
        userName: '홍길동2',              // #2
        content: '게시물 내용을 입력합니다.',  // #3
        role: 'Admin',                 // #4
        readCnt: 300,
        deleteYn: false                 // #5
    });

    var errors = board.validate();
    console.log('검증 후 발견된 오류수 :', board.validate().items.length);

    Ext.each(board.validate().items, function (item) {
        console.log(item)
    });

    console.log(errors.getByField('content'));
    console.log(errors.getByField('role'));

    // step 2
    board.set('content', '게시물내용 입력');
    board.set('role', 'User');
    board.set('userName', '홍길동');

    console.log('---- 수정 된 내용 확인 ----')
    console.log('content : ', board.get('content'));
    console.log('role : ', board.get('role'));
    console.log('userName : ', board.get('userName'));

    var errors = board.validate();
    console.log('검증 후 발견된 오류수 :', errors.length, '검증 통과여부 : ', errors.isValid());

    Ext.each(errors.items, function (item) {
        console.log(item)
    });


});
