
Ext.define('MyApp.test.ClassLifeCycle2',{
    extend      : 'Ext.Component',

    initComponent   : function(){
        var me = this;

        me.width = 200;
        me.height = 100;
        me.html = {
            tag   : 'div',
            html  : 'X',
            style : {
                'float'           : 'right',
                'padding'         : '10px',
                'background-color': '#e00',
                'color'           : '#fff',
                'font-weight'     : 'bold'
            }
        };

        me.myOwnProperty = [1,2,3,4];

        me.callParent();
        console.log('1. initComponent');
        me.on('beforerender', function(){
            console.log('2. beforeRender');
        });
        me.on('render', function(){
            console.log('3. onRender');
            this.el.setStyle('background-color','#ccc');
        });
        me.on('afterrender', function(){
            console.log('4. afterRender');

            this.el.down('div').on('click',this.myCallback,this);
        });
        me.on('beforedestroy', function(){
            console.log('5. beforeDestroy');
        });
        me.on('destroy', function(){
            console.log('6. onDestroy');

            delete this.myOwnProperty;
            this.el.down('div').un('click',this.myCallback);
        });
    },


    myCallback : function(){
        var me = this;
        Ext.Msg.confirm('Confirmation','Are you sure you want to close this panel?',function(btn){
            if(btn === 'yes'){
                me.destroy();
            }
        });
    }
});