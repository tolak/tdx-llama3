FROM node:20

WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

RUN npm install

COPY sign-proxy.js .

EXPOSE 3000

CMD ["node", "sign-proxy.js"]