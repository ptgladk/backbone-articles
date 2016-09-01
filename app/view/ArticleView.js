define(['jquery', 'underscore', 'backbone'],  function($, _, Backbone) {
    return Backbone.View.extend({
        template: _.template($('#article-template').html()),
        events: {
            'click .login': 'login'
        },

        render: function() {
            var self = this;
            this.model.fetch({
                success: function() {
                    var temp = self.template(self.model.toJSON());
                    self.$el.html(temp);
                }
            });
        }
    });
});
