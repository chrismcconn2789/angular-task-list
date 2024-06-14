### STEP 1: Build ##

FROM node:19-alpine AS build

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm install -g @angular/cli

RUN ng build --configuration production

### STEP 2: Deploy ###

FROM nginx:1.23.3-alpine

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build /usr/src/app/dist/angular-task-list/browser /usr/share/nginx/html
