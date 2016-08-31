define(['jquery', 'underscore', 'backbone', 'jsCookie'],  function($, _, Backbone, jsCookie) {
    return Backbone.View.extend({
        template: _.template($('#nav-template').html()),
        events: {
            'click .home-link': 'homePage',
            'click .login-link': 'loginPage',
            'click .logout-link': 'logoutLink',
            'click .manage-link': 'managePage'
        },

        initialize: function() {
            this.listenTo(this.model, 'all', this.render);
            this.render();
        },

        render: function() {
            var temp = this.template(this.model.toJSON());
            this.$el.html(temp);
        },

        homePage: function(event) {
            event.preventDefault();
            Backbone.history.navigate(this.$('.home-link').attr('href'), { trigger: true });
        },

        loginPage: function(event) {
            event.preventDefault();
            Backbone.history.navigate(this.$('.login-link').attr('href'), { trigger: true });
        },

        logoutLink: function(event) {
            event.preventDefault();
            this.logout();
        },

        logout: function() {
            jsCookie.remove('user');
            this.model.set({
                username: '',
                token: ''
            });
            Backbone.history.navigate('/', { trigger: true });
        },

        managePage: function(event) {
            event.preventDefault();
            Backbone.history.navigate(this.$('.manage-link').attr('href'), { trigger: true });
        }
    });
});
