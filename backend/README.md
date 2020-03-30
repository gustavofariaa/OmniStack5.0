# Install and configure [express](https://www.npmjs.com/package/express)

```
yarn add express
```

## Rota / Recurso

 - GET: Buscar/Listar
 - POST: Criar
 - PUT: Alterar
 - DELETE: Deletar

## Parametros

### Query 

> /route?parameters=value&parameters=value

```
app.get('/users', (request, response) => {
    const params = request.query
})
```

### Route Params: 

> /route/parameters

```
app.get('/users/:id', (request, response) => {
    const params = request.params
})
```

### Request Body: 

> /route

```
app.get('/users/:id', (request, response) => {
    const params = request.body
})
```

# Install and configure [nodemon](https://www.npmjs.com/package/nodemon)

```
yarn add nodemon -D
```

## Edit package.json

```
// package.json

{
    ...
    "scripts": {
        "start": "nodemon src/index.js"
    },
    ...
}
```
