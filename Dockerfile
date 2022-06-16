FROM node:fermium as build
ARG REACT_APP_NODE_ENV
WORKDIR /app
EXPOSE 80
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build-$REACT_APP_NODE_ENV

FROM nginx:stable
WORKDIR /app
COPY --from=build /app/build /usr/share/nginx/html
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf