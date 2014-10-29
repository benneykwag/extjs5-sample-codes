Ext.onReady(function() {

	/**
	 * Step 1
	 */
	Ext.create('Ext.panel.Panel', {
		title : 'Tabular Layout',
		width : 600,
		height : 400,
		style : 'margin: 50px', // move panel off browser뭩 edge
		renderTo : Ext.getBody()
	});

	/**
	 * Step 2
	 */
	Ext.create('Ext.panel.Panel', {
		title : 'Tabular Layout',
		width : 600,
		height : 400,
		style : 'margin: 50px', // move panel off browser뭩 edge
		renderTo : Ext.getBody(),
		items : [ {
			width : 600,
			height : 100,
			html : 'HEADER'
		}, {
			width : 150,
			height : 300,
			html : 'LEFT MENU'
		}, {
			width : 300,
			height : 150,
			html : 'CONTENT AREA'
		}, {
			width : 150,
			height : 300,
			html : 'ADVERTS'
		}, {
			height : 150,
			width : 150,
			html : 'ARTICLE 1'
		}, {
			height : 150,
			width : 150,
			html : 'ARTICLE 2'
		} ]
	});

	/**
	 * Step 3
	 */
	Ext.create('Ext.panel.Panel', {
		title : 'Tabular Layout',
		width : 600,
		height : 400,
		style : 'margin: 50px', // move panel off browser뭩 edge
		renderTo : Ext.getBody(),
		layout : {
			type : 'table',
			columns : 4
		},
		items : [ {
			width : 600,
			height : 100,
			html : 'HEADER'
		}, {
			width : 150,
			height : 300,
			html : 'LEFT MENU'
		}, {
			width : 300,
			height : 150,
			html : 'CONTENT AREA'
		}, {
			width : 150,
			height : 300,
			html : 'ADVERTS'
		}, {
			height : 150,
			width : 150,
			html : 'ARTICLE 1'
		}, {
			height : 150,
			width : 150,
			html : 'ARTICLE 2'
		} ]
	});

	/**
	 * Step 4
	 */
	Ext.create('Ext.panel.Panel', {
		title : 'Tabular Layout',
		width : 600,
		height : 400,
		style : 'margin: 50px', // move panel off browser뭩 edge
		renderTo : Ext.getBody(),
		layout : {
			type : 'table',
			columns : 4
		},
		items : [ {
			width : 600,
			height : 100,
			html : 'HEADER<br/><br/>Colspan = 4. Rowspan = 1',

			colspan : 4
		}, {
			width : 150,
			height : 300,
			html : 'LEFT MENU<br/><br/>Colspan = 1. Rowspan = 2',

			rowspan : 2
		}, {
			width : 300,
			height : 150,
			html : 'CONTENT AREA<br/><br/>Colspan = 2. Rowspan = 1',

			colspan : 2
		}, {
			width : 150,
			height : 300,
			html : 'ADVERTS<br/><br/>Colspan = 1. Rowspan = 2',

			rowspan : 2
		}, {
			html : 'ARTICLE 1<br/><br/>Colspan = 1. Rowspan = 1',
			height : 150,
			width : 150
		}, {
			html : 'ARTICLE 2<br/><br/>Colspan = 1. Rowspan = 1',
			height : 150,
			width : 150
		} ]
	});

});