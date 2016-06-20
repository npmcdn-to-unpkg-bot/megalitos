module.exports = function(app) {
    var Role = app.models.Role;
    Role.findOne({
            name: 'admin'
        },
        function(err, adminRole) {
            if (!adminRole) {
                //create the admin role
                Role.create({
                    name: 'admin'
                }, function(err, role) {
                    if (err) cb(err);

                });

            }
        });
    Role.findOne({
            name: 'usuario'
        },
        function(err, adminRole) {
            if (!adminRole) {
                //create the usuario role
                Role.create({
                    name: 'usuario'
                }, function(err, role) {
                    if (err) cb(err);


                });

            }
        });
    Role.findOne({
            name: 'expulsado'
        },
        function(err, adminRole) {
            if (!adminRole) {
                //create the expulsado role
                Role.create({
                    name: 'expulsado'
                }, function(err, role) {
                    if (err) cb(err);

                });

            }
        });


};
