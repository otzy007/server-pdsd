define(['marionette'], function (Marionette) {
    'use strict';

    return Marionette.AppRouter.extend({
        
        appRoutes: {
            ''              : 'index',
            'conversations' : 'conversations',
            'conversations/:id' : 'showConversation',
            'friends'       : 'friends',
            'register'      : 'register',
            'login'         : 'login',
            'explore'       : 'listFiles',
            'edit'          : 'editFile',
            'edit/*path'    : 'editFile'
        }
    });
});
