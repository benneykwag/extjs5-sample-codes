Ext.onReady(function() {
	// step 1
	Ext.define('RiaApp.ClassRoom', {
	    alias : 'classroom',
        title : 'Hellow'
    });

	var classroom = Ext.create('classroom');
    console.log('classroom', classroom.title);

    // step 2
    Ext.define('RiaApp.ClassRoom', {
        alias : 'widget.classroom',
        title : 'Hellow'
    });

    var classroom = Ext.create('classroom');
    console.log('classroom', classroom.title);
    // step 3
    var classroom = Ext.widget('classroom');
    console.log('classroom', classroom.title);

    // step 4
    Ext.define('RiaApp.ClassRoom', {
        xtype : 'classroom',
        title : 'Hellow'
    });

    var classroom = Ext.widget('classroom');
    console.log('classroom', classroom.title);
});
