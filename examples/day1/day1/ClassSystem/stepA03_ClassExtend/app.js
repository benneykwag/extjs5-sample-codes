Ext.onReady(function() {
		
	Ext.define('RiaApp.ClassRoom', {
		config : {
			grade : '미정',
			className : '미정',
			teacher : '미정'
		},

		applyGrade : function(grade) {
			this.grade = '학년 : ' + grade
		},

		applyClassName : function(className) {
			this.className = '반명 : ' + className;
		},

		applyTeacher : function(teacher) {
			this.teacher = '담임 : ' + teacher;
		},
		// 생성자를 정의한다.
		constructor : function(grade, className, teacher) {
			this.initConfig(); // 초기화 실행
			if (grade) // setter메소드로 인자로 받아온 값을 세팅한다.
				this.setGrade(grade);
			if (className)
				this.setClassName(className);
			if (teacher)
				this.setTeacher(teacher);
		},
		// Step3
		getString : function() {
			console.log('RiaApp.ClassRoom called')
			return '\n- 교실정보 -\n' + this.getGrade() + '\n' + this.getClassName()
					+ '\n' + this.getTeacher();
		}
	},
	function() {
	    console.log('RiaApp.ClassRoom class가 정의됐음!');
	});
//	var classroom = Ext.create('RiaApp.ClassRoom',
//		'2', 'ExtJS배워보기', '홍길동');
//	console.log(classroom.getString());
//	
//	return;
	
//	Ext.define('RiaApp.Student',{
//		extend : 'RiaApp.ClassRoom',	// 확장클래스명
//		config : {						// config
//			studentName : '',
//			studentAddress : ''
//		}
//	});
		
	Ext.define('RiaApp.Student',{
		extend : 'RiaApp.ClassRoom',	// 확장클래스명
		config : {	// config
			studentName : '',
			studentAddress : ''
		},

		constructor : function(grade, className, teacher, 
			studentName, studentAddress) {	// Step1
			
			this.initConfig();	// Step2
			if (studentName) 	// Step3
				this.setStudentName(studentName);
			if (studentAddress)
				this.setStudentAddress(studentAddress);
			
			// Step4
			this.callParent([ grade, className, teacher ]);
//			RiaApp.Student.superclass.constructor( grade, className, teacher );
		},
		
		getStudent : function(){
			return '- 학생정보 -' 
			+ '\n이름 : '+ this.getStudentName() 
			+ '\n주소 : '+ this.getStudentAddress() + 
			this.getString();
		},
		
		getString : function() { // Step3
			console.log('RiaApp.Student called');
			return this.callParent();
		}
	});

    var student = Ext.create('RiaApp.Student','2','꾸러기', '홍길동','김철수', '경기도 고양시 일산동');
    console.log(student.getStudent());
	
});
