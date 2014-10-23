Ext.onReady(function(){
            
//	Ext.create('Ext.panel.Panel', {
//		title: 'Accordion Layout',
//		width: 350,
//		style: 'margin: 50px', // move panel off browser뭩 edge
//		renderTo: Ext.getBody(),
//		items: [{
//			title: '애국가 1절',
//			html: '동해물과 백두산이 마르고 <br> 닳도록 하느님이 보우하사<br> 우리나라 만세 <br>무궁화 삼천리 화려강산 <br>대한사람 대한으로 길이 보전하세'
//		}, {
//			title: '애국가 2절',
//			html: '남산 위에 저 소나무 철갑을 두른 듯 <br>바람 서리 불변함은 우리 기상일세 <br>무궁화 삼천리 화려강산 <br>대한사람 대한으로 길이 보전하세'
//		}, {
//			title: '애국가 3절',
//			html: '가을 하늘 공활한데 높고 구름 없이<br> 밝은 달은 우리 가슴 일편단심일세 <br>무궁화 삼천리 화려강산 <br>대한사람 대한으로 길이 보전하세'
//		}, {
//			title: '애국가 4절',
//			html: '이 기상과 이 맘으로 충성을 다하여 <br>괴로우나 즐거우나 나라 사랑하세 <br>무궁화 삼천리 화려강산 <br>대한사람 대한으로 길이 보전하세'
//		}]
//	});


	Ext.define('MyAccordionPanel', {
        extend : 'Ext.panel.Panel',
        alias : 'widget.myacpanel',
        initComponent: function(){

            this.callParent(arguments);
            this.on('expand', function(expandPanel){        // #1
                console.log('열린 패널은 :', this.title);
            })
        }
	});


    Ext.create('Ext.panel.Panel',{
        title: 'Accordion Layout',
        width: 350,
        height : 200,
        layout: 'accordion',
        renderTo: Ext.getBody(),
        items: [{
            xtype : 'myacpanel',
            title: '애국가 1절',
            html: '동해물과 백두산이 마르고 <br> 닳도록 하느님이 보우하사<br> 우리나라 만세 <br>무궁화 삼천리 화려강산 <br>대한사람 대한으로 길이 보전하세'
        }, {
            xtype : 'myacpanel',
            title: '애국가 2절',
            html: '남산 위에 저 소나무 철갑을 두른 듯 <br>바람 서리 불변함은 우리 기상일세 <br>무궁화 삼천리 화려강산 <br>대한사람 대한으로 길이 보전하세'
        }, {
            xtype : 'myacpanel',
            title: '애국가 3절',
            html: '가을 하늘 공활한데 높고 구름 없이<br> 밝은 달은 우리 가슴 일편단심일세 <br>무궁화 삼천리 화려강산 <br>대한사람 대한으로 길이 보전하세'
        }, {
            xtype : 'myacpanel',
            title: '애국가 4절',
            html: '이 기상과 이 맘으로 충성을 다하여 <br>괴로우나 즐거우나 나라 사랑하세 <br>무궁화 삼천리 화려강산 <br>대한사람 대한으로 길이 보전하세'
        }]
    });
});