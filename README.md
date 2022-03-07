## Uso de esta proyecto

1) Se deben instalar las dependencias con ```npm install```

2) Para inicializar el proyecto hay que abrir dos terminales ubicadas en la raíz del proyecto.
En la primera hay que ejecutar el comando ```npm run tsc``` para ejecutar el transpilador de TypeScript.
En el segundo hay que ejecutar el comando ```npm run dev``` para ejecutar el nodemon.

## Estructura de carpetas (Generica)

```
root
├── app.ts                                                      
├── classes/                            
│   └── server.ts                       
├── commmon/
│   ├── index.ts
│   └── commmonExample.ts                          
├── config/                             
│   └── config.ts
├── controllers/
├── db/
│   ├── index.ts
│   ├── associations.ts
│   ├── connections.ts
│   └── models/
│       ├── index.ts
│       └── modelExample.ts
├── dist/
├── helpers/
│   ├── index.ts
│   └── helperExample.ts
├── interfaces/
│   ├── index.ts
│   └── interfaceExample.ts
├── middlewares/
│   ├── index.ts
│   └── middlewareExample.ts
├── routes/
│   ├── index.ts
│   └── routeExample.ts
├── services/
│   ├── index.ts
│   └── serviceExample.ts
└── types/
    ├── index.ts
    └── typeExample.ts
```

**Descripción**

- **app.ts**: Punto de entrada de la aplicación
- **classes/**: Todas las clases utilizadas de la a app
    - **server.ts**: Configura el servidor, DB, middlewares y rutas
- **commmon/**: Archivos con codigo generico que puede ser compartido en la app
- **config/**: Configuraciones generaes
    - **config.ts**: Exporta las variables de entorno en un objeto
- **controllers/**: Los controladores usados en las rutas
- **db/**: Todo lo relacionado a la base datos
    - **index.ts**: Donde se exporta la instancia de la DB y se llaman las asociaciones
    - **associations.ts**: Donde se crean las asociaciones de Sequelize
    - **connections.ts**: Configuración de la DB
    - **models/**: Modelos de la DB
- **dist/**: Todos los archivos transpilados de TS a JS. Se configuro en el tsconfig.json
- **helpers/**: Funciones que ayudan a realizar trabajos especificos en alguna sección de la app
- **interfaces/**: Interfaces de TypeScript
- **middlewares/**: Middlewares utilizados en las rutas
- **routes/**: Configuración de los endpoints de la app
- **services/**: Codigo que conecta a la DB y se reutiliza principalmente en los controladores
- **types/**: Types usados en la app

**Recomendaciones adicionales**

* Se recomienda usar archivos **index.ts** dentro de las carpetas donde se importen y exporten todas las funciones. De esta manera al momento de importar en otros archivos solo hace falta importar desde la carpeta raíz y no un archivo especifico, dejando más limpia la zona de importaciones

* Si la cantidad de rutas y controladores es muy grande, es mejor crear carpetas internamente que separen las rutas y controladores según la "feature" o modulo al que pertenecen


