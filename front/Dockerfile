FROM node:20.10.0 as builder 
WORKDIR ./

COPY package.json .
COPY package-lock.json .

ENV PATH ./node_modules/.bin:$PATH 

RUN yarn
COPY . .

EXPOSE 5173 
CMD ["yarn", "start"]
