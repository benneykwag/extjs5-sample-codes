 Ext.onReady(function(){
            
	 // 퍼센티지로 설정.
 var panel = Ext.create('Ext.panel.Panel', {
     x: 0,
     y: 0,
     floating: true,
     width: 300,                        // #1
     height: 300,                       // #2
     title: "Anchor Layout을 가진 부모패널",
     layout: 'anchor',
     items: [{
         xtype: 'panel',
         title: '%로 부모의 크기사용',
         html: '가로 300 , 세로 300의<br> 부모패널을 <br>가로 75%, 세로 50%를 사용한다.',
         anchor: '75% 50%'              // #3
     }]
 });
                
	 panel.show();
                
	 // offset으로 설정한다.
     // 자식 크기는 부모크기에서 자식의 anchor값을 뺀 크기이다.
	 var panel = Ext.create('Ext.panel.Panel', {
		 x: 350,
		 y: 0,
         floating: true,
		 width: 300,
		 height: 300,
         title: "Anchor Layout을 가진 부모패널",
		 layout: 'anchor',
		 items: [{
			 xtype: 'panel',
			 title: 'Offsets으로 부모크기를 사용',
			 html: '가로크기 = 부모의 가로(300px) - 50px <br> 세로크기 = 부모의 세로(300px) - 100px',
			 anchor: '-50 -100'
		 }]
	 });

     panel.show();

	 // %, offset을 동시에 사용.

	 var panel = Ext.create('Ext.panel.Panel', {
		 x: 0,
		 y: 350,
         floating: true,
		 width: 300,
		 height: 300,
         title: "Anchor Layout을 가진 부모패널",
		 layout: 'anchor',
		 items: [{
			 xtype: 'panel',
			 title: '%, offset을 동시에 사용',
			 html: '가로크기 = 부모크기의 50% <br/><br/> 세로크기 = 부모의 크기(300) - 100px',
			 anchor: '50% -100'
		 }]
	 });

     panel.show();
 });