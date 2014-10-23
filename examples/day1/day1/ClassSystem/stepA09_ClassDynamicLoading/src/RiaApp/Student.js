Ext.define('RiaApp.Student', {
	extend : 'Ext.panel.Panel',
//	alias : 'widget.student',
    xtype : 'student',
	config : {
		studentName : '',
		studentAddress : ''
	},
	mixins : {
		classroom : 'RiaApp.ClassRoom'
	},

	initComponent : function() {
		// mixins의 classroom변수에 접근 생성자 호출
		this.mixins.classroom.constructor(this.grade, this.className,
				this.teacher);
		this.callParent(arguments);
	},

	getStudent : function() {
		return '- 학생정보 -' + '\n이름 : ' + this.getStudentName() + '\n주소 : '
				+ this.getStudentAddress() + this.mixins.classroom.getString();
	}
});