define(['jquery', 'underscore', 'backbone'],  function($, _, Backbone) {
    return Backbone.View.extend({
        template: _.template($('#nav-template').html()),
        events: {
            'click .home-link': 'homePage',
            'click .login-link': 'loginPage'
        },

        initialize: function () {
            this.render();
        },

        render: function() {
            var temp = this.template();
            this.$el.html(temp);
        },

        homePage: function(event) {
            event.preventDefault();
            Backbone.history.navigate(this.$('.home-link').attr('href'), { trigger: true });
        },

        loginPage: function(event) {
            event.preventDefault();
            Backbone.history.navigate(this.$('.login-link').attr('href'), { trigger: true });
        }
    });
});
