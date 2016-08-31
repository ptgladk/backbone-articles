define(['backbone'],  function(Backbone) {
    return Backbone.Model.extend({
        urlRoot: 'http://localhost:8000/api/article',
        defaults: {
            title: '',
            description: '',
            content: ''
        },

        parse: function(response, options) {
            return response['data'];
        },

        validate: function(attrs) {
            if (attrs.title.length < 1 || attrs.title.length > 255) {
                return 'Title: length must be from 1 to 255 letters';
            }
            if (attrs.description.length < 1 || attrs.description.length > 255) {
                return 'Description: length must be from 1 to 255 letters';
            }
            if (!attrs.content) {
                return 'Content: this field cannot be blank';
            }
        }
    });
});
