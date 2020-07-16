# pull official base image
FROM node:8

# set working directory
WORKDIR /app

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
#using --silent => only print warn and err
RUN npm install -g serve

# add app
COPY . ./

RUN npm run build

# start app => build + start
CMD ["npm", "run", "app"]
