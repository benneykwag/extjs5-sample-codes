Ext.define('MyApp.model.MyModel', {
    extend: 'Ext.data.Model',
    fields: [
        {
            name: 'title'
        },
        {
            name: 'forumtitle'
        },
        {
            name: 'forumid',
            type: 'int'
        },
        {
            name: 'username'
        },
        {
            name: 'replycount',
            type: 'int'
        },
        {
            name: 'lastpost',
            type: 'date',
            dateFormat: 'timestamp'
        },
        'lastposter'
    ]
});