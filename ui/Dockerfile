FROM node:argon

RUN mkdir /src
RUN npm install -g http-server

RUN cd /src && curl -L --insecure https://github.com/rjriel/node-messages/archive/master.tar.gz | tar zx && mv node-messages-master/* . && rm -rf node-messages-master
RUN echo "http://rjriel-api.elasticbeanstalk.com/messages/" > /src/ui/endpoint.config # replace the URI in this line with the REST API endpoint (must have a trailing '/')

EXPOSE 8080

CMD [ "http-server", "/src/ui/" ]
