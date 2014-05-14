define(['marionette', 'templates'],
    function (Marionette, templates) {
        "use strict";

        return Marionette.ItemView.extend({
            template : templates.header,

            initialize: function (options) {
            	console.log(options.tab);
                options = options || {};
                if (options.tab && options.model) {
                    options.model.set('tab', options.tab);
                }

            }
        });
    });
