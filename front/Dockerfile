FROM node:20.10.0 as builder 
WORKDIR ./

COPY package.json .
COPY package-lock.json .

ENV PATH ./node_modules/.bin:$PATH 

COPY . .
RUN npm install
RUN npm install yarn
RUN yarn build

FROM nginx
EXPOSE 5173 
COPY --from=builder ./build /usr/share/nginx/html
