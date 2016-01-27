FROM node:argon

RUN mkdir /src

RUN cd /src && curl -L --insecure https://github.com/rjriel/node-messages/archive/master.tar.gz | tar zx && mv node-messages-master/* . && rm -rf node-messages-master
RUN echo "{ \"uri\" : \"mongodb://messages-db:demo@ds049935.mongolab.com:49935/messages\" }" > /src/api/mongo.json # replace the uri here
RUN cd /src/api && npm install

EXPOSE 8080

CMD [ "node", "/src/api/server.js" ]
