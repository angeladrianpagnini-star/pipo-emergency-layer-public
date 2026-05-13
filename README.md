# PIPO Emergency Layer Public

## Capa visual de alerta ciudadana y respuesta territorial

PIPO Emergency Layer Public es una version publica y segura de una propuesta conceptual para mejorar la comunicacion de emergencias, la derivacion institucional y la trazabilidad operativa.

La idea principal es simple: una persona debe poder activar una alerta desde una capa visual propia del dispositivo, sin depender de la aplicacion que tenga abierta ni de que servicios de terceros modifiquen sus productos.

## Que muestra esta version publica

- una capa visual de emergencia disponible sobre la pantalla activa del dispositivo;
- alta segura con identidad, MFA y dispositivo enrolado;
- seleccion simple de tipo de incidente;
- derivacion hacia organismos competentes;
- consola basica de recepcion;
- estado del incidente;
- registro operativo general;
- cierre obligatorio de cada alerta;
- enfoque de seguridad, privacidad y minimo dato necesario.

## Alcance publico

Esta version no implementa integraciones reales, no captura datos personales, no accede a sensores del dispositivo y no opera sobre aplicaciones de terceros.

Es una demo explicativa para presentar el concepto de forma responsable.

## Principios

- No reemplaza canales oficiales de emergencia.
- No interviene aplicaciones privadas.
- No recolecta datos reales.
- No habilita vigilancia.
- Toda implementacion real requiere marco legal, autorizaciones, auditoria, seguridad y acuerdos institucionales.

## Estructura

- `prototype/`: demo visual publica y segura.
- `SECURITY.md`: principios de seguridad y privacidad.
- `PUBLIC_SCOPE.md`: diferencias entre la version publica y la version privada de trabajo.

## Uso local

Desde `prototype/`:

```powershell
node server.js
```

Abrir:

```text
http://127.0.0.1:4181
```

## Demo web publica

La demo publicable se sirve desde `docs/` mediante GitHub Pages.
