// Configure the Ext.Loader class
Ext.Loader.setConfig({
	enabled : true,
	paths : {
		'RiaApp' : 'src/RiaApp'
	}
});
//
//Ext.require('RiaApp.Student');

Ext.onReady(function() {

//	
	// [Ext.Loader] Synchronously loading 'RiaApp.Student'; 
	// consider adding Ext.require('RiaApp.Student') above Ext.onReady
	/*** 
	 * 위의 require를 하지 않아도 실행된다. 단지 warning을 할 뿐이다.
	 * 이는 클래스 명으로 위의 패스로 js파일을 찾을 수 있기 때문이다.
	 */
	var student = Ext.create('RiaApp.Student',{
		title : 'Hello Student !!',
		html : '안녕하세요 여러분',
		grade : '2',
		className : '꾸러기',
		teacher : '홍길동',
		studentName : '김철수',
		studentAddress : '경기도 고양시 일산',
		renderTo : document.body
	});
	console.log(student.getStudent()); // Step6


//    Ext.create('Ext.Viewport',{
//        items : [{
//            xtype : 'student' ,
//            title : 'Hello Student !!',
//            html : '안녕하세요 여러분',
//            grade : '2',
//            className : '꾸러기',
//            teacher : '홍길동',
//            studentName : '김철수',
//            studentAddress : '경기도 고양시 일산'
//        }]
//    });

    // Step1
//	Ext.create('Ext.Viewport',{
//		items : [{
//			// xtype 을 이용하여 컴포넌트를 배치한다.
//			// 여기서는 정확히 require가 되어 있어야 한다.
//			// xtype으로는 상단패스와 함께 클래스를 찾지 못한다.
//			xtype : 'student',		// Step2
//			title : 'Hello Student !!',
//			html : '안녕하세요 여러분',
//			grade : '2',
//			className : '꾸러기',
//			teacher : '홍길동',
//			studentName : '김철수',
//			studentAddress : '경기도 고양시 일산'
//		}]
//	});

//    requires >> 클래스의 인스턴스가 생성되기 전에 로드..
//    uses >> 인스턴스화 되기 전에 로드되지 않는다.

});
