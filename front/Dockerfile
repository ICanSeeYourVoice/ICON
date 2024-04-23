FROM node:20.10.0 as builder 
WORKDIR ./

COPY package.json .
COPY package-lock.json .

ENV PATH ./node_modules/.bin:$PATH 

COPY . ./ 
RUN npm install yarn
RUN yarn build
RUN yarn global add serve
RUN mkdir ./dist
COPY ./dist ./dist

ENTRYPOINT ["serve", "-s", "build"]
# CMD ["yarn", "run", "dev"]

# RUN yarn run dev

EXPOSE 5173 

STOPSIGNAL SIGTERM 
