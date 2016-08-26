define(['backbone'],  function(Backbone) {
    return Backbone.Model.extend({
        urlRoot: 'http://localhost:8000/api/article',

        parse: function(response, options) {
            return response['data'];
        }
    });
});
