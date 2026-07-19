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
- un recorrido guiado de ocho etapas con recepcion maestra, derivacion paralela, recursos ficticios, actuaciones
  individuales y devolucion ciudadana depurada.

## Alcance publico

Esta version no implementa integraciones reales, no captura datos personales, no accede a sensores del dispositivo y no opera sobre aplicaciones de terceros.

Es una demo explicativa para presentar el concepto de forma responsable.

## Principios

- No reemplaza canales oficiales de emergencia.
- No interviene aplicaciones privadas.
- No recolecta datos reales.
- No habilita vigilancia.
- Toda implementacion real requiere marco legal, autorizaciones, auditoria, seguridad y acuerdos institucionales.

## Tres capas del modelo

La propuesta se ordena en tres niveles:

- Capa ciudadana: boton PIPO, alerta, ubicacion, evidencia disponible y condicion de emergencia.
- Capa institucional: centro de monitoreo, operador, derivacion, funcionario receptor, organismos intervinientes y cierre del caso.
- Capa de gobernanza digital: identidad, MFA, roles, auditoria, cifrado proyectado, hash de evidencia, cadena de custodia, proteccion de datos e interoperabilidad.

## Marco legal y gobernanza

Una implementacion real debe definir consentimiento, tratamiento de datos sensibles, biometria, imagen y voz, ubicacion en tiempo real, resguardo de menores, cadena de custodia digital, acceso por funcionario autorizado, prohibicion de vigilancia permanente y auditoria posterior.

Tambien debe existir una autoridad de gobernanza que determine quien administra, quien accede, quien audita, quien conserva evidencia, quien deriva, quien cierra el caso, quien responde por mal uso y quien habilita integraciones externas.

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
