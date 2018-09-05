const {exec} = require('child_process');

exec(`mkdir ./packages; cd ./packages; git clone https://github.com/SANGET/uke-admin-web-scaffold.git; git clone https://github.com/ukelli/ukelli-ui.git; git clone https://github.com/SANGET/uke-request.git; git clone https://github.com/SANGET/basic-helper-js.git`);