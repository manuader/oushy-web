# Conectar el feed de Instagram a la web

> Para quien administra **@oushystudio**.
> Tiempo estimado: 10–15 minutos, una sola vez.

La web de OUSHY tiene una sección que muestra las últimas publicaciones del
Instagram del estudio. Para que se actualice sola, Instagram pide una
autorización del dueño de la cuenta. Este documento es el paso a paso.

---

## Antes de empezar: qué estás autorizando (y qué no)

Es razonable desconfiar de algo que pide "un token", así que vale aclararlo:

**Lo que se entrega** es una credencial de **sólo lectura** que permite leer las
publicaciones que ya son públicas en el perfil.

**Lo que NO se entrega:**

- ❌ Tu contraseña — en ningún momento se comparte
- ❌ Acceso a mensajes directos
- ❌ Capacidad de publicar, borrar o editar nada
- ❌ Acceso a los datos de tus seguidores

**Se puede revocar cuando quieras**, desde Instagram → Configuración →
Aplicaciones y sitios web. Si lo revocás, la web simplemente vuelve a mostrar
las imágenes cargadas a mano. No se rompe nada.

---

## Paso 0 — La cuenta tiene que ser Profesional

Instagram sólo abre su API para cuentas **Profesionales** (Empresa o Creador).
Si @oushystudio hoy es una cuenta personal, hay que cambiarla.

El cambio es **gratuito, reversible y no afecta** a tus seguidores, tus
publicaciones ni el aspecto del perfil.

Desde la app de Instagram:

1. Perfil → menú ☰ → **Configuración y privacidad**
2. **Tipo de cuenta y herramientas**
3. **Cambiar a cuenta profesional**
4. Elegí la categoría que mejor describa al estudio y seleccioná **Empresa**

Si ya es Profesional, seguí de largo.

---

## Paso 1 — Crear una app en Meta for Developers

1. Entrá a **https://developers.facebook.com/apps** y logueate
   *(sirve tu cuenta personal de Facebook; no hace falta una nueva)*
2. **Crear aplicación**
3. En "¿Qué quieres que haga tu aplicación?" elegí **Otro** → **Siguiente**
4. Tipo de aplicación: **Empresa** → **Siguiente**
5. Ponele un nombre, por ejemplo `OUSHY Web`, y confirmá

---

## Paso 2 — Agregar el producto Instagram

1. Ya dentro de la app, buscá **Instagram** en la lista de productos y tocá
   **Configurar**
2. Entrá a la sección **Configuración de la API con inicio de sesión de
   Instagram**

---

## Paso 3 — Conectar la cuenta y generar el token

1. Dentro de esa sección, buscá **Generar tokens de acceso**
2. **Agregar cuenta** → se abre una ventana de Instagram
3. Iniciá sesión con **@oushystudio** y aceptá los permisos que pide
4. Al volver, aparece la cuenta listada con un botón **Generar token**
5. Tocalo y **copiá el texto largo** que aparece

Ese texto es el token. Empieza con algo tipo `IGAA...` y es bastante largo
(varios cientos de caracteres).

---

## Paso 4 — Mandármelo

Copiá el token completo y mandámelo **por un canal privado** (WhatsApp directo,
1Password, o similar).

⚠️ **No lo pegues en un grupo, ni en un mail compartido, ni en un documento
público.** Es una credencial: cualquiera que la tenga puede leer el feed a
través de tu cuenta hasta que la revoques.

---

## Importante: vence a los 60 días

El token dura **60 días**. Cuando se vence, la web deja de actualizarse sola y
vuelve a las imágenes cargadas a mano — no se rompe ni se ve mal, simplemente
deja de traer publicaciones nuevas.

Cuando pase, hay dos caminos: repetir el Paso 3 (son 2 minutos), o dejar
configurada una renovación automática. Coordinamos eso cuando lo tengamos
andando.

---

## Si algo no coincide

Meta cambia el nombre de los botones y el orden de los menús cada tanto, así
que puede que veas etiquetas un poco distintas a las de acá. Las palabras clave
a buscar siempre son las mismas: **Instagram → API con inicio de sesión de
Instagram → Generar tokens de acceso**.

Si te trabás en algún paso, mandame una captura de dónde estás y te digo qué
tocar.
