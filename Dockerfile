# specify the node base image with your desired version node:<version>
FROM node:lts-alpine

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure both package.json AND package-lock.json are copied.
# Copying this separately prevents re-running npm install on every code change.
COPY package*.json ./

# Install production dependencies.
ENV NPM_CONFIG_LOGLEVEL info
RUN npm install --only=production

# Copy local code to the container image.
COPY . ./

# replace this with your application's default port
EXPOSE 8888

# Run the web service on container startup.
CMD [ "npm", "start" ]
