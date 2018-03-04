<template>
	<div>
		<div class="page-header login-margin">
			<h1 class="text-center"><img src="img/logo-white.png"></h1>
		</div> 
		<div class="login">
			<div class="login-panel">
				<div>
					<h3 class="text-center">Please sign in to continue</h3>
					<br>
					<div class="form-group alert alert-danger" v-show="error">
						<span class="help is-danger">Username or password not recognised</span>
					</div>
					<div class="form-group">
						<input v-validate="'required|alpha|min:3|max:20'" type="text" class="form-control" id="email" placeholder="Username" name="username" v-model="username">
					</div>
					<label class="form-group alert alert-danger alert-right-side" v-show="errors.has('username')">
						<span class="alert-arrow">&#x2726</span>
						<span v-show="errors.has('username')" class="help is-danger">{{ errors.first('username') }}</span>
					</label>
					<div class="form-group">
						<input v-validate="'required'" type="password" class="form-control" id="pwd" placeholder="Password" name="pwd" v-model="password">
					</div>
					<div class="form-group">
						<button type="button" class="login-btn" @click="submit">  
							Login
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	
</template>

<script>

var Vue = require('vue');
var VeeValidate = require('vee-validate');
Vue.use(VeeValidate);

var VueLocalStorage = require('vue-localstorage');
Vue.use(VueLocalStorage);

module.exports = {
	name: 'LogInPage',
	data ()
	{
		return {
			username: '',
			password: '',
			token:'',
			error: false
		};
	},

	methods: {
		
		submit: function() {
			var that = this;
			this.$http.post('/user/login', {
				username: this.username,
				password: this.password
			}).then(response => {
				if(response.status === 200) {
					Vue.localStorage.set('token', response.body.token);
					this.$router.push({ path: '/dashboard' });
				}
				else {
					that.error = true;
				}
			}, err => {
				console.log(err);
				that.error = true;
			});
		}
	}
};

</script>