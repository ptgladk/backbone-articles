define(['backbone', 'jsCookie', 'MenuView', 'IndexView', 'LoginView', 'ArticleModel', 'ArticleView'],
    function(Backbone, jsCookie, MenuView, IndexView, LoginView, ArticleModel, ArticleView) {
        return Backbone.Router.extend({
            user: '',
            nav: '#nav',
            container: '#container',
            routes: {
                '': 'index',
                'login': 'login',
                'logout': 'logout',
                'article/:id': 'article'
            },
            views: {
                menu: '',
                index: '',
                login: '',
                article: ''
            },

            initialize: function(user) {
                this.user = user;
                this.getUser();
                this.views.menu = new MenuView({
                    el: this.nav,
                    model: this.user
                });
            },

            index: function() {
                this.views.index = new IndexView({ el: this.container });
            },

            login: function() {
                this.views.login = new LoginView({
                    el: this.container,
                    model: this.user
                });
            },

            logout: function() {
                this.views.menu.logout();
            },

            article: function(id) {
                var article = new ArticleModel({ id: id });
                this.views.article = new ArticleView({
                    el: this.container,
                    model: article
                });
            },

            getUser: function() {
                var userData = jsCookie.getJSON('user');
                if (userData) {
                    this.user.set({
                        username: userData.username,
                        token: userData.token
                    });
                }
            }
        });
    }
);
