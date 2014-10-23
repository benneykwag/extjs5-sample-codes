Ext.onReady(function() {

	/**
	 * Step 1
	 */
	Ext.create('Ext.Panel', {
		title : 'Column Layout',
		width : 500,
		height : 200,
		style : 'margin: 50px', // move panel off browser뭩 edge
		renderTo : Ext.getBody()
	});
	/**
	 * Step 2
	 */
	Ext.create('Ext.Panel', {
		title : 'Column Layout',
		width : 500,
		height : 200,
		style : 'margin: 50px', // move panel off browser뭩 edge
		items : [ {
			title : 'Panel One',
			html : 'Panel One Content'
		}, {
			title : 'Panel Two',
			html : 'Panel Two Content'
		}, {
			title : 'Panel Three',
			html : 'Panel Three Content'
		} ],
		renderTo : Ext.getBody()
	});
	/**
	 * Step 3
	 */
	Ext.create('Ext.Panel', {
		title : 'Column Layout',
		width : 500,
		height : 200,
		style : 'margin: 50px', // move panel off browser뭩 edge
		layout : 'column',
		items : [ {
			title : 'Panel One',
			columnWidth : .2,
			html : 'Panel One Content'
		}, {
			title : 'Panel Two',
			columnWidth : .8,
			html : 'Panel Two Content'
		}, {
			title : 'Panel Three',
			width : 100,
			html : 'Panel Three Content'
		} ],
		renderTo : Ext.getBody()
	});

	/**
	 * Step 4
	 */
	Ext.create('Ext.Panel', {
		title : 'Column Layout',
		width : 500,
		height : 200,
		style : 'margin: 50px', // move panel off browser뭩 edge
		layout : 'column',
		frame : true,
		defaults : {
			height : 165,
			frame : true
		},
		items : [ {
			title : 'Panel One',
			columnWidth : .2,
			html : 'Panel One Content'
		}, {
			title : 'Panel Two',
			columnWidth : .8,
			margin : '0 5 0 5',
			html : 'Panel Two Content'
		}, {
			title : 'Panel Three',
			width : 100,
			html : 'Panel Three Content'
		} ],
		renderTo : Ext.getBody()
	});

});