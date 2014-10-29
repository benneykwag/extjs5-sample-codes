Ext.onReady(function() {
	/**
	 * Step 1
	 */
	/*
	 Ext.create('Ext.container.Viewport', {});
	 */
	/**
	 * Step 2
	 */
	/*
	 Ext.create('Ext.container.Viewport', {
	     layout: {
	           type: 'vbox',
	           align: 'stretch',
	           animate: true,
	           padding: 10
	     }
	 });
	 */
	/**
	 * Step 3
	 */
	Ext.create('Ext.container.Viewport', {
		layout : {
			type : 'vbox',
			align : 'stretch',
			animate : true, //{ duration: 2000, easing: 'easeIn' },
			padding : 10
		},
		items : [ {
			xtype : 'panel',
			title : 'Panel One',
			height : 100
		}, {
			xtype : 'panel',
			title : 'Panel Two',
			flex : 1
		}, {
			xtype : 'panel',
			title : 'Panel Three',
			frame : true,
			flex : 3
		} ]
	});
});
