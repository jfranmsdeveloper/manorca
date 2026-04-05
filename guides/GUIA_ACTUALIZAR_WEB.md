# 🚀 Guía de Actualización: "De mi Mac al Mundo"

*(Explicado con la técnica Feynman: Simple, sin tecnicismos innecesarios y paso a paso)*

Imagina que tu web es como un **Restaurante**.
*   **Tu Mac (Local)** es la **Cocina de pruebas**: Aquí inventas los platos, pruebas ingredientes y si algo se quema, no pasa nada.
*   **Hostinger (Servidor)** es el **Comedor público**: Aquí es donde la gente real viene a comer. Solo sacamos la comida cuando está perfecta.

Cada vez que quieras cambiar el menú (actualizar la web), tienes que seguir estos **3 Pasos Sagrados**:

---

## 🍳 PASO 1: Cocinar (Build)
*Objetivo: Empaquetar tu código para que esté listo para servir.*

Cuando tú escribes código, está "crudo". El navegador no lo entiende bien. Tenemos que "cocinarlo".

1.  Abre la **Terminal** de tu Mac.
    *(No la negra de Hostinger, sino una nueva en tu ordenador).*
2.  Asegúrate de estar en tu restaurante (tu carpeta):
    ```bash
    cd /Users/franmolsan/Documents/Developer/manorca
    ```
3.  Dale al botón de "Cocinar":
    ```bash
    npm run build
    ```
    *   **¿Qué pasará?** Verás letras de colores. Si al final dice `✓ built in...`, ¡el plato está listo! Se ha guardado en una cajita llamada `dist`.

---

## 🚚 PASO 2: El Reparto (Upload)
*Objetivo: Llevar la caja `dist` desde tu Cocina (Mac) hasta el Comedor (Hostinger).*

No vamos a llevar toda la cocina (no subimos `node_modules` ni `src`). Solo la caja con la comida lista (`dist`) y el manual de instrucciones (`server.js`).

1.  En la **misma terminal de tu Mac**, ejecuta este comando mágico (copia y pega):
    ```bash
    scp -P 65002 -r dist server.js package.json u740136252@46.202.158.228:domains/manuelortegacaballero.es/public_html/
    ```
    *(Te pedirá la contraseña. Escríbela, aunque no salgan estrellitas, tú escribe y dale a Enter).*

    *   **¿Qué pasará?** Verás una lista de archivos "volando" hacia el servidor con porcentajes (100%).
    *   **Nota Anti-Miedo**: Esto **NO borra** las fotos que la gente ha subido ni los datos guardados en el servidor. Solo actualiza el diseño y el código.

---

## 🛎️ PASO 3: Tocar la Campana (Restart)
*Objetivo: Avisar a los camareros (el Servidor) de que hay un nuevo menú.*

Si no haces esto, el servidor seguirá sirviendo el menú de ayer aunque ya hayas traído la comida nueva.

1.  Entra en el Comedor (conéctate al servidor):
    ```bash
    ssh -p 65002 u740136252@46.202.158.228
    ```
2.  Una vez dentro (verás que pone `u740136252@...`), da la orden de reinicio:
    ```bash
    pm2 restart manorca || pm2 start ~/domains/manuelortegacaballero.es/public_html/server.js --name "manorca"
    ```
    *   Le decimos: *"Reiníciate. Y si estabas apagado, ¡enciéndete!"*.
3.  Sal del servidor para volver a casa:
    ```bash
    exit
    ```

---

## 🎉 ¡FIN!
Ya puedes abrir tu navegador y ver los cambios.

### Resumen para copiar y pegar (Cheat Sheet)

```bash
# 1. En tu Mac:
npm run build

# 2. En tu Mac:
scp -P 65002 -r dist server.js package.json u740136252@46.202.158.228:domains/manuelortegacaballero.es/public_html/

# 3. Entras y reinicias:
ssh -p 65002 u740136252@46.202.158.228
pm2 restart manorca || pm2 start ~/domains/manuelortegacaballero.es/public_html/server.js --name "manorca"
exit
```
