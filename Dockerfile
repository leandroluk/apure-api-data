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
  # NODE_ENV="development" \
  PORT=3000 \
  DEFAULTS_ACCOUNT_STATE_EXPIRES=43200000 \
  DB_MONGO="mongodb://mongo:mongo@localhost:40000/db?authSource=admin" \
  DB_LIMIT=50 \
  URL_CONFIRM_EMAIL="http://localhost:3000" \
  MAIL_FROM="from@email.com" \
  MAIL_HOST="sandbox.smtp.mailtrap.io" \
  MAIL_PORT=587 \
  MAIL_USER="ab97e304d8dd0f" \
  MAIL_PASS="f5c974538e1135" \
  JWT_SECRET="secret" \
  JWT_ALGORITHM="HS256" \
  JWT_ISSUER="issuer" \
  JWT_AUDIENCE="audience" \
  JWT_ACCESS_EXPIRES=600000 \
  JWT_REFRESH_EXPIRES=21600000
WORKDIR /app
RUN npm i swagger-ui-express
COPY --from=builder /app/dist/ /app
EXPOSE ${PORT}
CMD node ./index.js