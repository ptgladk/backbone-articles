define(['backbone', 'jsCookie', 'MenuView', 'IndexView', 'LoginView', 'ArticleModel', 'ArticleView', 'ManageView',
        'ManageSaveView', 'ManageDeleteView'],
    function(Backbone, jsCookie, MenuView, IndexView, LoginView, ArticleModel, ArticleView, ManageView,
             ManageSaveView, ManageDeleteView) {
        return Backbone.Router.extend({
            user: '',
            nav: '#nav',
            container: '#container',
            routes: {
                '': 'index',
                'login': 'login',
                'logout': 'logout',
                'article/:id': 'article',
                'manage/edit/:id': 'manageEdit',
                'manage/delete/:id': 'manageDelete',
                'manage/new': 'manageNew',
                'manage': 'manage'
            },
            views: {
                menu: '',
                index: '',
                login: '',
                article: ''
            },

            initialize: function(user) {
                this.user = this.getUser(user);
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
                if (!this.checkAuth()) {
                    return;
                }
                this.views.menu.logout();
            },

            article: function(id) {
                var article = new ArticleModel({ id: id });
                this.views.article = new ArticleView({
                    el: this.container,
                    model: article
                });
            },

            manage: function() {
                if (!this.checkAuth()) {
                    return;
                }
                new ManageView({
                    el: this.container,
                    attributes: { username: this.user.get('username') }
                });
            },

            manageNew: function() {
                if (!this.checkAuth()) {
                    return;
                }
                var article = new ArticleModel();
                new ManageSaveView({
                    el: this.container,
                    model: article,
                    attributes: { token: this.user.get('token') }
                });
            },

            manageEdit: function(id) {
                if (!this.checkAuth()) {
                    return;
                }
                var article = new ArticleModel({ id: id });
                var self = this;
                article.fetch({
                    success: function() {
                        new ManageSaveView({
                            el: this.container,
                            model: article,
                            attributes: { token: self.user.get('token') }
                        });
                    }
                });
            },

            manageDelete: function(id) {
                if (!this.checkAuth()) {
                    return;
                }
                var article = new ArticleModel({ id: id });
                var self = this;
                article.fetch({
                    success: function() {
                        new ManageDeleteView({
                            el: this.container,
                            model: article,
                            attributes: { token: self.user.get('token') }
                        });
                    }
                });
            },

            getUser: function(user) {
                var userData = jsCookie.getJSON('user');
                if (userData) {
                    return user.set({
                        username: userData.username,
                        token: userData.token
                    });
                }
                return user;
            },

            checkAuth: function() {
                this.user = this.getUser(this.user);
                if (!this.user.get('username')) {
                    Backbone.history.navigate('/login', { trigger: true });
                    return false;
                }
                return true;
            }
        });
    }
);
