var mongoose = require('mongoose');

module.exports = mongoose.model('User',{
    username: {
        type: String,
        unique : true,
        require : true
    },
    password: String,
    email: String,
    firstName: String,
    lastName: String
});

//     bcrypt   = require('bcrypt-nodejs'),
//     Schema = mongoose.Schema;

// var userSchema = new Schema({
//     local            : {
//         username     : {
//             type     : String,
//             unique   : true,
//             require  : true
//         },
//         password     : String,
//     },
//     facebook         : {
//         id           : String,
//         token        : String,
//         email        : String,
//         name         : String
//     },
//     twitter          : {
//         id           : String,
//         token        : String,
//         displayName  : String,
//         username     : String
//     },
//     google           : {
//         id           : String,
//         token        : String,
//         email        : String,
//         name         : String
//     }
// });

// // generating a hash
// userSchema.methods.generateHash = function(password) {
//     return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
// };

// // checking if password is valid
// userSchema.methods.validPassword = function(password) {
//     return bcrypt.compareSync(password, this.local.password);
// };

// var User = mongoose.model('User', userSchema);

// module.exports = User;

