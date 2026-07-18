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

## Etapa 4A - Backend seguro experimental para GPT-5.6

Se agrega un puente server-side minimo para que el asistente pueda usar un modelo configurado por entorno,
manteniendo `SIMULATED_DEMO` como fallback operativo.

Archivos principales:

- `server/config.js`: configuracion centralizada del modelo, endpoint del proveedor, timeout y limites.
- `server/schema.js`: contrato estructurado, prioridades permitidas, confianza permitida y consolas configuradas.
- `server/prompt.js`: prompt de sistema con neutralidad, no invencion, control humano y bloqueo de acciones intrusivas.
- `server/openai-client.js`: llamada server-side al proveedor.
- `server/validator.js`: validacion de entrada, normalizacion de salida y valores seguros.
- `server/audit.js`: auditoria solo de metadatos tecnicos.
- `server/analyze-incident.js`: endpoint conceptual `POST /api/analyze-incident` y estado `GET /api/backend-status`.
- `server/server.js`: servidor local minimo para probar la ruta Build Week.
- `server/secure-backend.test.js`: pruebas del contrato, errores y auditoria.

### Modo simulado

`SIMULATED_DEMO` sigue corriendo completo en navegador:

- no transmite datos;
- no requiere servidor;
- usa reglas deterministicas;
- permite aceptar, modificar, rechazar o continuar sin IA;
- registra eventos en la bitacora demo.

### Modo backend seguro

`OPENAI_SECURE_BACKEND` requiere ejecutar el servidor local de Build Week:

```powershell
$env:PIPO_OPENAI_CREDENTIAL="credencial-del-proveedor"
$env:PIPO_OPENAI_MODEL="gpt-5.6"
node docs\build-week\server\server.js
```

Luego abrir:

```text
http://127.0.0.1:4189/
```

El modelo queda definido en `PIPO_OPENAI_MODEL`. El valor por defecto de la etapa es `gpt-5.6`, pero
esta disponible en un solo punto de configuracion para cambiarlo si el entorno proveedor usa otro nombre.

### Lo que no almacena el backend

El backend experimental no persiste:

- relato libre;
- nombres;
- ubicaciones reales;
- evidencia;
- imagen;
- voz;
- datos personales;
- contenido sensible.

La auditoria server-side registra solamente:

- `requestId`;
- timestamp;
- `incidentId` ficticio;
- modo;
- duracion;
- exito o fallo;
- version de contrato;
- modelo configurado;
- codigo de error;
- cantidad de caracteres.

### Fallback

Si el backend no esta disponible, la UI:

- conserva la entrada;
- muestra el error;
- permite reintentar;
- permite cambiar a `SIMULATED_DEMO`;
- permite continuar sin IA;
- no bloquea la operacion del operador.

El frontend no contiene credenciales del proveedor.

## Etapa 4B - Movil de campo multioperador y actas individuales

Se agrega `Field Operator Mobile`, una vista responsive para representar la intervencion territorial de
varios operadores en un mismo incidente.

El nuevo modulo `field-workflow.js` permite:

- seleccionar operadores ficticios de 911, 107, Transito, Bomberos, Policia Cientifica y Ciberdelitos;
- mostrar autenticacion simulada, MFA, biometria local y dispositivo enrolado;
- aceptar o rechazar una derivacion con fundamento;
- registrar salida, arribo, inicio, actividad, apoyo y finalizacion;
- cargar acontecimientos propios;
- incorporar evidencia simulada sin sensores reales;
- solicitar apoyo interinstitucional;
- aceptar apoyo desde la consola destinataria;
- crear, revisar, finalizar y ampliar actas individuales;
- solicitar aclaraciones sin alterar el acta fuente;
- comparar intervenciones por operador sin fusionar autoria.

Principio obligatorio:

> Cada intervencion conserva autoria, responsabilidad y trazabilidad propias.

La consola maestra integra referencias, pero no reescribe ni firma por otros operadores.

Estados controlados:

- `ASSIGNED`;
- `ACCEPTED`;
- `DEPARTED`;
- `ARRIVED`;
- `INTERVENTION_STARTED`;
- `INTERVENTION_ACTIVE`;
- `WAITING_SUPPORT`;
- `TRANSFERRED`;
- `COMPLETED`;
- `CANCELLED_WITH_REASON`.

Reglas:

- no hay arribo antes de aceptacion y salida;
- no hay intervencion antes del arribo;
- no hay finalizacion sin acontecimientos propios;
- no hay cancelacion o rechazo sin fundamento;
- no se puede modificar un acontecimiento ajeno;
- una aclaracion crea un registro nuevo;
- el acta finalizada queda bloqueada;
- una ampliacion crea nueva version documental.

## Principios de seguridad

- Datos simulados.
- Sin credenciales de proveedor en HTML, CSS o JavaScript publico.
- Backend experimental separado de la demo publica v36.
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
- `ai-service.js`: servicio desacoplado con modo `SIMULATED_DEMO` y puente `OPENAI_SECURE_BACKEND`.
- `incident-assistant.js`: validacion humana, comparacion IA/humano y reglas de diferencias materiales.
- `incident-assistant.test.js`: pruebas del asistente, escenarios, bitacora, permisos y modo sin IA.
- `field-workflow.js`: flujo multioperador de campo, evidencia simulada, apoyo y actas individuales.
- `field-workflow.test.js`: pruebas de estados, eventos, evidencia, apoyo, bloqueo de actas y aclaraciones.
- `app.js`: render de modelos, asistente, comparacion IA/humano y snapshot JSON.
- `server/`: backend seguro experimental, validadores, cliente proveedor, auditoria y pruebas.
- `FIELD_OPERATOR_WORKFLOW.md`: documentacion del flujo de campo.
- `GUARDIAN_DIGITAL_DEPLOYMENT_PLAN.md`: hoja de ruta futura, sin implementacion ni despliegue.

## Siguiente etapa

Etapa 5 recomendada: Acta Digital de Procedimiento completa, con versiones, revisiones, exportacion
controlada y cierre documental.
