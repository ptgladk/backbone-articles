define(['jquery', 'underscore', 'backbone', 'jsCookie', 'ErrorView'],  function($, _, Backbone, jsCookie, ErrorView) {
    return Backbone.View.extend({
        error: new ErrorView({ el: '#container' }),
        template: _.template($('#login-template').html()),
        events: {
            'click .login': 'login'
        },

        render: function() {
            var temp = this.template();
            this.$el.html(temp);
        },

        login: function() {
            this.error.remove();
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
            }).fail(function(data) {
                var error = JSON.parse(data.responseText);
                self.error.attributes = { error: error.message };
                self.error.render();
            });
        }
    });
});
