Ext.onReady(function(){
            
	/**
	 * Main Menu (West Region) AccoridianLayout
	 */
	var mainMenu = Ext.create('Ext.panel.Panel', {
		title: 'Main Menu',
		region: 'west',
		margins: '0 5 5 5',
		flex: .3,
		collapsible: true,
		titleCollapse: true,
		layout: 'accordion',
		layoutConfig: {
			animate: false,
			multi: true
		},
		items: [{
			title: 'Product Management'
		}, {
			title: 'User Management'
		}, {
			title: 'Settings'
		}]
	});
	
	/**
	 * Content Panel Wizard (Center Region) CardLayout
	 */
	var card1 = new Ext.panel.Panel({
		bodyStyle: 'padding: 20px',
		title: 'Personal Info',
		border: false,
		items: [{
			xtype: 'textfield',
			fieldLabel: 'First Name'
		}, {
			xtype: 'textfield',
			fieldLabel: 'Last Name'
		}, {
			xtype: 'textfield',
			fieldLabel: 'Email Address',
			vtype: 'email'
		}]
	});
	
	var card2 = new Ext.panel.Panel({
		bodyStyle: 'padding: 20px',
		title: 'Account Info',
		border: false,
		items: [{
			xtype: 'textfield',
			fieldLabel: 'Username'
		}, {
			xtype: 'textfield',
			fieldLabel: 'Password',
			inputType: 'password'
		}]
	});
                
	var card3 = new Ext.panel.Panel({
		bodyStyle: 'padding: 20px',
		title: 'Account Creation Successful!',
		border: false,
		html: 'Success!'
	});
                
	var createUserWizard = Ext.create('Ext.panel.Panel', {
		title: 'Create User Wizard',
		layout: 'card',
		deferredRender: true,
		items: [card1, card2, card3],
		bbar: ['->', {
			xtype: 'button',
			text: 'Previous',
			handler: function(btn){
				var layout = createUserWizard.getLayout();
                            
				if (layout.getPrev()) {
					layout.prev();
				}
			}
		}, {
			xtype: 'button',
			text: 'Next',
			handler: function(btn){
				var layout = createUserWizard.getLayout();
                            
				if (layout.getNext()) {
					layout.next();
				}
			}
		}]
	});
                
                
	/**
	 * User Management Panel (Center Region) HBoxLayout and
	 * VBoxLayout combination
	 */
	var userManagementPanel = Ext.create('Ext.panel.Panel', {
		title: 'User Management',
		layout: {
			type: 'hbox',
			align: 'stretch',
			padding: 10
		},
		defaults: {
			flex: 1
		},
		items: [{
			xtype: 'container',
			margins: '0 5 0 0',
			layout: {
				type: 'vbox',
				align: 'stretch',
				animate: true
			},
			defaults: {
				flex: 1,
				frame: true
			},
			items: [{
				title: 'User Contact Information',
				margins: '0 0 5 0'
			}, {
				title: 'Session Log',
			}]
		}, {
			xtype: 'container',
			layout: {
				type: 'vbox',
				align: 'stretch',
				animate: true
			},
			defaults: {
				flex: 1,
				frame: true
			},
			items: [{
				title: 'Account Privileges',
				margins: '0 0 5 0'
			}, {
				title: 'Purchase History',
			}]
		}]
	});
                
	/**
	 * Content Panel TabPanel (Center Region)
	 */
	var contentPanel = Ext.create('Ext.tab.Panel', {
		region: 'center',
		margins: '0 5 5 0',
		items: [createUserWizard, userManagementPanel]
	})
	
	/**
	 * Viewport BorderLayout
	 */
	Ext.create('Ext.container.Viewport', {
		layout: 'border',
		items: [{
			region: 'north',
			margins: 5,
			height: 100,
			xtype: 'container',
			html: 'Logo Here'
		}, mainMenu, contentPanel]
	});
                
});