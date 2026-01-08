# SocialWeather 🌦️

Aplicación web del clima para España.

## Requisitos

- **Docker**
- **API de AEMET**
- (Opcional)  **API de google Gemini**

## Instalación y Ejecución del proyecto

### 1. Clonar el repositorio
```bash
git clone https://github.com/ImanolSuarez/SocialWeather.git
cd SocialWeather
```

### 2. Configurar variables de entorno
```bash
# Copiar el archivo de ejemplo
cp .env.example .env

# Editar .env y añadir tus claves:
AEMET_API_KEY=tu-clave-de-aemet
GEMINI_API_KEY=tu-clave-de-gemini  # opcional
```

### 3. Ejecutar la aplicación
```bash
docker-compose up --build
```

### 4. Acceder a la aplicación
| Servicio | URL |
|----------|-----|
| Frontend | http://localhost:3000 |
| n8n Chatbot | http://localhost:5678 |

### 5. Configuracion del flujo de n8n

Para configurar el flujo de n8n hay que realizar los siguientes pasos:

1. Acceder a la url de n8n antes mencionada.
2. Crear un nuevo flujo.
3. Importar el flujo que se encuentra en services\chatbot\workflows llamado FlujoChatBot.
4. Publicar el Flujo y añadir las credenciales de gemini como {{ %env.GEMINI_API_KEY }}

