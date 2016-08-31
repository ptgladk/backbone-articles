define(['jquery', 'underscore', 'backbone'],  function($, _, Backbone) {
    return Backbone.View.extend({
        template: _.template($('#manage-save-template').html()),
        events: {
            'click .save': 'save'
        },

        initialize: function() {
            this.render();
        },

        render: function() {
            var temp = this.template(this.model.toJSON());
            this.$el.html(temp);
        },

        save: function() {
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
                console.log(this.model.validationError);
            }
        }
    });
});
