Ext.onReady(function() {
	/***
	 * config에 대한 설명이다.
	 * config에 표기된 변수는 자동으로 set, get, apply메소드가 생성되고
	 * 필요에 따라 override를 하여 사용한다.
	 */
	Ext.define('RiaApp.ClassRoom', {
		config : {				// ①
			grade : '미정',
			className : '미정',
			teacher : '미정'
		},

        applyGrade : function(grade){
			this.grade = '학년 : ' + grade
		},
		
		applyClassName : function(className){
			this.className = '반명 : '+ className;
		},
		
		applyTeacher : function(teacher){
			this.teacher = '담임 : '+ teacher;
		},

		constructor : function(grade, className, teacher) { // ②

            this.initConfig();

			if (grade)
				this.setGrade(grade);
			if (className)
				this.setClassName(className);
			if (teacher)
				this.setTeacher(teacher);
		},
		
		getString: function(){	// ③
			return 	'- 교실정보 -\n' 
					+ this.getGrade() 
					+ '\n' + this.getClassName() 
					+ '\n' + this.getTeacher();
		}
}, function() {    console.log('RiaApp.ClassRoom class가 정의됐음!');
});

	var classroom = Ext.create('RiaApp.ClassRoom',
        '2', 'ExtJS배워보기', '홍길동');
	console.log(classroom.getString(), classroom.getGrade());

/*	var classroom = Ext.create('RiaApp.ClassRoom');	// Step4
	classroom.setGrade('2');						// Step5
	classroom.setClassName('꾸러기')
	classroom.setTeacher('홍길동');
	console.log(classroom.getString());		*/		// Step6
});
