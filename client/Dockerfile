# pull official base image
FROM node:8

# set working directory
WORKDIR /app

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts@0.9.5 -g --silent

# add app
COPY . ./

# start app
CMD ["npm", "start"]
