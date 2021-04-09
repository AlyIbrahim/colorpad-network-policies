FROM registry.redhat.io/ubi8/nodejs-14
#FROM ubi8/nodejs-14
MAINTAINER Aly Ibrahim<aly.ibrahim@gmail.com>
ADD ./ .
RUN npm install --production
ENTRYPOINT ["node", "./bin/www"]
