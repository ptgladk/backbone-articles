define(['jquery', 'underscore', 'backbone', 'ArticleCollection'],  function($, _, Backbone, ArticleCollection) {
    return Backbone.View.extend({
        template: _.template($('#manage-template').html()),
        events: {
            'click .new-link': 'newPage',
            'click .edit-link': 'editPage',
            'click .delete-link': 'deletePage'
        },

        render: function() {
            var self = this;
            var articles = new ArticleCollection();
            articles.fetch({
                success: function() {
                    var temp = self.template({ articles: articles.models });
                    self.$el.html(temp);
                },
                data: {
                    username: this.attributes.username
                }
            });
        },

        newPage: function(event) {
            event.preventDefault();
            Backbone.history.navigate(this.$('.new-link').attr('href'), { trigger: true });
        },

        editPage: function(event) {
            event.preventDefault();
            Backbone.history.navigate($(event.target).attr('href'), { trigger: true });
        },

        deletePage: function(event) {
            event.preventDefault();
            Backbone.history.navigate($(event.target).attr('href'), { trigger: true });
        }
    });
});
