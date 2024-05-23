# Proyecto Backend API REST

Este es el repositorio del backend de la aplicación que estamos creando para la materia **'Desarrollo de Software'**. 

La API REST está construida usando Express y TypeScript, y se ejecuta con pnpm para la gestión de dependencias.

## Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución para JavaScript en el servidor.
- **Express**: Framework para construir aplicaciones web y APIs.
- **TypeScript**: Superset de JavaScript que añade tipado estático.
- **pnpm**: Gestor de paquetes rápido y eficiente.
- **tsc-watch**: Utilidad para compilar el proyecto TypeScript en tiempo real.

## Instalación

1. Clona el repositorio:
   ```sh
   git clone https://github.com/tu-usuario/tu-repo-backend.git
   cd tu-repo-backend```
   
2. Instala las dependencias con pnpm:
  ```pnpm install```

## Scripts Disponibles

- Compilar el proyecto:
  ```pnpm run build```

- Iniciar el servidor en modo desarrollo:
  ```pnpm start:dev```

## Endpoints

### Obtener todos los clientes

- URL: /api/clientes
- Método: GET
- Descripción: Retorna una lista de todos los clientes.

### Obtener un cliente por ID

- URL: /api/clientes/:id
- Método: GET
- Descripción: Retorna los datos del cliente con el ID especificado.

### Crear un nuevo cliente

- URL: /api/clientes
- Método: POST
- Descripción: Crea un nuevo cliente con la información proporcionada en el cuerpo de la solicitud.
- Cuerpo de la Solicitud:
   ``` 
   {
	"id": "Id del Cliente",
    "dni": "DNI del Cliente",
    "nomApe": "Nombre y apellido del Cliente",
    "direccion": "Dirección del Cliente",
    "email": "email@ejemplo.com",
    "telefono": "1234567890"
  }

### Actualizar un cliente

- URL: /api/clientes/:id
- Método: PUT
- Descripción: Actualiza los campos especificados del cliente con el ID especificado.
- Cuerpo de ejemplo de una Solicitud:
  ```
  {
    "nombre": "Nombre Actualizado",
    "email": "nuevoemail@ejemplo.com",
    "telefono": "0987654321"
  } 

### Eliminar un cliente

- URL: /api/clientes/:id
- Método: DELETE
- Descripción: Elimina el cliente con el ID especificado.

## Estructura del Proyecto

/tu-repo-backend
│
├── src
│   ├── app.ts
│   ├── cliente.ts
│
├── dist
│   └── (archivos compilados)
│
├── node_modules
│
├── .gitignore
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
└── README.md
