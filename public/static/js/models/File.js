define(["jquery", "backbone"],
       function ($, Backbone) {
        "use strict";
        return Backbone.Model.extend({
            initialize: function (options) {
                //console.log(options);
            },
            
            defaults: {
                id: "",
                filename: "",
                type: "",
                user_email: ""
            },
            
            url: function () {
                var path = this.get("path");
                //console.log(path);
                return "/explore/" + path;
            }
        });
    });