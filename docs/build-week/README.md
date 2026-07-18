# PIPO Build Week 2026

## Etapa 6C.0 - Activacion ciudadana e internacionalizacion

La entrada de `docs/build-week/` ahora prioriza una simulacion de producto: una persona ve un punto PIPO en una
pantalla ficticia, elige una condicion de emergencia, habilita permisos simulados de manera independiente y observa
como el contexto simulado llega a una consola institucional. La experiencia es una demo conceptual: no instala una
app nativa, no contacta organismos y no activa camara, microfono, ubicacion ni sensores reales.

PIPO se proyecta como una aplicacion descargable de activacion inmediata. En Android compatible podria usar un punto
flotante autorizado por la persona. En otros sistemas podria presentarse mediante widget, pantalla bloqueada, control
del sistema, acceso directo o boton de accion; la disponibilidad final depende del sistema operativo y de permisos
explicitos.

El selector `Idioma / Language` soporta `es-AR` y `en-US` sin recargar. El selector de region es independiente y solo
presenta vocabulario de demostracion para Argentina - Buenos Aires o una vista internacional generica. La unica
preferencia persistida es `pipo_demo_locale`; incidentes, permisos, evidencia y medios simulados no se guardan.

Documentacion relacionada: `CITIZEN_ACTIVATION_WORKFLOW.md` y `LOCALIZATION_AND_REGION.md`.

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

## Etapa 5 - Acta Digital, expediente maestro y cierre trazable

Se agrega `procedure-act.js` para completar el ciclo documental:

- Acta Digital de Procedimiento PIPO;
- cronologia automatica desde bitacora y campo;
- borrador asistido por IA con revision humana obligatoria;
- indicador real de completitud;
- motor de consistencia con errores, advertencias y pendientes;
- supervision sin manipulacion del relato;
- solicitudes y respuestas de aclaracion;
- versionado v1, v2, v3, v3.1 y v3.2;
- referencia de integridad de demostracion;
- exportacion JSON;
- vista de impresion para guardar como PDF desde el navegador;
- expediente maestro como indice y sintesis;
- cierre obligatorio y trazable.

Principio obligatorio:

> Las actuaciones individuales se integran, pero nunca se sustituyen ni se reescriben.

La IA solo genera un borrador trazable. No finaliza, no firma, no bloquea, no borra y no reemplaza el
criterio humano. El sistema tambien funciona sin IA.

## Etapa 5.1 - Simulacion multiperspectiva y cierre ciudadano

Se agrega `citizen-closure.js` para separar la devolucion al ciudadano del expediente interno.

La demo incorpora cuatro perspectivas:

- `CITIZEN`: consulta estado, recibe resumen depurado, descarga documentos habilitados, confirma recepcion,
  envia opinion de servicio y puede iniciar observacion formal;
- `FIELD_OPERATOR`: reutiliza el flujo de `field-workflow.js` y muestra asignacion, acontecimientos,
  evidencia y actas propias;
- `FEDERATED_CONSOLE`: ve incidentes asignados, operadores propios, intervenciones propias, evidencia
  compartida y participacion de su base;
- `MASTER_CONSOLE`: integra el mapa completo del incidente, puede pedir aclaraciones, coordinar cierre y
  preparar el paquete ciudadano, pero no reescribe actas ajenas ni altera evidencia.

Nuevos artefactos:

- `DemoPerspectiveSession`;
- `CitizenClosureSummary`;
- `CitizenIncidentPackage`;
- `CitizenDocumentAccess`;
- `CitizenServiceFeedback`;
- `CitizenFormalObservation`;
- `CitizenFollowUpAction`;
- `CitizenDeliveryReceipt`.

El resumen ciudadano usa lenguaje claro, minimizacion y exclusiones genericas. No es copia del expediente
maestro. La vista segura se construye con `buildCitizenSafeView(masterRecord, accessContext)` y separa:

- entrega automatica;
- entrega a pedido;
- informacion restringida con motivo generico.

La opinion de servicio no modifica actas, expediente, sanciones ni cierre. La observacion formal es un
tramite separado que puede originar aclaracion, ampliacion, rectificacion o revision administrativa simulada.

## Etapa 5.2 - Boveda de evidencia y proteccion criptografica

Se agrega `evidence-vault.js` para demostrar controles de evidencia ficticia:

- `PIPO Evidence Vault`;
- deteccion de transporte `LOCAL_DEVELOPMENT`, `HTTPS_PROTECTED` y `TRANSPORT_NOT_VERIFIED`;
- cifrado local de demostracion con Web Crypto, AES-GCM e IV unico;
- SHA-256 del contenido ficticio original y de la representacion cifrada;
- verificacion de integridad y deteccion de alteracion;
- permisos por finalidad, sesion, MFA, rol, consola, supervision y vencimiento;
- acceso `RESTRICTED_JUDICIAL` con autorizacion activa y segunda aprobacion simulada;
- permisos temporales, vencimiento y revocacion;
- historial de acceso, vistas y descargas bloqueadas;
- politicas de retencion y eliminacion simulada;
- `DigitalAcquisitionRecord`;
- `Demonstration evidence transfer chain`;
- copia ciudadana depurada separada de la evidencia interna.

Aviso obligatorio:

