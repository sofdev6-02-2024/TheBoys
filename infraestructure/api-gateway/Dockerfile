FROM node:22-alpine3.19

WORKDIR /app
COPY package*.json ./
COPY node_modules ./
COPY . .
EXPOSE 4444
CMD npm run dev
