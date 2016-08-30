require.config({
    paths: {
        jquery: 'vendor/jquery-3.1.0.min',
        bootstrap: 'vendor/bootstrap.min',
        underscore: 'vendor/underscore',
        backbone: 'vendor/backbone',
        jsCookie: 'vendor/js.cookie',

        ArticleModel: 'model/ArticleModel',
        UserModel: 'model/UserModel',
        ArticleCollection: 'collection/ArticleCollection',
        MenuView: 'view/MenuView',
        IndexView: 'view/IndexView',
        LoginView: 'view/LoginView',
        ArticleView: 'view/ArticleView',
        DefaultRouter: 'router/DefaultRouter'
    },
    shim: {
        bootstrap: {
            deps: ['jquery']
        },
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        }
    }
});

require(['jquery', 'bootstrap', 'underscore', 'backbone', 'app']);
