Ext.onReady(function() {
	Ext.define('Student', {
		config : {
			studentName : null
		},
		
		statics : {
			studentCount : 0,
			student : function(studentName) {
				return new this({	// 강제로 생성자 호출
					studentName : studentName
				});
			}
		},
		// 생성자
		constructor : function(config) {
			this.initConfig(config);
			
			// this.statics().studentCount++;과 동일 
			this.self.studentCount++; 
			
			return this;
		}
	});

	var student1 = Student.student('홍길동');
	var student2 = Student.student('김철수');
	console.log(student2.getStudentName()); 

	console.log(Student.studentCount); 
});
