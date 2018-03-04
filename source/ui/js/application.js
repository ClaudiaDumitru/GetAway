var Vue = require('vue');
var VueRouter = require('vue-router');
var VueResource = require('vue-resource');

var GoogleMapsLoader = require('google-maps');

Vue.use(VueRouter);
Vue.use(VueResource);

var Index = require('../components/Index.vue');
var Router = require('../components/Router.vue');
var Tracking = require('../components/Tracking.vue');

var routes = [
	{path: '/', component: Index},
	{path: '/tracking', component: Tracking}
];

var router = new VueRouter({
	routes
});

var VueGoogleMaps = require('vue2-google-maps');
Vue.use(VueGoogleMaps, {
	load: {
		key: 'AIzaSyBdBkG7-vpfdnEDZporbJm-E9UBiFqBnog',
		v: '3.28'
	}
});

new Vue({

	el: '#root',
	router,

	render: function (render)
	{
		return render (Router);
	},
	
	components: {
		Router
	}
    
});