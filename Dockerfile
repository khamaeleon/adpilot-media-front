# 1. node 이미지 사용
FROM node:16-alpine as builder

# 작업 폴더를 만들고 npm 설치
WORKDIR /home/app
ENV PATH /home/app/node_modules/.bin:$PATH
COPY package.json /home/app/package.json
RUN yarn install
RUN npm install -g react-scripts

RUN apk add tzdata && ln -snf /usr/share/zoneinfo/Asia/Seoul /etc/localtime

# 소스를 작업폴더로 복사하고 빌드
ENV GENERATE_SOURCEMAP=false
#ENV NODE_OPTIONS=--max-old-space-size=2048
COPY . /home/app
COPY run.sh /home/app/run.sh
RUN chmod 764 run.sh
EXPOSE 3000
ENTRYPOINT ["/bin/sh", "/home/app/run.sh"]