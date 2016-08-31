define(['jquery', 'underscore', 'backbone'],  function($, _, Backbone) {
    return Backbone.View.extend({
        template: _.template($('#manage-delete-template').html()),
        events: {
            'click .delete': 'delete',
            'click .cancel': 'cancel'
        },

        initialize: function() {
            this.render();
        },

        render: function() {
            var temp = this.template(this.model.toJSON());
            this.$el.html(temp);
        },

        delete: function() {
            this.model.destroy({
                headers: { 'Authorization': this.attributes.token },
                success: function() {
                    Backbone.history.navigate('/manage', { trigger: true });
                }
            });
        },

        cancel: function() {
            Backbone.history.navigate('/manage', { trigger: true });
        }
    });
});
