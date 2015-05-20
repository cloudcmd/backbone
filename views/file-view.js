var app = app || {};

(function() {
    'use strict';
    
    /* global rendy */
    /* global Backbone */
    
    app.FileView    = Backbone.View.extend({
        TMPL: [
            '<span class="mini-icon {{ type }}"></span>',
            '<span class="name reduce-text">{{ name }}</span>',
            '<span class="size reduce-text">{{ size }}</span>',
            '<span class="owner reduce-text">{{ owner }}</span>',
            '<span class="mode reduce-text">{{ mode }}</span>'
        ].join(''),
        
        tagName: 'li',
        template: function(args) {
            if (args.size === 'dir')
                args.type = 'directory';
            else
                args.type = 'text-file';
                
            return rendy(this.TMPL, args);
        },
        
        render: function() {
            this.$el.html(this.template(this.model.attributes));
            return this;
        },
        
        initialize: function() {
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model, 'error', function(msg) {
                alert(msg);
            });
        }
    });
})();
