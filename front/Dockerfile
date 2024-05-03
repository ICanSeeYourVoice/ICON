# base image로 node image 사용
FROM node:alpine as builder
# /app 디렉토리를 작업디렉토리로 설정 및 이동
WORKDIR /app
RUN mkdir -p ./dist
# 현재 디렉토리(/app)에 package.json과 yarn.lock 파일 복사
COPY package.json ./
COPY yarn.lock ./

# yarn 설치 및 install
RUN yarn

# 프로젝트를 현재 디렉토리에 복사
COPY . .

RUN yarn build

FROM nginx:alpine

RUN rm -rf /etc/nginx/conf.d 
COPY conf /etc/nginx
COPY --from=builder /app/dist /usr/share/nginx/html 
EXPOSE 80 
CMD ["nginx", "-g", "daemon off;"]

