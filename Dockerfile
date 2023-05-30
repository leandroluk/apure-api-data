FROM node as builder
WORKDIR /app
COPY . .
RUN yarn
RUN yarn esbuild src \
  --outfile=dist/index.js \
  --bundle \
  --minify \
  --platform=node \
  --tree-shaking=true \
  --external:swagger-ui-express

FROM node as runner
ENV \
  NODE_ENV="production" \
  PORT=3000 \
  DEFAULTS_TTL=31536000000 \
  DB_MONGO="mongodb://mongo:mongo@localhost:27017/db?authSource=admin&replicaSet=rs" \
  DB_LIMIT=50 \
  JWT_SECRET="secret" 
WORKDIR /app
RUN npm i swagger-ui-express
COPY --from=builder /app/dist/ /app
EXPOSE ${PORT}
CMD node ./index.js
