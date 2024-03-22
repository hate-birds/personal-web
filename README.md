Приложение создано с помощью [Next.js](https://nextjs.org/)

## Готовимся к запуску

Для запуска development сервера:

```bash
cd .\website\
```

Затем

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
## Переменные окружение

В папке website создайте файл .env.local
Отредактируйте файл в соответствие с вашими токеном:

```typescript
NEXT_PUBLIC_TOKEN=your_token
```



## Запуск Docker container 
```bash
docker compose up
```

Откройте [http://localhost:3000](http://localhost:3000) в вашем браузере для того, чтобы увидеть результат.