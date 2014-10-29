
Ext.define('Board', {
    extend : 'Ext.data.Model',
    idProperty: 'sequence',
    fields : [ {
        name : 'sequence',
        type : 'int'
    }, {
        name : 'title',
        type : 'string'
    }, {
        name : 'userName',
        type : 'string'
    }, {
        name : 'role',
        type : 'string'
    }, {
        name : 'content',
        type : 'string'
    }, {
        name : 'createDate',
        type : 'date',
        dateFormat : 'Y.m.d'
    }, {
        name : 'updateDate',
        type : 'date',
        dateFormat : 'Y.m.d'
    }, {
        name : 'readCnt',
        type : 'int'
    }, {
        name : 'deleteYn',
        type : 'boolean',
        defaultValue : false
    } ],
    validations : [ {
        type : 'presence',
        field : 'title'
    },
    {
        type : 'length',
        field : 'content',
        min : 2,
        max : 10
    },
    {
        type : 'inclusion',
        field : 'deleteYn',
        list : [ true, false ]
    },
    {
        type : 'exclusion',
        field : 'role',
        list : [ 'Admin', 'Manager' ]
    },
    {
        type : 'format',
        field : 'userName',
        matcher : /^[ㄱ-힣"'\\{\\}\s]+$/
    } ],
    // CRUD를 설정한다.
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
            destroy : 'destroy.json?destroy'    // #10
        },
        reader : {             // #11
            type : 'json',
            root : 'entitys'
        }
    }
});
