# 🤖 Chatbot Service (n8n)

Este servicio utiliza [n8n](https://n8n.io/) como motor de automatización para el chatbot de SocialWeather.

## Configuración

### Acceso a n8n

Una vez el servicio esté corriendo, accede a:
- **URL**: http://localhost:5678
- **Usuario por defecto**: Configura en el primer acceso

### Workflows Sugeridos

1. **Webhook de Bienvenida**: Envía mensaje de bienvenida a nuevos usuarios
2. **Alertas Meteorológicas**: Notifica a usuarios cuando hay alertas en su comunidad
3. **Resumen Diario**: Envía resumen del tiempo cada mañana
4. **Respuestas Automáticas**: Bot que responde preguntas frecuentes sobre el tiempo

### Integración con SocialWeather

n8n puede conectarse con:
- **Messaging Service**: Vía Socket.IO o API REST
- **Weather Service**: Para obtener datos meteorológicos
- **Auth Service**: Para validar usuarios

### Variables de Entorno

```env
N8N_BASIC_AUTH_ACTIVE=true
N8N_BASIC_AUTH_USER=admin
N8N_BASIC_AUTH_PASSWORD=your_password
```

### Crear un Workflow

1. Accede a n8n en http://localhost:5678
2. Crea un nuevo workflow
3. Usa el nodo "Webhook" para recibir eventos
4. Añade lógica con nodos de n8n
5. Conecta con "HTTP Request" para llamar a otros servicios

### Exportar/Importar Workflows

Los workflows exportados se pueden guardar en la carpeta `workflows/` para versionarlos.
