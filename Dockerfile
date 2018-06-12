FROM node:6

# VIRTUAL_HOST is setted later by runtime variable
ENV \
	VIRTUAL_HOST=https://somehost.somedomain.tld \
	VIRTUAL_PORT=3000 \
	NODE_ENV=production

COPY ./ /usr/src/app

COPY entrypoint.sh /

WORKDIR /usr/src/app

RUN npm update

VOLUME ["/usr/src/app/storage"]

ENTRYPOINT ["/entrypoint.sh"]
