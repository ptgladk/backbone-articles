define(['jquery', 'underscore', 'backbone', 'DefaultRouter'],
    function($, _, Backbone, DefaultRouter) {
        new DefaultRouter();
        Backbone.history.start({ pushState: true });
    }
);
