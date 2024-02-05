FROM node:18-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY . .
RUN rm -rf node_modules
RUN npm install --production --silent && mv node_modules ../ && chown -R node /usr/src/app
USER node
RUN npm run build
