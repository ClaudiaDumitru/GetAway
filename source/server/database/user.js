var mongoose = require ('mongoose');
var validator = require ('validator');
var log = require ('bunyan').getLogger ('database.user');
var _ = require ('lodash');

log.debug ('setting up');

var UserSchema = mongoose.Schema ({
	username: {
		type: String,
		required: true,
		unique: true,
		validate: {
			validator: function (v) {
				return validator.isAlphanumeric (v) && v.length >= 3 && v.length < 20;
			}
		}
	},
	password: {
		type: String,
		required: true//,
		// validate: {
		// 	validator: function(v) {
		// 		var pwdstrength = owasp.test(v);
		// 		return pwdstrength.errors.length === 0;
		// 	}
        // }
    }
},
{
	toObject: {
		transform: function (doc, ret) {
			delete ret.password;
			delete ret.__v;
			delete ret._id;
		}
	},
	toJSON: {
		transform: function (doc, ret) {
			delete ret.password;
			delete ret.__v;
			delete ret._id;
		}
	}
});

var User = mongoose.model ('User', UserSchema);
var database = require ('../database/database.js');

function create (username, password, name, email, privileges, extra) {
	if (!privileges) {
		privileges = ['user'];
	}

	var user = new User (_.assign ({}, extra, {
		username: username,
		password: password,
		name: name,
		email: email,
		privileges: privileges
	}));

	return user.save ();
}

function findByUsernameAndPassword (username, password) {
	return User.findOne ({username: username, password: encryptPassword (password)});
}

function findByUsername (username) {
	return User.findOne ({username: username});
}

function changePassword (username, new_password, old_password) {
	if(!old_password) {
		return User.findOneAndUpdate ({username: username}, {$set:{password: encryptPassword(new_password)}});
	}
	else {
		return User.findOneAndUpdate ({username: username, password: encryptPassword (old_password)}, {$set: {password: encryptPassword(new_password)}});
	}
}

function edit (username, name, email) {
	return User.updateOne ({username: username}, {$set: {name: name, email: email}});
}

async function del (username) {
	await database.gateway.delByOwner(username);
	await database.node.delByOwner(username);
	await database.application.delByOwner(username);
	return User.remove ({username: username});
}

var user = {
	create,
	findByUsernameAndPassword,
	findByUsername,
	list,
	number,
	changePassword,
	edit,
	del
};

module.exports = user;

