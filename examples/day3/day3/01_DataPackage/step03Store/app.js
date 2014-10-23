Ext.Loader.setConfig({
    enabled: true,
    paths: {
        'MyApp': 'app'
    }
});


Ext.require('MyApp.model.BoardMaster');
Ext.require('MyApp.model.BoardContent');
Ext.require('MyApp.model.MemberMaster');
Ext.require('MyApp.model.MemberDetail');


Ext.onReady(function () {
    /************* hasMany Start *************/

    // step 1 Store의 생성
    var store = Ext.create('Ext.data.Store', {  // #1
        model: 'MyApp.model.BoardContent',      // #2
//        autoLoad: false,                         // #3
        proxy: {                                // #4
            type: 'ajax',
            actionMethods: {
                read: 'GET',
                create: 'POST',
                update: 'POST',
                destroy: 'POST'
            },
            api: {
                read: 'data/boardContent.json?read',
                create: 'data/create.json',
                update: 'data/update.json',
                destroy: 'data/destroy.json'
            },
            reader: {
                type: 'json',
                root: 'data'
            },
            writer: {
                type: 'json',
                allowSingle: false
            }
        }
    });

    var storeLoopFunc = function (innerStore) {    // #1
        console.log('--- 총 로우수는 : ', innerStore.count());    // #2
        innerStore.each(function (record) {
            console.log(
                'boardId : ', record.get('boardId'),
                'contentId : ', record.get('contentId'),
                'subject : ', record.get('subject')
            );
        });
    };


    store.on('load', function () {
        storeLoopFunc(store);
    });



    // step 2 신규 로우 추가.
    var boardContent = Ext.create('MyApp.model.BoardContent', {
        boardId: 1000,
        contentId: 1011,
        subject: '모델을 Store에 추가합니다.',
        content: 'Store는 모델의 집합입니다.',
        createEmail: 'benneykwag@gmail.com'
    });


    store.load({
        callback: function (records, operation, success) {    // #1
            store.insert(0,boardContent);                        // #2
            storeLoopFunc(store);                           // #3
            console.log('로드 이후 반환 된 레코드 배열:', store.getCount());       // #4
            console.log('로드 결과는 :', success);
        }
    });



    // step insert메소드로 위치 지정하며 추가하기.
    //    store.on('load', function(){
    //        store.insert(1, boardContent);
    //        storeLoopFunc(store);
    //    });
    //
    //    return;
    // step3 다수의 모델을 추가하기.
//    store.on('load', function(){    // #1
//        var arrayModel = [];        // #2
//        for(var i=0; i<5; i++){    // #3
//            arrayModel.push(Ext.create('MyApp.model.BoardContent',{ // #4
//                boardId : 1000,
//                contentId : i,  // #5
//                subject : '모델을 Store에 추가합니다.',
//                content : 'Store는 모델의 집합입니다.',
//                createEmail : 'benneykwag@gmail.com'
//            }));
//        }
//        store.add(arrayModel);  // #6
//        storeLoopFunc(store);   // #7
//
//        // 하단과 동일하다. 또는 []
//        store.add([{    // #8
//                       boardId : 1000,
//                       contentId : 99,
//                       subject : '모델을 Store에 추가합니다.',
//                       content : 'Store는 모델의 집합입니다.',
//                       createEmail : 'benneykwag@gmail.com'
//                   },
//                   boardContent // #9
//        ]);
//    });


    // step 4 store loop
//    store.on('load', function (records) {
//
//        // case 2
////        records.each(function(record, idx, count){   // #1
////            console.log(
////                '(',idx,'/', count, ')',
////                'boardId : ', record.get('boardId'),
////                'contentId : ', record.get('contentId'),
////                'subject : ', record.get('subject')
////            );
////        });
//
//        // case 1
////        store.each(function(record, idx, count){    // #1
////            console.log(                            // #2
////                '(',idx,'/', count, ')',
////                'boardId : ', record.get('boardId'),
////                'contentId : ', record.get('contentId'),
////                'subject : ', record.get('subject')
////            );
////        });
//
////        // case 3
//        store.insert(1, boardContent);
////        var count = store.count();
////        for(var idx=0; idx< count; idx++){
////            var record = store.getAt(idx);
////            console.log(                            // #2
////                '(',idx,'/', count, ')',
////                'boardId : ', record.get('boardId'),
////                'contentId : ', record.get('contentId'),
////                'subject : ', record.get('subject')
////            );
////        }
////
////        // case 4
////        var first = store.first(),
////            last = store.last();
////
////        console.log('첫번째 레코드 : ', first.data);
////        console.log('마지막 레코드 : ', last.data);
////
////        // case 5
////        var list = store.getRange(1,3);
////        Ext.each(list,function(record,index){
////            console.log(index, record.get("contentId"));
////        });
//
//        // case 6
//        // idProperty값이 존재하지 않은 경우 새로운 로우로 인식한다.
//        store.insert(1, Ext.create('MyApp.model.BoardContent', {
//            boardId: 1000,
//            contentId: 10,   // #1
//            subject: '1. 모델을 Store에 추가합니다.',
//            content: '1. Store는 모델의 집합입니다.',
//            createEmail: 'benneykwag@gmail.com'
//        }));
//        store.add(Ext.create('MyApp.model.BoardContent', {
//            boardId: 1000,
//            // contentId : 101,   // #2
//            subject: '2. 모델을 Store에 추가합니다.',
//            content: '2. Store는 모델의 집합입니다.',
//            createEmail: 'benneykwag@gmail.com'
//        }));
//
////        storeLoopFunc(store);
//
//        // idProperty값이 없는 레코드만 해당.
////        var newRecords = store.getNewRecords();
////        Ext.each(newRecords,function(record, index){
////            console.log(record.get("subject"), index);
////        });
////
////        console.log(store.count())
//
//
//        // case 7 수정된 레코드 찾기.
//
//        store.first().set('subject', '첫 번째 레코드를 변경합니다.');
//        var last = store.last();
//        last.set('subject', '마지막 레코드를 변경합니다.');
//
//        // getUpdatedRecord메소드는 수정 된 레코드만 추출한다.
//        // 위에서 last레코드를 수정했지만 아래 탐색조건에 걸리지 않는다.
//        // 이는 last레코드의 idProperty에 해당하는 필드에 값이 없어서 이다.
//        // idProperty필드에 값이 없다는 것은 정상적인 데이터로 인식하지 않는다.(디비에 저장되지 않은 상태로 봄)
////        var updated = store.getUpdatedRecords(); //Step 3
//////        var updated = store.getModifiedRecords();
////        Ext.each(updated,function(record,index){
////            console.log(record.getId(),record.get("subject"));
////        });
////        storeLoopFunc(store);
//
////        console.log(store.count());
//
//        // proxy 정보를 수정한다. CRUD가 가능하도록.
////        store.sync({
////            success: function(batch){
////                console.log('처리에 성공..');
////            },
////            failure: function(batch){
////                console.log('처리에 실패..')
////            },
////            callback: function(batch){
////                syncFunc(store, batch, true);
////            }
////        });   // 수정
////
////        // sync하지 않고 클라이언트에서만 변경내용을 store에 commit한다.
////        store.commitChanges();
////        storeLoopFunc(store);
////
////        store.add(Ext.create('MyApp.model.BoardContent',{
////            boardId : 1000,
//////            contentId : 10111,   // 없어야 추가됨.
////            subject : '모델을 Store에 추가합니다.',
////            content : 'Store는 모델의 집합입니다.',
////            createEmail : 'benneykwag@gmail.com'
////        }));
////
////        store.sync();
//
//
//        // case 8-1 삭제.
////        store.remove(boardContent);     // #1
//
////        var first = store.first(),      // #3
////            last = store.last();
////        store.remove(first, last);      // #4
////        store.removeAt(3);              // #5
////        store.removeAll();              // #6
//
//        store.removeAt(0);
//        store.sync();                   // #8
//    });
//
//    var syncFunc = function (store, batch, reject) {              // #1
//        Ext.each(batch.operations, function (operation, idx) {    // #2
//            console.log('No (' + idx + ')');
//            console.log('Action : ', operation.action);         // #3
//            console.log('Success : ', operation.success);       // #4
//            Ext.each(operation.records, function (record) {       // #5
//                console.log('Record >>');                       // #6
//                console.log(
//                    'boardId : ', record.get('boardId'),
//                    'contentId : ', record.get('contentId'),
//                    'subject : ', record.get('subject')
//                );
//            });
//        });
//
//        if (batch.hasException) {                                 // #7
//            console.log('-- Error  Start --');
//            Ext.each(batch.exceptions, function (error, idx) {    // #8
//                console.log('No:', idx)
//                console.log('   Action : ', error.action);      // #9
//                console.log('   Fail Record Count : ', error.records.length); // #10
//                Ext.each(error.records, function (record) {       // #11
//                    console.log('   Fail Record Data >>')
//                    console.log(
//                        'boardId : ', record.get('boardId'),
//                        'contentId : ', record.get('contentId'),
//                        'subject : ', record.get('subject')
//                    );
//                })
//            });
//            console.log('-- Error  End --');
//
//            if (reject) {     // #12
//                console.log('-- Fail Data Rollback -- ')
//                store.rejectChanges();      // #13
//            }
//
//            console.log('-- Final Store Info --')
//            storeLoopFunc(store);       // #14
//        }
//    }
});
