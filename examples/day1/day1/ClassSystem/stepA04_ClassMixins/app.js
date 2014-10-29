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
	});


	Ext.define('RiaApp.Student',{
		extend : 'Ext.panel.Panel',		// ①
//		extend : 'Ext.Component',
		config : {
			studentName : '미정',
			studentAddress : '미정'
		},
		mixins : { // ②
			classroom : 'RiaApp.ClassRoom'
		},


		initComponent: function(){	// ③
			// mixins의 classroom변수에 접근 생성자 호출
			this.mixins.classroom.constructor(this.grade, this.className, this.teacher );

			this.callParent(arguments);
		},

		getStudent : function(){	// ④
			return '- 학생정보 -'
			+ '\n이름 : '+ this.getStudentName()
			+ '\n주소 : '+ this.getStudentAddress()
			+ this.getString();
		},

		getString : function() { // Step3
			console.log('Benney.Student called')
			return this.mixins.classroom.getString();
		}
	});
	
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
    student.setTitle('안녕하세요');
	student.setGrade('2'); // Step5
	student.setClassName('꾸러기')
	student.setTeacher('홍길동');
	student.setStudentName('김철수22');
	student.setStudentAddress('경기도 고양시 일산');
	console.log(student.getStudent()); // Step6

    Ext.define('Aquatic', {
        swim : function(){
            console.log('Swimming');
        }
    });

    Ext.define('Terrestrial', {
        walk : function(){
            console.log('Walking');
        }
    });

    Ext.define('Reptile', {
        mixins:['Aquatic','Terrestrial']
    });

    var reptile = Ext.create('Reptile');
    reptile.swim();
    reptile.walk();



});
