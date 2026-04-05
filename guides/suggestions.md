# Sugerencias de Mejora y Módulos para Manorca

Basado en la estructura actual del proyecto (Portafolio/Sitio Personal con Blog y Herramientas Admin), aquí tienes 5 sugerencias para enriquecer la experiencia y funcionalidad:

## 1. Módulo de Newsletter / Suscripción
**Por qué:** Para fidelizar a los lectores de tus artículos y actualizaciones.
**Implementación:**
- Crear una pequeña sección "Suscríbete" en el pie de página o en la sección de Publicaciones.
- Integración sencilla con servicios gratuitos como **Mailchimp** o **ConvertKit**.
- O una solución propia guardando correos en tu backend actual (`data/subscribers.json`) para enviar correos manualmente después.

## 2. Modo Oscuro/Claro (Dark Mode Toggle)
**Por qué:** Mejora la accesibilidad y es un estándar en sitios web modernos ("Apple Liquid Glass" se ve genial en ambos).
**Implementación:**
- Usar `next-themes` (ya parece estar en tus dependencias) o Contexto de React.
- Añadir un botón flotante o en el Header para alternar el tema.
- Ajustar los colores de fondo y texto usando variables CSS o clases de Tailwind (`dark:bg-black`).

## 3. Dashboard de Métricas de Visitas
**Por qué:** Ya tienes un "Analista AI", ¿por qué no analizar tu propio tráfico?
**Implementación:**
- Integrar una solución ligera y respetuosa con la privacidad como **Plausible Analytics** o implementar un contador propio simple en el backend.
- Crear una vista en tu panel de Admin que muestre gráficas de: artículos más leídos, horas de visita y procedencia.

## 4. Portafolio Interactivo "Timeline"
**Por qué:** La sección "Sobre Mí" o "Trayectoria" puede ser más visual.
**Implementación:**
- Módulo de línea de tiempo vertical u horizontal donde cada hito (Uni, Trabajos, Proyectos) sea interactivo.
- Al hacer clic en un hito, se expande una tarjeta con detalles, fotos o tecnologías usadas.

## 5. Sistema de Comentarios en Artículos (Giscus/Disqus)
**Por qué:** Fomenta la comunidad y el debate en tus publicaciones.
**Implementación:**
- **Giscus**: Utiliza las discusiones de GitHub para almacenar comentarios. Es gratuito, sin anuncios y muy "developer-friendly".
- **Backend propio**: Ya tienes sistema de escritura de archivos JSON, podrías añadir `comments.json` vinculado al ID del artículo.

---

> Estas mejoras se centran en aumentar la interacción del usuario (Newsletter, Comentarios) y mejorar la experiencia visual (Dark Mode, Timeline).