> Local cryptographic demonstration - not a production key-management system.

La frase institucional recomendada es:

> Arquitectura proyectada con cifrado, control de acceso, hash de evidencia y auditoria.

No se implementa adquisicion real, sensores reales, seguimiento real, KMS/HSM, base de datos, certificados
productivos ni cadena de custodia oficial.

## Principios de seguridad

- Datos simulados.
- Sin credenciales de proveedor en HTML, CSS o JavaScript publico.
- Backend experimental separado de la demo publica v36.
- Sin camara, microfono ni ubicacion real.
- Sin conexion con sistemas oficiales.
- La IA aparece solo como asistencia simulada.
- Toda decision requiere validacion humana.
- La IA no despacha recursos, no cierra incidentes, no firma actas, no activa sensores y no modifica evidencia.
- El Acta Digital no afirma firma digital certificada, inmutabilidad absoluta ni valor judicial automatico.
- Las capacidades de ubicacion, audio y video permanecen deshabilitadas hasta cumplir requisitos simulados de denuncia, autorizacion, alcance, finalidad, operadores autorizados y vencimiento.

## Archivos

- `index.html`: visor de Etapas 0, 1, 1.1, 2, 3, 4A, 4B, 5, 5.1 y 5.2, auditado en Etapa 6A.
- `styles.css`: estilos independientes de la ruta Build Week.
- `data-models.js`: definiciones y estado simulado inicial.
- `ledger.js`: bitacora operativa append-only.
- `incident-scenarios.js`: escenarios ficticios para pruebas de Etapa 3.
- `ai-service.js`: servicio desacoplado con modo `SIMULATED_DEMO` y puente `OPENAI_SECURE_BACKEND`.
- `incident-assistant.js`: validacion humana, comparacion IA/humano y reglas de diferencias materiales.
- `incident-assistant.test.js`: pruebas del asistente, escenarios, bitacora, permisos y modo sin IA.
- `field-workflow.js`: flujo multioperador de campo, evidencia simulada, apoyo y actas individuales.
- `field-workflow.test.js`: pruebas de estados, eventos, evidencia, apoyo, bloqueo de actas y aclaraciones.
- `procedure-act.js`: Acta Digital de Procedimiento, completitud, consistencia, expediente, integridad y cierre.
- `procedure-act.test.js`: pruebas de Etapa 5.
- `citizen-closure.js`: perspectivas, resumen ciudadano, paquete, recibo, opinion, observacion y seguimiento.
- `citizen-closure.test.js`: pruebas de Etapa 5.1.
- `evidence-vault.js`: boveda de evidencia ficticia, cifrado de demo, permisos, retencion y adquisicion conceptual.
- `evidence-vault.test.js`: pruebas de Etapa 5.2.
- `app.js`: render de modelos, asistente, campo, acta, expediente, cierre, perspectiva ciudadana y snapshot JSON.
- `server/`: backend seguro experimental, validadores, cliente proveedor, auditoria y pruebas.
- `FIELD_OPERATOR_WORKFLOW.md`: documentacion del flujo de campo.
- `PROCEDURE_ACT_WORKFLOW.md`: documentacion del Acta Digital de Procedimiento.
- `MASTER_INCIDENT_RECORD.md`: documentacion del expediente maestro.
- `MULTI_PERSPECTIVE_DEMO.md`: guia de vistas ciudadano, campo, consola federada y consola maestra.
- `CITIZEN_CLOSURE_WORKFLOW.md`: flujo de cierre ciudadano y entrega trazable.
- `CITIZEN_DATA_ACCESS_POLICY.md`: politica de minimizacion y acceso ciudadano.
- `SECURITY_AND_EVIDENCE_PROTECTION.md`: controles de seguridad, marco legal y gobernanza.
- `EVIDENCE_VAULT_ARCHITECTURE.md`: arquitectura de la boveda y politicas de evidencia.
- `DIGITAL_ACQUISITION_WORKFLOW.md`: adquisicion digital voluntaria, guiada y autorizada conceptual.
- `SECURITY_CONTROL_STATUS.md`: matriz de controles implementados, simulados y proyectados.
- `DEMO_SCRIPT.md`: recorrido publico de menos de tres minutos.
- `TEST_PLAN.md`: plan de pruebas de Build Week.
- `PRE_EXISTING_WORK.md`: separacion entre v36 preexistente y el trabajo Build Week con referencias de commit.
- `GPT_5_6_BUILD_CONTRIBUTION.md`: atribucion prudente de la tarea de auditoria final.
- `BUILD_WEEK_FINAL_REPORT.md`: informe final de arquitectura, seguridad, pruebas y limites.
- `RELEASE_CHECKLIST.md`: checklist local de release candidate.
- `release-candidate.test.js`: prueba consolidada del release candidate.
- `GUARDIAN_DIGITAL_DEPLOYMENT_PLAN.md`: hoja de ruta futura, sin implementacion ni despliegue.

## Etapa 6A - Feature freeze y release candidate

La Etapa 6A no agrega funciones. Audita el recorrido existente, verifica el modo simulado, corrige defectos
reproducibles de accesibilidad y aislamiento de perspectivas, prepara la documentacion final y genera un
release candidate local. La rama permanece sin push, merge ni publicacion.
