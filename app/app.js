define(['jquery', 'underscore', 'backbone', 'DefaultRouter', 'UserModel'],
    function($, _, Backbone, DefaultRouter, UserModel) {
        var app = {};
        app.user = new UserModel();
        app.router = new DefaultRouter(app.user);
        app.run = function() {
            Backbone.history.start({ pushState: true });
        };
        app.run();
        return app;
    }
);
