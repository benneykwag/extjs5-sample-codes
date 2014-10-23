Ext.require('Board')
Ext.onReady(function() {

    var checkFunc = function(idx){
        return idx;
    }
    var board = Ext.create('Board', {
        sequence : 1,
        title : '안녕하세요^^',              // #1
        userName : '홍길동',              // #2
        content: '게시물 내용을 입력합니다.',  // #3
        role : 'User',                 // #4
        deleteYn: false                 // #5
    });
    // step1
    // 데이터 입력 및 수정 작업
    // ipProperty가 존재하는지, ipProperty필드가 채워졌는지.
   /* board.save({
        success: function (record, operation) {
            console.log('읽어온 데이터 레코드는 : ', record.data)
        },

        failure  : function(record,options){
            console.log('저장실패');
        },

        callback: function(){
            console.log('callback : ', checkFunc(222));
        }
    });*/

    // step2
    // 데이터를 읽어오자.
    var board = Ext.ModelMgr.getModel('Board');
    board.load(750101111111, {
        success: function (record, operation) {
           console.log('읽어온 데이터 레코드는 : ', record.data)
            record.destroy({
                success: function (record2, operation) {
                    console.log('삭제 후 서버에서 전달한 결과는 : ', record.data)
                }
            });
        }
    });



});
