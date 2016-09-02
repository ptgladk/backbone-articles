define(['jquery', 'underscore', 'backbone', 'ArticleCollection'],  function($, _, Backbone, ArticleCollection) {
    return Backbone.View.extend({
        template: _.template($('#index-template').html()),
        articles: new ArticleCollection(),
        events: {
            'click .article-link': 'articlePage',
            'click .favorite': 'favorite'
        },

        initialize: function() {
            this.listenTo(this.articles, 'change', this.render);
        },

        render: function() {
            this.updateArticles();
        },

        articlePage: function(event) {
            event.preventDefault();
            Backbone.history.navigate($(event.target).attr('href'), { trigger: true });
        },

        updateArticles: function() {
            var self = this;
            this.articles.fetch({
                headers: { 'Authorization': this.attributes.token },
                success: function() {
                    var temp = self.template({ articles: self.articles.models });
                    self.$el.html(temp);
                }
            });
        },

        favorite: function(event) {
            if (!this.attributes.token) {
                Backbone.history.navigate('/login', { trigger: true });
                return;
            }

            var article = this.articles.get($(event.currentTarget).data('id'));
            var self = this;
            if (article.get('isFavorite')) {
                $.ajax({
                    url: 'http://localhost:8000/api/article/favorite/' + article.get('id'),
                    type: 'DELETE',
                    dataType: 'json',
                    beforeSend: function(xhr) {
                        xhr.setRequestHeader('Authorization', self.attributes.token);
                    }
                }).done(function() {
                    self.updateArticles();
                });
            } else {
                $.ajax({
                    url: 'http://localhost:8000/api/article/favorite/' + article.get('id'),
                    type: 'POST',
                    dataType: 'json',
                    beforeSend: function(xhr) {
                        xhr.setRequestHeader('Authorization', self.attributes.token);
                    }
                }).done(function() {
                    self.updateArticles();
                });
            }
        }
    });
});
