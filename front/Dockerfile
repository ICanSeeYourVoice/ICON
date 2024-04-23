FROM node:20.10.0 as builder 
WORKDIR ./

COPY package.json .
COPY package-lock.json .

ENV PATH ./node_modules/.bin:$PATH 

COPY . ./ 
RUN npm install
RUN npm install yarn 
RUN yarn run dev

FROM nginx:latest 
RUN rm -rf /etc/nginx/conf.d 
COPY conf /etc/nginx
COPY --from=builder ./build /usr/share/nginx/html 

EXPOSE 5173 

STOPSIGNAL SIGTERM

CMD ["nginx", "-g", "daemon off;"]
