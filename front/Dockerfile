FROM node:20.10.0 as builder 
WORKDIR ./

COPY package.json .
COPY package-lock.json .

ENV PATH ./node_modules/.bin:$PATH 

COPY . ./ 
RUN npm install yarn
RUN yarn
RUN yarn build

RUN rm -rf /etc/nginx/conf.d 
COPY conf /etc/nginx
COPY --from=builder ./dist /usr/share/nginx/html

EXPOSE 5173 
CMD ["nginx", "-g", "daemon off;"]
