if [ $# -lt 1 ]
  then
    echo ""
    echo ""
    echo "This script can only be executed as such:"
    echo "    ./setup_api.sh <mongo connection string> [<run in background>]"
    echo "For example:"
    echo "    ./setup_api.sh mongodb://user:pwd@subdomain.mongolab.com:27017/messages true"
    echo ""
    echo ""
    exit 0
fi

cd api
npm install
cd ..

echo "{ \"uri\": \"$1\" }" > api/mongo.json

if [ $# -gt 1 ]
  then
    if [ $2 == "true" ]
      then
        sh run_api.sh
    fi
fi
