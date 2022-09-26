FROM node:14.17.0


# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied where available (npm@5+)
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Expose Port 8001         
EXPOSE 8001
CMD [ "npm", "start" ]