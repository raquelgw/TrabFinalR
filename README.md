# TrabFinalR

## INICIALIZAÇÃO DO PROJETO

```bash
npm init -y
npm install express bcrypt jsonwebtoken sqlite3 sqlite
npm install --save-dev typescript ts-node nodemon
npm install --save-dev @types/express @types/bcrypt @types/jsonwebtoken @types/sqlite3
npx tsc --init

mkdir src

mkdir public/

mkdir src/routes
touch src/database.ts
touch src/server.ts
touch src/routes/index.ts
touch src/routes/static.ts
touch src/routes/auth.ts
touch src/routes/user.ts
```

