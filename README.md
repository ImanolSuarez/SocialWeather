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

