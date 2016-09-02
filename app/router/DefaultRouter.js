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
                menu: ''
            },

            initialize: function(user) {
                this.user = this.getUser(user);
                this.views.menu = new MenuView({
                    el: this.nav,
                    model: this.user
                });
            },

            index: function() {
                if (!this.views.index) {
                    this.views.index = new IndexView({ el: this.container });
                }
                this.views.index.attributes = { token: this.user.get('token') };
                this.views.index.render();
            },

            login: function() {
                if (!this.views.login) {
                    this.views.login = new LoginView({
                        el: this.container,
                        model: this.user
                    });
                }
                this.views.login.render();
            },

            logout: function() {
                if (!this.checkAuth()) {
                    return;
                }
                this.views.menu.logout();
            },

            article: function(id) {
                var article = new ArticleModel({ id: id });
                if (!this.views.article) {
                    this.views.article = new ArticleView({ el: this.container });
                }
                this.views.article.model = article;
                this.views.article.render();
            },

            manage: function() {
                if (!this.checkAuth()) {
                    return;
                }
                if (!this.views.manage) {
                    this.views.manage = new ManageView({ el: this.container });
                }
                this.views.manage.attributes = { username: this.user.get('username') };
                this.views.manage.render();
            },

            manageNew: function() {
                if (!this.checkAuth()) {
                    return;
                }
                var article = new ArticleModel();
                if (!this.views.manageSave) {
                    this.views.manageSave = new ManageSaveView({ el: this.container });
                }
                this.views.manageSave.model = article;
                this.views.manageSave.attributes = { token: this.user.get('token') };
                this.views.manageSave.render();
            },

            manageEdit: function(id) {
                if (!this.checkAuth()) {
                    return;
                }
                var article = new ArticleModel({ id: id });
                var self = this;
                article.fetch({
                    success: function() {
                        if (!self.views.manageSave) {
                            self.views.manageSave = new ManageSaveView({ el: self.container });
                        }
                        self.views.manageSave.model = article;
                        self.views.manageSave.attributes = { token: self.user.get('token') };
                        self.views.manageSave.render();
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
                        if (!self.views.manageDelete) {
                            self.views.manageDelete = new ManageDeleteView({ el: self.container });
                        }
                        self.views.manageDelete.model = article;
                        self.views.manageDelete.attributes = { token: self.user.get('token') };
                        self.views.manageDelete.render();
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
