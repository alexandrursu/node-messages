http_exists=`npm ls -g | grep http-server | wc -l`;
if [ $http_exists -lt 1 ]
  then
    npm install -g http-server
fi

cd ui
http-server -p 8090 > /dev/null &
