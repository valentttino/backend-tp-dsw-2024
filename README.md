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

### Customers

**GET ALL CUSTOMERS:** /api/customers
**GET ONE CUSTOMER:** /api/customers/:id
**POST:** /api/customers
**PUT:** /api/customers/:id
**DELETE:** /api/customers/:id

### Employees

**GET ALL EMPLOYEES:** /api/employees
**GET ONE EMPLOYEE:** /api/employees/:id
**POST:** /api/employees
**PUT:** /api/employees/:id
**DELETE:** /api/employees/:id

### Orders

**GET ALL ORDERS:** /api/orders
**GET ONE ORDER:** /api/orders/:orderNumber
**POST:** /api/orders
**PUT:** /api/orders/:orderNumber
**DELETE:** /api/orders/:orderNumber

### Materials

**GET ALL MATERIALS:** /api/materials
**GET ONE MATERIAL:** /api/materials/:id
**POST:** /api/materials
**PUT:** /api/materials/:id
**DELETE:** /api/materials/:id

### Payments

**GET ALL PAYMENTS:** /api/payments
**GET ONE PAYMENT:** /api/payments/:id
**POST:** /api/payments
**PUT:** /api/payments/:id
**DELETE:** /api/payments/:id

