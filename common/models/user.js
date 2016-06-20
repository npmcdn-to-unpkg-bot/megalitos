var config = require('../../server/config.json');
var path = require('path');

module.exports = function(User) {
    User.afterRemote('create', function(context, User, next) {
        console.log('> User.afterRemote triggered');

        var options = {
            type: 'email',
            to: User.email,
            from: 'megalitosinfo@gmail.com',
            subject: 'Thanks for registering.',
            template: path.resolve(__dirname, '../../server/views/verify.ejs'),
            redirect: '/verified',
            user: User
        };

        User.verify(options, function(err, response) {
            if (err) return next(err);
            console.log(err);
            console.log(response);

            console.log('> verification email sent:', response);
            context.res.send(response);

            /* context.res.render('response', {
                 title: 'Signed up successfully',
                 content: 'Please check your email and click on the verification link ' +
                     'before logging in.',
                 redirectTo: '/',
                 redirectToLinkText: 'Log in'
             });
             */

        });

    });

    //send password reset link when requested
    User.on('resetPasswordRequest', function(info) {
        var url = 'http://' + config.host + ':' + config.port + '/reset-password';
        var html = 'Click <a href="' + url + '?access_token=' +
            info.accessToken.id + '">here</a> to reset your password';

        User.app.models.Email.send({
            to: info.email,
            from: info.email,
            subject: 'Password reset',
            html: html
        }, function(err) {
            if (err) return console.log('> error sending password reset email');
            console.log('> sending password reset email to:', info.email);
        });
    });

    //crear role para usuario
    User.observe('after save', function setRoleMapping(ctx, next) {
        var RoleMapping = User.app.models.RoleMapping;
        var Role = User.app.models.Role;

        if (ctx.instance) {
            if (ctx.isNewInstance) {
                // Create the container
                var mkdirp = require('mkdirp');
                var userDir = ctx.instance.id.toString();
                mkdirp(path.join(__dirname, '../../server/storage', userDir), function(err) {
                    mkdirp(path.join(__dirname, '../../server/storage/' + userDir, 'profile'), function(err) {

                    });

                });
                Role.findOne({
                        name: 'usuario'
                    },
                    function(err, adminRole) {
                        adminRole.principals.create({
                            principalType: RoleMapping.USER,
                            principalId: ctx.instance.id
                        }, function(err, principal) {
                            if (err) throw (err);
                        });

                    });

            }
        }
        next();
    });
};
