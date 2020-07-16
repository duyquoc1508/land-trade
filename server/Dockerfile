# Dockerfile

FROM node:10.16.3

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy app source code
COPY . .

# RUN rm -rf node_modules/sharp
# RUN npm install --arch=x64 --platform=linux --target=8.10.0 sharp

RUN npm run build

#Expose port and start application
EXPOSE 3000

CMD ["npm", "run", "app"]
