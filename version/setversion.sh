#!/bin/sh

# git checkout -f

git log --pretty=oneline > log.txt

# rm -f ./version/version.js
cp -f ./version/version.template.js public/js/version.js
cp -f ./version/version.template.js src/version/version.js

# rm -f src/version/version.json
# cp -f ./version/version.template.json ./version/version.json
#rm -f version/version.txt
#cp -f version/version.txt.template version/version.txt
DATE=`date  +%Y%m%d%H%M%S`
git_ver=`awk 'NR==1 {print $1}' log.txt`
num_ver=`awk 'END{print NR}' log.txt`
app_ver=$num_ver"-"$DATE
upd_log=`cat ./version/update.log.txt | tr "\n" "~" | tr "\r" "~" | tr "\0" "~"`
echo '#######'$upd_log
sed -i '' -e 's/GIT_VERSION_FORNOW/'$git_ver'/g' public/js/version.js
sed -i '' -e 's/APP_VERSION_FORNOW/'$app_ver'/g' public/js/version.js
sed -i '' -e 's/NUMBER_VERSION_FORNOW/'$num_ver'/g' public/js/version.js
sed -i '' -e 's/UPDATE_LOG_FORNOW/'$upd_log'/g' public/js/version.js

sed -i '' -e 's/GIT_VERSION_FORNOW/'$git_ver'/g' src/version/version.js
sed -i '' -e 's/APP_VERSION_FORNOW/'$app_ver'/g' src/version/version.js
sed -i '' -e 's/NUMBER_VERSION_FORNOW/'$num_ver'/g' src/version/version.js
sed -i '' -e 's/UPDATE_LOG_FORNOW/'$upd_log'/g' src/version/version.js
# sed -i '' -e 's/GIT_VERSION_FORNOW/'$num_ver'/g' ./version/version.json

#sed -i 's/TESTGITVERSIONFORNOW/'$git_ver'/g' version/version.txt
#sed -i 's/TESTAPPVERSIONFORNOW/'$app_ver'/g' version/version.txt
echo "v6.1.$num_ver" > public/js/version.txt
echo "App version: $app_ver"
echo "Num Version: $num_ver"
echo "Git Version: $git_ver"
