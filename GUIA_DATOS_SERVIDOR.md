# 📂 El Cuaderno de Notas: Cómo se guardan tus datos

*(Técnica Feynman: Entendiendo la memoria de tu servidor)*

Imagina de nuevo tu web como ese **Restaurante**.

Hasta ahora hemos hablado de la "Cocina" (tu código) y el "Comedor" (lo que ve la gente). Pero, ¿dónde apuntamos las reservas, las fotos de los platos y las notas de los clientes?

## 1. El "Cuaderno Sagrado" (`data/`)
En tu servidor, hay una carpeta especial llamada `data`. Esta carpeta es como el **Libro de Reservas** del restaurante.

*   **Es físico**: No está en la nube abstracta. Son archivos reales (`articles.json`, `events.json`) que viven en el disco duro del servidor.
*   **Es sagrado**: Cuando haces una reforma en el restaurante (actualizas la web con `scp`), cambias los cuadros, las mesas y las sillas... **¡pero nunca tiras el Libro de Reservas a la basura!**

### ¿Por qué lo hicimos así?
Muchas webs modernas usan bases de datos complejas (como archivadores gigantes en otra ciudad). Tú las tienes "en local" (JSON).
*   **Ventaja**: Es rapidísimo. Leer el cuaderno está ahí mismo.
*   **Ventaja**: Es tuyo. Puedes copiar el archivo y llevártelo a casa.

## 2. Las Fotos (`uploads/`)
Las fotos que subes (de los eventos, artículos, etc.) se guardan en una carpeta hermana llamada `uploads`.
*   *Analogía*: Es el tablón de corcho donde chinchetas las fotos de los empleados del mes.
*   Igual que el cuaderno, **no se toca** cuando actualizas la web.

## 3. La Regla de Oro: "No sobreescribirás en vano"
Cuando usas el comando `scp` para subir cambios, copiamos la carpeta `dist`.
**Jamás copiamos la carpeta `data` vacía de tu Mac al servidor.**

*   **En tu Mac**: La carpeta `data` suele estar vacía o con datos de prueba.
*   **En el Servidor**: La carpeta `data` tiene la información REAL de tus visitantes.

Si copiases la carpeta `data` de tu Mac al servidor... ¡estarías borrando el Libro de Reservas real y poniendo uno en blanco! (Por eso te configuré el `.gitignore` y el comando de subida para que eso sea casi imposible de hacer por error).

## 4. ¿Cómo hacer una Copia de Seguridad?
Igual que un gerente prudente fotocopia el libro de reservas.

Si quieres guardar tus datos en tu Mac por si acaso:
1.  Abres la terminal.
2.  Traes el libro del servidor a tu casa (al revés que subir):
    ```bash
    scp -P 65002 -r u740136252@46.202.158.228:domains/manuelortegacaballero.es/public_html/data/ .
    ```
    *   Esto descargará la carpeta `data` REAL a tu ordenador. ¡Ya tienes backup!
