FROM node:20-alpine AS build

WORKDIR /app

COPY package.json  package-lock.json ./
RUN npm install

COPY . .

ARG BACKEND_URL_1
ENV BACKEND_URL_1=$BACKEND_URL_1
ARG BACKEND_URL_2
ENV BACKEND_URL_2=$BACKEND_URL_2


RUN npm run build

FROM nginx:alpine AS prod

COPY nginx.conf.template /etc/nginx/templates/default.conf.template
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
