Ext.onReady(function() {

    // 클래스의 전처리와 후처리.
    var pre = Ext.Class.getDefaultPreprocessors(),
        post = Ext.ClassManager.defaultPostprocessors;
    console.log(pre);
    console.log(post);
    Ext.each(post, function(item, idx){
        console.log(idx, ':', item)
    });

    // step2
   /* Ext.create("Ext.Component",{
        width	: 300,
        height	: 150,
        id : 'my-component',
        style : {
            borderColor : '#000000',
            borderStyle : 'solid',
            borderWidth : '1px'
        },
        renderTo	: Ext.getBody(),
        html 	: "<h1>Hello!</h1> <p>This is an <strong>example</strong> of content</p>"
    });*/

    // step3
    /*Ext.create("Ext.Component",{
        width	: 300,
        height	: 150,
        style : {
            borderColor : '#000000',
            borderStyle : 'solid',
            borderWidth : '1px'
        },
        renderTo	: Ext.getBody(),
        contentEl 	: "content"
    });*/

    // step4
   /* Ext.create("Ext.Component",{
        width	: 300,
        height	: 150,
        style : {
            borderColor : '#000000',
            borderStyle : 'solid',
            borderWidth : '1px'
        },
        renderTo	: Ext.getBody(),
        data	: {
            name:"John",
            address :' 경기 고양....'
        },
        tpl 	: ["<h1>Content</h1><p>Hello {name}!{address}</p>"]
    });*/

    /*var cmp = Ext.create("Ext.Component",{
        width	: 300,
        height	: 150,
        style : {
            borderColor : '#000000',
            borderStyle : 'solid',
            borderWidth : '1px'
        },
        data	: {name:"John"},
        tpl 	: ["<h1>Content</h1><p>Hello {name}!</p>"]
    });

    cmp.render(Ext.getBody());*/
//
//    //The destroy phase starts for this component
//    cmp.destroy();



});