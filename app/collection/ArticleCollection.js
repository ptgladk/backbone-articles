define(['backbone'],  function(Backbone) {
    return Backbone.Collection.extend({
        url: 'http://localhost:8000/api/article',

        parse: function(response, options) {
            return response['data'];
        }
    });
});
