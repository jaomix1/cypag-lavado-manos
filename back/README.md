
## Nuevo proyecto
```Sh	
nest new lavadodemanos
```

## Generar un recurso
[Documentacion](https://docs.nestjs.com/recipes/crud-generator#generating-a-new-resource)

```Sh
nest g resource main/lavadodemanos  --no-spec
```

- What transport layer do you use? *REST API*
- Would you like to generate CRUD entry points? *YES*

## Configuration .env
[Documentacion .env](https://docs.nestjs.com/techniques/configuration)

```Sh
npm install --save @nestjs/config
```

agregar el archvio *.env* en la raiz del proyecto


## Install Swagger

[Documentacion Swagger](https://docs.nestjs.com/openapi/introduction)

```Sh	
npm install --save @nestjs/swagger

npm install --save class-validator class-transformer
```

## Instalar JWT
[Documentacion JWT](https://docs.nestjs.com/recipes/passport#jwt-functionality)
```Sh
npm install --save @nestjs/jwt passport-jwt
npm install --save-dev @types/passport-jwt

npm install --save @nestjs/passport
```

## Instalar SQL

```Sh
npm install --save mssql@10.0.2
```

## Ejecutar proyecto modo dev
```Sh	
npm run start:dev
```

[http://localhost:3000](http://localhost:3000)

## Datos de acceso

```json
{
"usuario": "comun",
"clave": "123123123"
}
```

```sh
  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwNDhCRTczQi1FNzQzLTQxMjAtQTQ3RC01QjdEMEE5Q0VENjEiLCJ1c2VybmFtZSI6InVzdWFyaW8gY29tdW4gY3VwcyIsInVzZXIiOiJjb211biIsImVtYWlsIjoidGVzdEBtZXJjdXJ5LmNvbSIsInJvbGVzIjpbIkMzQzRBRDhDLTY1QjYtNDQ1NC1BMEY5LUE1Rjc1RTg5NzcwNSJdLCJpYXQiOjE3Mjc5OTQxMzQsImV4cCI6MTczMTU5NDEzNH0.InvIlO7jU4i_Oe-8v8w8tv7eq1BoecVIjLP0niuNr08
  ```

## Docker

Construir la imagen
```sh
docker build -t cypaglavadodemanosfront:latest .
```
o 
```sh
docker build -t cypaglavadodemanosback:v1 .

docker tag cypaglavadodemanosback:v1 cypaglavadodemanosback:latest
```

ejecutar imagen
```sh
FOR /F "tokens=*" %i IN ('docker ps -q --filter "publish=3001"') DO docker stop %i

FOR /F "tokens=*" %i IN ('docker ps -aq --filter "publish=3001"') DO docker rm %i

docker run -p 3001:3001 --env-file .envcypaglavadodemanosback:latest
```