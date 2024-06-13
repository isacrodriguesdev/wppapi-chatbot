FROM node:18-alpine as base

# Instala pnpm globalmente
RUN npm install -g pnpm

WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install
COPY . .
RUN npx prisma generate && npm run build

FROM node:18-alpine as production

RUN npm install -g pnpm

WORKDIR /app
COPY package.json pnpm-lock.yaml ./
COPY --from=base /app/dist ./
COPY --from=base /app/prisma ./prisma

RUN pnpm install --prod && npx prisma generate

CMD ["node", "main.js"]
