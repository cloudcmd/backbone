var app = app || {};

(function() {
    'use strict';
    
    /* global Backbone */
    
    var url     = '/';
    
    app.File    = Backbone.Model.extend({
        url: function() {
            return '/api/v1/fs' + url;
        }
    });
    
    app.file    = new app.File();
})();
