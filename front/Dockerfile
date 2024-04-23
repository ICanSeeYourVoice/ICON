# 빌드 스테이지
FROM node:20.10.0 as builder
WORKDIR /app

# 의존성 파일 복사 및 설치
COPY package*.json ./
RUN npm install
COPY . .

# 애플리케이션 빌드
RUN npm run build

# 실행 스테이지
FROM nginx:alpine
EXPOSE 5173

# Nginx 설정
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
