FROM node:14.15.1
WORKDIR /code

COPY package.json /code/package.json
COPY package-lock.json /code/package-lock.json

RUN npm install

COPY . .

CMD ["npm", "run", "start"]