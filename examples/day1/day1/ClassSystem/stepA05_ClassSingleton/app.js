Ext.onReady(function() {
	Ext.define('Student', {
		singleton : true,
        config : {
            title : 'Student Title..'
        },
        getNumberOfStudents: function(){
            return 100;
        }
	});

    console.log(Student.getTitle());
    console.log(Student.getNumberOfStudents());

    // Error
    Ext.create('Student');

});
