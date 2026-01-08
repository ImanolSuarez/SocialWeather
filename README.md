# SocialWeather 🌦️

Una red social temática del clima para España. Consulta el tiempo, interactúa con el mapa y chatea con otros usuarios por comunidades autónomas.

## 🏗️ Arquitectura

```
┌─────────────────────────────────────────────────────────────────────┐
│                          Docker Compose                              │
├─────────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐    ┌─────────────────────────────────────────────┐ │
│  │   Frontend  │    │              API Gateway                     │ │
│  │   (React)   │◄──►│              (Express)                       │ │
│  │   :3000     │    │                :80                           │ │
│  └─────────────┘    └───────────┬───────────┬───────────┬─────────┘ │
│                                 │           │           │           │
│         ┌───────────────────────┘           │           └─────────┐ │
│         ▼                                   ▼                     ▼ │
│  ┌─────────────┐         ┌───────────────┐         ┌────────────┐  │
│  │   Auth      │         │   Weather     │         │  Chatbot   │  │
│  │  Service    │         │   Service     │         │  (n8n)     │  │
│  │   :4001     │         │    :4002      │         │  :5678     │  │
│  └──────┬──────┘         └───────┬───────┘         └────────────┘  │
│         │                        │                                  │
│         ▼                        ▼                                  │
│  ┌─────────────┐          ┌───────────┐                            │
│  │ PostgreSQL  │          │   Redis   │                            │
│  │   :5432     │          │   :6379   │                            │
│  └─────────────┘          └───────────┘                            │
└─────────────────────────────────────────────────────────────────────┘
```

## 🚀 Inicio Rápido

### Prerrequisitos

- Docker y Docker Compose instalados
- Clave API de AEMET ([obtener aquí](https://opendata.aemet.es/centrodedescargas/altaUsuario))

### Configuración

1. Clona el repositorio:
```bash
git clone <repository-url>
cd SocialWeather
```

2. Configura las variables de entorno:
```bash
# Edita el archivo .env y añade tu clave de AEMET
AEMET_API_KEY=tu-clave-api-aqui
```

3. Ejecuta la aplicación:
```bash
docker-compose up --build
```

4. Accede a la aplicación:
   - **Frontend**: http://localhost:3000
   - **API Gateway**: http://localhost:80
   - **n8n Chatbot**: http://localhost:5678

## 📁 Estructura del Proyecto

```
SocialWeather/
├── .env                    # Variables de entorno
├── docker-compose.yml      # Orquestación de contenedores
├── frontend/               # React SPA
├── gateway/                # API Gateway (Express)
├── services/
│   ├── auth/              # Servicio de autenticación
│   ├── weather/           # Servicio del clima (AEMET)
│   └── chatbot/           # n8n workflows
└── database/
    └── postgres/init/     # Scripts inicialización PostgreSQL
```

## 🔧 Servicios

### Frontend (Puerto 3000)
- React 18 + Vite
- Tailwind CSS
- Leaflet para mapas interactivos

### API Gateway (Puerto 80)
- Express.js
- Validación JWT centralizada
- Proxy a microservicios

### Auth Service (Puerto 4001)
- Registro e inicio de sesión
- JWT (Access + Refresh tokens)
- PostgreSQL para almacenamiento

### Weather Service (Puerto 4002)
- Integración API AEMET
- Caché Redis
- Pronóstico por municipio

### Chatbot - n8n (Puerto 5678)
- Workflows visuales
- Integración con servicios

##  Autenticación

- JWT Access Token (15 minutos)
- JWT Refresh Token (7 días)
- Almacenamiento seguro con httpOnly cookies

## 📝 Comandos Útiles

```bash
# Iniciar todos los servicios
docker-compose up -d

# Ver logs de un servicio
docker-compose logs -f frontend

# Reconstruir un servicio específico
docker-compose up -d --build auth

# Detener todos los servicios
docker-compose down

# Eliminar volúmenes (⚠️ borra datos)
docker-compose down -v
```

## 🛠️ Desarrollo

Para desarrollo local sin Docker:

```bash
# Frontend
cd frontend && npm install && npm run dev

# Gateway
cd gateway && npm install && npm run dev

# Auth Service
cd services/auth && npm install && npm run dev

# Weather Service
cd services/weather && npm install && npm run dev
```

## 📄 Licencia

MIT License
