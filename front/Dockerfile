# base image로 node image 사용
FROM node
# /app 디렉토리를 작업디렉토리로 설정 및 이동
WORKDIR /app
# 현재 디렉토리(/app)에 package.json과 yarn.lock 파일 복사
COPY package.json .
# COPY yarn.lock .

# yarn 설치 및 install
RUN yarn

# 프로젝트를 현재 디렉토리에 복사
COPY . .

RUN yarn build
# CMD ["yarn", "build"]

# FROM nginx:latest 
# RUN rm -rf /etc/nginx/conf.d 
# COPY conf /etc/nginx
# COPY --from=builder ./dist /usr/share/nginx/html 

# 리스닝 포트 3000으로 설정
EXPOSE 3000

# 개발서버 실행
# CMD ["yarn", "dev"]
