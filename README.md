# App Debt API

API en Node.js para gestionar deudas de usuarios con PostgreSQL.

## Descripción

Esta API permite:
- Registrar usuarios y deudas.
- Diferenciar entre usuarios normales y administradores.
- Consultar deudas pendientes y pagadas.
- Evitar deudas negativas y eliminar registros huérfanos automáticamente.
- Escalable para agregar nuevas funcionalidades en el futuro.

## Tecnologías
- Node.js
- Express
- PostgreSQL
- dotenv
- body-parser

## Instalación

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/tuusuario/app_debt_api.git
