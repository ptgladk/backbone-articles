define(['jquery', 'underscore', 'backbone', 'jsCookie'],  function($, _, Backbone, jsCookie) {
    return Backbone.View.extend({
        template: _.template($('#login-template').html()),
        events: {
            'click .login': 'login'
        },

        initialize: function() {
            this.render();
        },

        render: function() {
            var temp = this.template();
            this.$el.html(temp);
        },

        login: function() {
            var self = this;
            $.ajax({
                url: 'http://localhost:8000/auth',
                type: 'POST',
                dataType: 'json',
                data: {
                    username: this.$('#username').val(),
                    password: this.$('#password').val()
                }
            }).done(function(data) {
                jsCookie.set('user', {
                    username: data.username,
                    token: data.token
                });
                self.model.set({
                    username: data.username,
                    token: data.token
                });
                Backbone.history.navigate('/', { trigger: true });
            });
        }
    });
});
