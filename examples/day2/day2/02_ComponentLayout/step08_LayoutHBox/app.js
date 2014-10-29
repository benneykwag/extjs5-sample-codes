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
	      type: 'hbox',
	      align: 'stretchmax',
	      pack: 'center'
	  }
	});
	 */

	/**
	 * Step 3
	 */
	Ext.create('Ext.container.Viewport', {
		layout : {
			type : 'hbox',
			align : 'stretchmax',
			padding : 10
		},
		items : [ {
			xtype : 'panel',
			title : 'Panel One',
			height : 200,
			width : 100
		}, {
			xtype : 'panel',
			title : 'Panel Two',
			flex : 1
		}, {
			xtype : 'panel',
			title : 'Panel Three',
			width : 100
		} ]
	});
});
