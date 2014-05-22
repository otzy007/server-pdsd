define(['marionette', 'vent', 'templates', 'views/UploadFile', 'views/File', 'views/FilesCollection', 'views/SearchPanel'],
       function (Marionette, vent, templates, UploadFile, File, FilesCollection) {
        "use strict";

        return Marionette.Layout.extend({

            template : templates.body,

            tagName: 'div',

            className: 'row-fluid',

            regions : {
                panel   : '#panel',
                messages: '#messages',
                record  : '#record'
            },

            initialize : function (options) {
                this.options = options;
                console.log("here in body I have " + this.options);
            },

            onRender : function () {
                this.panel.show(this.options.panel);
                this.messages.show(this.options.messages);
                this.record.show(this.options.record);
            }   //this.filesCollection.show(this.options);
            
        });
    });
