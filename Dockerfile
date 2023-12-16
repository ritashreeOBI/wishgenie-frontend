# base image
FROM node:alpine

# create & set working directory
WORKDIR /app

# copy source files
COPY . /app

# install dependencies
RUN npm install --force

# start app
RUN npm run build
EXPOSE 3000

# Set the startup command
CMD ["npm", "start"]
