Ext.onReady(function() {
	/**
	 * Step 1
	 */
	Ext.create('Ext.panel.Panel', {
		title : 'Fit Layout',
		width : 500,
		height : 200,
		style : 'margin: 50px', // move panel off browser뭩 edge
		renderTo : Ext.getBody()
	});

	/**
	 * Step 2
	 */
	Ext.create('Ext.panel.Panel', {
		title : 'Fit Layout',
		width : 500,
		height : 200,
		style : 'margin: 50px', // move panel off browser뭩 edge
		items : {
			title : 'Inner Panel',
			html : 'Panel content',
			bodyPadding : 10,
			border : true
		},
		renderTo : Ext.getBody()
	});

	/**
	 * Step 3
	 */
	Ext.create('Ext.panel.Panel', {
		title : 'Fit Layout',
		width : 500,
		height : 200,
		style : 'margin: 50px', // move panel off browser뭩 edge
		layout : 'fit',
		items : {
			title : 'Inner Panel',
			html : 'Panel content',
			bodyPadding : 10,
			border : true
		},
		renderTo : Ext.getBody()
	});

});
