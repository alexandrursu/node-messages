if [ $# -lt 2 ]
  then
    echo ""
    echo ""
    echo "This script can only be executed as such:"
    echo "    ./setup.sh <mongo connection string> <messages api endpoint>"
    echo "For example:"
    echo "    ./setup.sh mongodb://user:pwd@subdomain.mongolab.com:27017/messages http://localhost:8080/messages/"
    echo ""
    echo "Please note that the messages api endpoint must end with a forward slash '/'"
    echo ""
    echo ""
    exit 0
fi

./setup_api.sh $1
./setup_ui.sh $2
