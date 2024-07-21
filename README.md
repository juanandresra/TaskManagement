
# Inlaze Task Management System

[Demo](https://inlaze.juanandresra.online)

Administrador de tareas prueba tecnica.

## Requerimientos

- Node >= v20.9.0
- Mysql

## API

-  [NestJS](https://nestjs.com/)
-  [Mysql](https://www.mysql.com/)
-  [PrismaORM](https://www.prisma.io/)

Archivo de varibles .env

``` env
PORT=4000
DATABASE_URL="mysql://XXXXX:XXXXXXXXXXXX@XXXXXXXXXXXX/XXXX"
JWT_SECRET="XXXXXXXXXXXXXXX"
JWT_EXPIRES_IN="60minutes"
```

### Instalación

```bash
  npm i
```
### Scripts

Generador base de datos

```bash
  npm run prisma db push
```
```bash
  npm run prisma generate
```
### Scripts

Desarrollo

```bash
  npm run start:dev
```

Producción

```bash
  npm run build
  node dist/main.js 
```


## WEB

-  [NextJS](https://nextjs.org/)
-  [TailwindCSS](https://tailwindcss.com/)

Archivo de varibles .env

``` env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=secret
```

### Instalación

```bash
  npm i
```
### Scripts

Desarrollo

```bash
  npm run dev
```


## Colaboradores

Este proyecto existe gracias a todas las personas que contribuyen.


- [@juanandresra](https://www.github.com/juanandresra)
