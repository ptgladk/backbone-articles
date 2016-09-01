define(['jquery', 'underscore', 'backbone', 'ErrorView'],  function($, _, Backbone, ErrorView) {
    return Backbone.View.extend({
        error: new ErrorView({ el: '#container' }),
        template: _.template($('#manage-save-template').html()),
        events: {
            'click .save': 'save'
        },

        render: function() {
            var temp = this.template(this.model.toJSON());
            this.$el.html(temp);
        },

        save: function() {
            this.error.remove();
            this.model.set({
                title: this.$('#title').val(),
                description: this.$('#description').val(),
                content: this.$('#content').val()
            });

            if (this.model.isValid()) {
                this.model.save({}, {
                    headers: { 'Authorization': this.attributes.token },
                    success: function() {
                        Backbone.history.navigate('/manage', { trigger: true });
                    }
                });
            } else {
                this.error.attributes = { error: this.model.validationError };
                this.error.render();
            }
        }
    });
});
