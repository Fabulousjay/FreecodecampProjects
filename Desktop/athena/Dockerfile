FROM node:14.6.0

WORKDIR /var/www/vhosts/athena

COPY ./athena/package.json .
COPY ./athena/yarn.lock .

RUN yarn install --silent

EXPOSE 3000

CMD ["yarn", "run", "start"]