if [ $# -lt 1 ]
  then
    echo ""
    echo ""
    echo "This script can only be executed as such:"
    echo "    ./setup_api.sh <mongo connection string>"
    echo "For example:"
    echo "    ./setup_api.sh mongodb://user:pwd@subdomain.mongolab.com:27017/messages"
    echo ""
    echo ""
    exit 0
fi

echo $1 > api/mongo.config
cd api
node server.js &
