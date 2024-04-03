FROM node:18-alpine
ENV NODE_ENV=production
RUN mkdir /app && chown -R node:node /app
WORKDIR /app
USER node
COPY --chown=node:node . .
RUN npm ci --only=production
ENV HOSTNAME "0.0.0.0"
RUN npm run build