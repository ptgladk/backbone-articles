define(['backbone', 'MenuView', 'IndexView', 'LoginView', 'ArticleModel', 'ArticleView'],
    function(Backbone, MenuView, IndexView, LoginView, ArticleModel, ArticleView) {
        return Backbone.Router.extend({
            nav: '#nav',
            container: '#container',
            routes: {
                '': 'index',
                'login': 'login',
                'article/:id': 'article'
            },

            initialize: function() {
                new MenuView({ el: this.nav });
            },

            index: function() {
                new IndexView({ el: this.container });
            },

            login: function() {
                new LoginView({ el: this.container });
            },

            article: function(id) {
                var article = new ArticleModel({ id: id });
                new ArticleView({
                    el: this.container,
                    model: article
                });
            }
        });
    }
);
