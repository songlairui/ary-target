# docker build -t songlairui/target .
# registry.cn-zhangjiakou.aliyuncs.com/rv/target:0.0.x
# Do the npm install or yarn install in the full image
# FROM mhart/alpine-node AS depend-dev
FROM node:stretch-slim AS depend-dev
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn config set registry https://registry.npm.taobao.org/
RUN yarn install

FROM node:stretch-slim AS depend-prod
WORKDIR /app
COPY --from=depend-dev /app .
RUN yarn config set registry https://registry.npm.taobao.org/
RUN yarn install --production


FROM node:stretch-slim AS dist
WORKDIR /app
COPY --from=depend-dev /app .
COPY . .
RUN yarn build

# And then copy over node_modules, etc from that stage to the smaller base image
FROM node:stretch-slim
WORKDIR /app
COPY --from=depend-prod /app .
COPY --from=dist /app/.next ./.next
EXPOSE 3000
CMD ["node_modules/.bin/next", "start"]
