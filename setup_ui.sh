if [ $# -lt 1 ]
  then
    echo ""
    echo ""
    echo "This script can only be executed as such:"
    echo "    ./setup_ui.sh <messages api endpoint>"
    echo "For example:"
    echo "    ./setup_ui.sh http://localhost:8080/messages/"
    echo ""
    echo "Please note that the messages api endpoint must end with a forward slash '/'"
    echo ""
    echo ""
    exit 0
fi

echo $1 > ui/endpoint.config
http-server -p 8090 ./ui > /dev/null &
