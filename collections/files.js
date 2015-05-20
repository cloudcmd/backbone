var app = app || {};

(function() {
    'use strict';
    
    /* global Backbone */
    var Files           = Backbone.Collection.extend({
            model: app.File,
            path: '',
            
            url: function() {
                return '/api/v1/fs' + this.path;
            },
            
            parse: function(data) {
                return data.files;
            }
        });
    
    app.files   = new Files();
    
    app.update  = function(path) {
        app.files.path = path;
        app.files.fetch({reset: true});
    };
})();
