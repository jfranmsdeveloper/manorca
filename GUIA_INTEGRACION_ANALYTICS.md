# Guía de Integración de Google Analytics

Esta guía te explica paso a paso cómo obtener las credenciales necesarias de Google y dónde colocarlas para activar las métricas reales en tu nuevo **SEO Dashboard**.

## Paso 1: Obtener el ID de Medición (Frontend)

Este ID permite que tu web rastree las visitas.

1.  Entra en [Google Analytics](https://analytics.google.com/).
2.  Ve a **Administrar** (icono de engranaje abajo a la izquierda) -> **Flujos de datos**.
3.  Selecciona tu web (o crea una nueva propiedad si no tienes).
4.  Copia el **ID de medición**. Tiene el formato `G-XXXXXXXXXX`.
5.  Abre el archivo `src/lib/analytics.ts` en tu código.
6.  Sustituye el valor de `GA_MEASUREMENT_ID` por tu ID copiado.

```typescript
const GA_MEASUREMENT_ID = "G-TU_CODIGO_AQUI"; 
```

## Paso 2: Crear Cuenta de Servicio (Backend)

Para que el panel de administración pueda "leer" los datos y mostrar las gráficas, necesitamos un permiso especial llamado "Cuenta de Servicio".

1.  Entra en [Google Cloud Console](https://console.cloud.google.com/).
2.  Crea un nuevo proyecto (puedes llamarlo "Manorca Analytics").
3.  Busca la **API "Google Analytics Data API"** y habilítala.
4.  Ve a **Credenciales** -> **Crear credenciales** -> **Cuenta de servicio**.
5.  Ponle un nombre y dale a "Crear".
6.  Una vez creada, pincha sobre el email de la cuenta de servicio (ej: `analytics@manorca.iam.gserviceaccount.com`).
7.  Ve a la pestaña **Claves** -> **Agregar clave** -> **Crear clave nueva** -> **JSON**.
8.  Se descargará un archivo `.json` en tu ordenador. **¡Guárdalo bien!** Este es tu archivo de acceso.

## Paso 3: Dar permiso a la Cuenta de Servicio

1.  Abre el archivo JSON que acabas de descargar y copia el `client_email`.
2.  Vuelve a [Google Analytics](https://analytics.google.com/).
3.  Ve a **Administrar** -> **Propiedad** -> **Gestión de accesos de la propiedad**.
4.  Dale al botón **+** (Añadir usuarios).
5.  Pega el email de la cuenta de servicio y dale rol de **Lectore** (Viewer).

## Paso 4: Subir credenciales al Servidor

Para que funcione en Hostinger:

1.  Renombra tu archivo JSON a `service-account.json`.
2.  Sube este archivo a tu servidor. Por seguridad, **NO lo pongas dentro de `public_html`**.
    *   Si tu web está en `/home/usuario/domains/tuweb.com/public_html`
    *   Súbelo a `/home/usuario/domains/tuweb.com/credentials/service-account.json`
3.  Edita el archivo `public/api/analytics.php`:
    *   Actualiza la ruta `$service_account_path` si es necesario.
    *   Cambia `$property_id` por el ID de tu Propiedad de Analytics (es un número, ej: `123456789`, lo puedes ver en la configuración de la propiedad en Analytics).

## Resumen de Archivos a Tocar

| Archivo | Qué poner |
| :--- | :--- |
| `src/lib/analytics.ts` | Tu `G-XXXXXXXXXX` |
| `public/api/analytics.php` | Tu `Property ID` numérico y la ruta al JSON |
| Servidor (Hostinger) | Subir el archivo `service-account.json` |

¡Y listo! Con esto tu panel dejará de mostrar el "Modo Demo" y mostrará tus datos reales.
