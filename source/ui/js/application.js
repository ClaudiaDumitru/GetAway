var Vue = require('vue');
var VueRouter = require('vue-router');
var VueResource = require('vue-resource');

Vue.use(VueRouter);
Vue.use(VueResource);

var Index = require('../components/Index.vue');
var Router = require('../components/Router.vue');

var routes = [
	{path: '/', component: Index}
];

var router = new VueRouter({
	routes
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