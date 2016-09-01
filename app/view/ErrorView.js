define(['jquery', 'underscore', 'backbone'],  function($, _, Backbone) {
    return Backbone.View.extend({
        template: _.template($('#error-template').html()),

        render: function() {
            var temp = this.template({ error: this.attributes.error });
            this.$el.prepend(temp);
        },

        remove: function() {
            this.$el.find('.error-container').remove();
        }
    });
});
