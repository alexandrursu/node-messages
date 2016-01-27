runinbackground="false";
if [ $# -lt 2 ]
  then
    echo ""
    echo ""
    echo "This script can only be executed as such:"
    echo "    ./setup.sh <mongo connection string> <messages api endpoint> [<run in background>]"
    echo "For example:"
    echo "    ./setup.sh mongodb://user:pwd@subdomain.mongolab.com:27017/messages http://localhost:8080/messages/ true"
    echo ""
    echo "Please note that the messages api endpoint must end with a forward slash '/'"
    echo ""
    echo ""
    exit 0
fi

if [ $# -eq 3 ]
  then
    if [ $3 == "true" ]
      then
        runinbackground="true"
    fi
fi

./setup_api.sh $1 $runinbackground
./setup_tests.sh
./setup_ui.sh $2 $runinbackground

