FROM node:14.15.5-alpine3.10 as test-target

# Deps for alpine may be needed:
# https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine
RUN apk add --no-cache libc6-compat 
EXPOSE 3000
ENV NODE_ENV=development
ENV PATH $PATH:/usr/src/app/node_modules/.bin

WORKDIR /usr/src/app

# Package & package-lock
COPY ./package*.json ./

# CI and release builds should use npm ci to fully respect the lockfile.
RUN npm ci

COPY . .

# Build
FROM test-target as build-target
ENV NODE_ENV=production

# Use build tools, installed as development packages, to produce a release build.
RUN npm run-script build

# Build the actual docker image to be stored, run, etc...
# We'll use nginx to serve the static html from the dist directory.
FROM nginx:1.17.8-alpine as image-target
COPY --from=build-target /usr/src/app/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]