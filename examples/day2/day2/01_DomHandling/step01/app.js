Ext.onReady(function () {
    Ext.core.DomHelper.append('myDiv', {
        tag: 'div',
        cls: 'tab_bg',
        children: [
            {
                tag: 'ul',
                cls: 'dashboard_tab_menu',
                children: [
                    {
                        tag: 'li',
                        children: [
                            {
                                tag: 'a',
                                href: '#',
                                cls: 'on',
                                html : '1번째 탭'
                            }
                        ]
                    },
                    {
                        tag: 'li',
                        children: [
                            {
                                tag: 'a',
                                href: '#',
//                                cls: 'on',
                                html : '1번째 탭'
                            }
                        ]
                    },
                    {
                        tag: 'li',
                        children: [
                            {
                                tag: 'a',
                                href: '#',
//                                cls: 'on',
                                html : '1번째 탭'
                            }
                        ]
                    }
                ]
            }
        ]
    });
});