echo $1 > ui/endpoint.config
http-server -p 8090 ./ui > /dev/null &
