Ext.onReady(function() {
	Ext.define('UserSetting', {
		extend : 'Ext.data.Model',

		idProperty : 'userID',

		fields : [ {
			name : 'userID',
			type : 'int'
		}, {
			name : 'fontSize',
			type : 'string'
		}, {
			name : 'theme',
			type : 'string'
		}, {
			name : 'language',
			type : 'string'
		}, {
			name : 'dateFormat',
			type : 'string'
		} ],

		proxy : {
			type : 'localstorage',
			id : 'user-settings'
		}
	});

	var settings = Ext.create('UserSetting', {
		userID : 1,
		fontSize : 'medium',
		theme : 'default',
		language : 'en-gb',
		dateFormat : 'd/m/Y'
	});

	settings.save();

	UserSetting.load(1, {
		callback : function(model, operation) {
			console.log(model);
		}
	});

});
