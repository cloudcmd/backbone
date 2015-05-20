var app = app || {};

(function() {
    'use strict';
    
    /* global Backbone */
    /* global rendy */
    
    app.View    = Backbone.View.extend({
        TMPL: [
            '<span data-name="js-path">{{ path }}</span>',
            '<ul data-name="js-files" class="files">{{ files }}</ul>'
        ].join(''),
        
        template: function(args) {
            return rendy(this.TMPL, args);
        },
        
        render: function() {
            var html = '';
            
            console.time('addAll');
            this.model.each(function(file) {
                var view = new app.FileView({
                    model: file
                });
                
                html += rendy('<li>{{ file }}</li>', {
                    file: view.template(file.attributes)
                });
            }, this);
            
            this.el.innerHTML = this.template({
                files: html,
                path: this.model.path
            });
            
            console.timeEnd('addAll');
            
            return this;
        },
        
        initialize: function() {
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model, 'error', function(msg) {
                alert(msg);
            });
            
            this.listenTo(this.model, 'reset', this.render);
            
            this.model.fetch({reset: true});
        },
        
        addOne: function (file) {
            var view = new app.FileView({
                model: file
            });
            
            this.elFiles.appendChild(view.render().el);
        },
        
        addAll: function () {
            console.time('addAll');
            this.elPath = 'path';
            this.elFiles.innerHTML = '';
            this.model.each(this.addOne, this);
            console.timeEnd('addAll');
        },
    });
    
    var view = new app.View({
        el : document.querySelector('[data-name="js-fm"]'),
        model   : app.files
    });
})();
