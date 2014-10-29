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