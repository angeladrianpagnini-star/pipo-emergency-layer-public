# PIPO Build Week 2026

Ruta independiente para evolucionar PIPO Emergency Layer sin alterar la version publica v36.

## Etapa 0 - Preservacion

- Version v36 identificada en `docs/`.
- Publicacion actual confirmada en GitHub Pages: `main:/docs`.
- Punto de restauracion local: `pre-build-week-v36`.
- Rama de trabajo local: `build-week-2026`.
- Nueva ruta separada: `docs/build-week/`.

Esta carpeta no reemplaza `docs/index.html` ni modifica la entrada publica existente.

## Etapa 1 - Modelo de datos

Se crean modelos de demostracion para:

- incidente;
- evento de bitacora;
- sugerencia de IA;
- decision humana;
- derivacion;
- actuacion;
- evidencia;
- Acta Digital de Procedimiento;
- version del acta;
- revision;
- cierre;
- auditoria.

## Etapa 1.1 - Arquitectura federada, ciberdelitos y multiintervencion

Se extiende el modelo sin reemplazar lo anterior para representar:

- consolas federadas configurables;
- operadores con identidad simulada, MFA, biometria local verificada como booleano y sesion;
- participantes de incidente;
- intervenciones por consola;
- actas individuales por organismo;
- expediente digital maestro referenciado;
- solicitudes de aclaracion;
- permisos temporales de evidencia;
- autorizaciones judiciales simuladas;
- protocolo de dispositivo robado;
- reporte de ciberdelito;
- registro separado de comisaria.

Principio rector:

> Integracion sin absorcion documental.

La consola maestra puede integrar, consultar, pedir aclaraciones y marcar contradicciones. No puede reescribir,
eliminar, fusionar alterando texto original ni firmar actas individuales de otros organismos.

Tambien se agrega `canAccessResource(operator, resource, purpose)`, que evalua rol, organismo, incidente,
finalidad, nivel de sensibilidad y autorizacion temporal.

## Principios de seguridad

- Datos simulados.
- Sin claves de API.
- Sin backend.
- Sin camara, microfono ni ubicacion real.
- Sin conexion con sistemas oficiales.
- La IA aparece solo como asistencia simulada.
- Toda decision requiere validacion humana.

## Archivos

- `index.html`: visor de Etapa 0 y Etapa 1.
- `styles.css`: estilos independientes de la ruta Build Week.
- `data-models.js`: definiciones y estado simulado inicial.
- `app.js`: render de modelos, comparacion IA/humano y snapshot JSON.

## Siguiente etapa

Etapa 2: bitacora operativa inalterable con eventos automaticos, rectificaciones y historial visible.
