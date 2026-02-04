# 🚀 Despliegue en Hostinger (Versión PHP)

¡Buenas noticias! Ahora tu web es mucho más compatible con Hostinger y cualquier hosting compartido. 

Hemos migrado la "lógica" que antes hacía server.js a pequeños archivos PHP que funcionan de forma nativa en Hostinger sin configurar nada complicado.

## 1. Preparar la Web

Como siempre, construye la versión final de tu web en tu ordenador:

```bash
npm run build
```

Esto generará la carpeta `dist/`. Ahora, curiosamente, tu backend PHP también estará dentro de `dist/api/` porque hemos creado los archivos en `public/api`.

## 2. Subir a Hostinger

Usa FileZilla o el Administrador de Archivos de Hostinger.

### ¿Qué subir?
Sube **TODO** el contenido de la carpeta `dist/` **DENTRO** de la carpeta `public_html/` de tu servidor.

Tu estructura en el servidor debería quedar así:
```
public_html/
├── assets/          (Archivos JS y CSS de la web)
├── api/             (Tus nuevos archivos PHP: articles.php, etc.)
├── index.html       (La portada de tu web)
├── ... otros archivos ...
└── data/            (¡IMPORTANTE! Tu carpeta de datos)
```

> [!IMPORTANT]
> **La carpeta `data/`**: Si es la primera vez, crea una carpeta `data` junto a `index.html`. Si ya tenías datos de la versión anterior (Node.js), muévelos aquí. Los archivos PHP buscarán los datos en `../data/`, es decir, una carpeta al mismo nivel que `api/`.
> 
> **La carpeta `uploads/`**: Lo mismo para las fotos. Debe estar al mismo nivel que `api/`.
>
> **Estructura Correcta**:
> - `public_html/api/articles.php`
> - `public_html/data/articles.json`
> - `public_html/uploads/foto1.jpg`

## 3. Comprobar que funciona

1. Entra a tu web `tudominio.com`.
2. Intenta editar un artículo o subir una foto.
3. Si funciona, ¡felicidades! Ya estás usando el backend PHP.

## 4. Desarrollo Local (En tu Mac)

En tu Mac, como no tienes PHP instalado:
*   Sigue usando `npm run dev` y `node server.js` como siempre.
*   El código es inteligente: si detecta que estás en mac (localhost), usará el servidor Node antiguos. Si detecta que está en la web real, usará los PHP.

## Solución de Problemas

*   **Error 404 en API**: Asegúrate de que la carpeta `api` se ha subido correctamente dentro de `public_html`.
*   **Permisos de Escritura**: Asegúrate de que las carpetas `data` y `uploads` tienen permisos de escritura (755 o 777 si es necesario prueba temporalmente).
*   **Archivos grandes**: Si subes archivos muy grandes y fallan, puede que necesites configurar PHP en Hostinger para aumentar `upload_max_filesize`.
