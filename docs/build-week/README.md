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

## Etapa 2 - Bitacora operativa append-only

Se agrega `ledger.js` con una bitacora operativa de demostracion:

- tipos de evento controlados;
- `eventId`;
- `incidentId`;
- `type`;
- `timestamp`;
- `operatorId`;
- `consoleId`;
- `sessionId`;
- `payload`;
- `classification`;
- `integrityReference`;
- `previousEventReference`.

La bitacora no expone funciones de edicion o borrado. Las rectificaciones se agregan como eventos nuevos
mediante `appendCorrection()`, conservando el evento original.

La funcion `deleteLedgerEvent()` devuelve una denegacion explicita para demostrar que los eventos no se
eliminan silenciosamente.

## Etapa 3 - PIPO AI Incident Assistant

Se agrega un asistente de incidentes con control humano obligatorio.

El modulo:

- recibe descripcion libre y datos estructurados del incidente;
- opera en modo `SIMULATED_DEMO`;
- genera resumen neutral;
- sugiere tipo, prioridad, riesgos, datos faltantes y preguntas;
- sugiere consolas federadas con finalidad, minimo a compartir y clasificacion;
- permite aceptar, modificar, rechazar o continuar sin IA;
- registra la comparacion `AI vs. Human Decision`;
- agrega eventos de analisis, revision y decision a la bitacora append-only.

PIPO remains operational without AI. AI suggestions are advisory and always subject to human validation.

El modo futuro `OPENAI_SECURE_BACKEND` queda documentado como contrato de integracion del lado servidor.
No hay endpoint falso, clave en frontend ni conexion activa con proveedores externos.

## Principios de seguridad

- Datos simulados.
- Sin claves de API.
- Sin backend.
- Sin camara, microfono ni ubicacion real.
- Sin conexion con sistemas oficiales.
- La IA aparece solo como asistencia simulada.
- Toda decision requiere validacion humana.
- La IA no despacha recursos, no cierra incidentes, no firma actas, no activa sensores y no modifica evidencia.
- Las capacidades de ubicacion, audio y video permanecen deshabilitadas hasta cumplir requisitos simulados de denuncia, autorizacion, alcance, finalidad, operadores autorizados y vencimiento.

## Archivos

- `index.html`: visor de Etapas 0, 1, 1.1, 2 y 3.
- `styles.css`: estilos independientes de la ruta Build Week.
- `data-models.js`: definiciones y estado simulado inicial.
- `ledger.js`: bitacora operativa append-only.
- `incident-scenarios.js`: escenarios ficticios para pruebas de Etapa 3.
- `ai-service.js`: servicio desacoplado con modo `SIMULATED_DEMO` y contrato futuro `OPENAI_SECURE_BACKEND`.
- `incident-assistant.js`: validacion humana, comparacion IA/humano y reglas de diferencias materiales.
- `incident-assistant.test.js`: pruebas del asistente, escenarios, bitacora, permisos y modo sin IA.
- `app.js`: render de modelos, asistente, comparacion IA/humano y snapshot JSON.

## Siguiente etapa

Etapa 4 recomendada: backend seguro experimental, sin claves en frontend, con control de entorno,
auditoria server-side y pruebas de integracion separadas de la demo publica.
