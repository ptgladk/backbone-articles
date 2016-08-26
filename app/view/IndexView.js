define(['jquery', 'underscore', 'backbone', 'ArticleCollection'],  function($, _, Backbone, ArticleCollection) {
    return Backbone.View.extend({
        template: _.template($('#index-template').html()),
        events: {
            'click .article-link': 'articlePage'
        },

        initialize: function () {
            this.render();
        },

        render: function() {
            var self = this;
            var articles = new ArticleCollection();
            articles.fetch({
                success: function() {
                    var temp = self.template({ articles: articles.models });
                    self.$el.html(temp);
                }
            });
        },

        articlePage: function(event) {
            event.preventDefault();
            Backbone.history.navigate($(event.target).attr('href'), { trigger: true });
        }
    });
});
