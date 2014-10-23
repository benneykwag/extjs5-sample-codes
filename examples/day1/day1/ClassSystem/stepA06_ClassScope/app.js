Ext.onReady(function () {


    // 최상위 스코프 확인
    function myThisFunc() {
        return this;
    }

    console.log('최상위 this는 Window객체이다.', this, myThisFunc());


    // 함수내부에서 스코프 생성.
    function myThisFunc() {
        this.localVar = "함수내에서 this 생성."
        this.localStr = "안녕하세요.^^"
        return this;
    }


    var myThis = new myThisFunc();

    console.log( this , new myThisFunc());
    console.log(  myThis.localVar, myThis.localStr);

    Ext.define('MyPanel', {
        extend: 'Ext.panel.Panel',
        title: 'MyPanel Class',
        initComponent: function () {
            var me = this;
            this.items = [
                {
                    xtype: 'button',
                    text: '버튼',
                    scope : me,
                    handler: function (btn, event) {
                        console.log(this)
                        console.log(this.innerCustomMethod(), btn, event)
                    }
                }
            ];
            me.callParent(arguments);
        },
        innerCustomMethod: function(){
            return '버튼이 부모클래스의 메소드에 접근함.';
        }
    });

    Ext.create('MyPanel', {
        renderTo: document.body
    });


});