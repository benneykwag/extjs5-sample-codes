Ext.require('Ext.panel.Panel');
Ext.require('Ext.grid.Panel')
Ext.onReady(function () {

    var card1 = new Ext.panel.Panel({
        id: 'card1',                   // #1
        bodyPadding: 5,
        width: 300,
        title: '첫번째 패널(id: card1)',
        items: [
            {
                xtype: 'datefield',
                fieldLabel: 'Start date'
            },
            {
                xtype: 'datefield',
                fieldLabel: 'End date'
            }
        ],
        listeners: {
            render: function () {   // #2
                console.log('card1이 렌더링 되었습니다.')
            }
        }
    });

    var card2 = Ext.create('Ext.container.Container', {
        id: 'card2',                   // #3
        border: 1,
        html: '두번째 컨테이너(id: card2)',
        listeners: {
            render: function () {       // #4
                console.log('card2이 렌더링 되었습니다.')
            }
        }
    });


    var card3 = new Ext.grid.Panel({
        bodyStyle: 'padding: 20px',
        id: 'card3',                   // #5
        title: '3번째 그리드패널(id: card3)',
        store: '',
        columns: [
            {
                text: '게시글번호 ',
                width: 80,
                dataIndex: 'brd_seq',
                field: {
                    allowBlank: false
                }
            },
            {
                text: '제목 ',
                flex: 1,
                dataIndex: 'brd_title',
                field: {
                    allowBlank: false
                }
            },
            {
                text: '입력자 ',
                width: 70,
                dataIndex: 'brd_input_user_nm',
                field: {
                    allowBlank: false
                }
            }
        ],
        listeners: {
            render: function () {       // #6
                console.log('card3이 렌더링 되었습니다.')
            }
        }
    });

var cardCheck = function (domId) {
    var checkValue = Ext.Object.isEmpty(document.getElementById(domId));
    return domId + '는 ' + (checkValue ? '존재하지 않습니다.' : '존재합니다.') + '전체 Dom사이즈는 :' + document.getElementsByTagName("*").length + '입니다.';
};

var cardInfo = function () {
    var task = new Ext.util.DelayedTask(function () {
        console.log(cardCheck('card1'))
        console.log(cardCheck('card2'))
        console.log(cardCheck('card3'))
    });
    task.delay(500);
};

    var panel = Ext.create('Ext.panel.Panel', {
        title: 'Card Layout',
        width: 350,
        height: 150,
//        layout : 'card',        // #7
        layout: {
            type: 'card',
            deferredRender: true
        },

        renderTo: Ext.getBody(),
        items: [ card1, card2, card3 ],     // #8
        bbar: [ '->', {
            xtype: 'button',
            text: '이전',
            handler: function (btn) {
                var layout = btn.up('panel').getLayout();   // #9

                if (layout.getPrev()) {     // #10
                    layout.prev();          // #11
                    cardInfo();
                }
            }
        }, {
            xtype: 'button',
            text: '이후',
            handler: function (btn) {
                var layout = btn.up('panel').getLayout();

                if (layout.getNext()) { // #12
                    layout.next();      // #13
                    cardInfo();
                }
            }
        } ],
        listeners: {
            render: function () {
                cardInfo();
            }
        }
    });

});