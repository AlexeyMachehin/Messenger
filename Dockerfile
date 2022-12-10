FROM ubuntu:22.04

WORKDIR /messenger

COPY . .

RUN apt update && apt install -y nodejs && apt install -y npm 

RUN npm install

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
