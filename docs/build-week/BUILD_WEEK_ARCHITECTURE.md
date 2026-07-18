# PIPO Build Week Architecture

## Capas

1. Capa ciudadana:
   - boton PIPO;
   - alerta;
   - ubicacion declarada o estimada;
   - evidencia seleccionada;
   - condicion de emergencia.

2. Capa institucional:
   - Centro de Monitoreo;
   - operador;
   - derivacion;
   - funcionario receptor;
   - bases operativas federadas;
   - actas individuales y expediente maestro.

3. Capa de gobernanza digital:
   - identidad;
   - MFA;
   - roles;
   - auditoria;
   - cifrado proyectado;
   - hash de evidencia;
   - cadena de custodia;
   - proteccion de datos;
   - interoperabilidad.

## Etapa 6C.0 - Entrada ciudadana simulada

La ruta Build Week agrega una capa visual de activacion anterior a las consolas y modulos tecnicos. La capa usa un
estado transitorio en memoria: condicion seleccionada, permisos simulados, sesion simulada y una bitacora enlazada por
referencias de demostracion. No consume APIs de dispositivos, no almacena incidencias y no reemplaza los modelos de
datos ni la bitacora institucional existentes.

El flujo visible es: ciudadano -> consola maestra -> organismo competente -> operador de campo -> acta y expediente
-> cierre ciudadano. El proposito es hacer comprensible el recorrido del contexto sin afirmar despacho o integracion
real.

La localizacion de la capa ciudadana se resuelve en `citizen-activation.js` para `es-AR` y `en-US`. La region
operativa solo cambia etiquetas de demostracion, no capacidades ni conexiones institucionales.

## Etapa 6C.1 - Orquestacion visual del incidente

`operational-journey.js` organiza el recorrido principal como una maquina de estado solo en memoria. Sus ocho etapas
recorren activacion ciudadana, recepcion maestra, derivacion simultanea, seleccion humana de recursos, campo,
documentacion, cierre y paquete ciudadano. La superficie se divide en tres zonas responsivas: ciudadania,
coordinacion institucional y campo.

La orquestacion no reemplaza los modelos institucionales existentes. Cada organismo conserva recurso, operador,
estado y acta individual ficticios. La Consola Maestra recibe referencias para integrar el recorrido sin absorber ni
reescribir los registros de origen. Los eventos se agregan a una bitacora de demostracion enlazada por referencia
previa; no hay almacenamiento persistente, cadena de custodia oficial, despacho ni integracion externa.

## Etapa 3

`PIPO AI Incident Assistant` queda desacoplado de la interfaz:

- `incident-scenarios.js`: datos ficticios de prueba.
- `ai-service.js`: motor de analisis.
- `incident-assistant.js`: decision humana y comparacion.
- `app.js`: adaptador de UI y bitacora.

La interfaz llama a una funcion logica:

```js
analyzeIncident(input, context, options)
```

El resultado siempre incluye `requiresHumanValidation: true`.

## Modos

### SIMULATED_DEMO

- corre completo en GitHub Pages;
- usa reglas deterministicas;
- no transmite datos;
- no requiere claves;
- rotula la experiencia como simulacion.

### OPENAI_SECURE_BACKEND

Modo experimental de Etapa 4A:

- proveedor llamado desde servidor local Build Week;
- credencial fuera del frontend;
- validacion de esquema, limite de caracteres, timeout y errores seguros;
- auditoria server-side solo de metadatos;
- entrada y salida compatibles con `AISuggestion`;
- fallback hacia `SIMULATED_DEMO` o continuidad sin IA.

El endpoint conceptual es `POST /api/analyze-incident`. La UI consulta `GET /api/backend-status` para
mostrar disponibilidad sin exponer credenciales.

La configuracion centralizada vive en `server/config.js`:

- `PIPO_OPENAI_CREDENTIAL`: credencial del proveedor, solo servidor.
- `PIPO_OPENAI_MODEL`: modelo configurado, por defecto `gpt-5.6`.
- `PIPO_OPENAI_TIMEOUT_MS`: timeout.
- `PIPO_OPENAI_MAX_FREE_TEXT_CHARS`: limite de texto.
- `PIPO_BACKEND_DEMO_ONLY=1`: fuerza backend no disponible para pruebas.

La llamada al proveedor usa Responses API con salida estructurada por JSON schema. Si el proveedor no
esta disponible, falla sin stack trace y conserva el flujo operativo.

## Contrato Etapa 4A

Entrada minima:

- `incidentId`;
- `freeText`;
- `channel`;
- `estimatedLocation`;
- `riskIndicators`;
- `existingContext`;
- `requestedMode`.

Salida normalizada:

- `neutralSummary`;
- `suggestedIncidentType`;
- `suggestedPriority`;
- `detectedRiskFactors`;
- `availableInformation`;
- `missingCriticalInformation`;
- `followUpQuestions`;
- `suggestedConsoles`;
- `suggestedSpecialties`;
- `safetyWarnings`;
- `authorizationRequirements`;
- `confidenceLevel`;
- `reasoningSummary`;
- `sourceFacts`;
- `unsupportedClaims`;
- `requiresHumanValidation`.

Valores permitidos:

- prioridad: `GREEN`, `YELLOW`, `RED`, `UNDETERMINED`;
- confianza: `LOW`, `MEDIUM`, `HIGH`;
- consolas: las definidas en `server/schema.js`.

Si falta informacion o el proveedor devuelve valores fuera de contrato, el backend completa con valores
seguros, marca advertencias y no inventa datos.

## Gobernanza digital

PIPO se mantiene separado en tres responsabilidades:

- Capa ciudadana: boton PIPO, alerta, ubicacion declarada, evidencia seleccionada y condicion de emergencia.
- Capa institucional: Centro de Monitoreo, operador, derivacion, funcionario receptor y organismos intervinientes.
- Capa de gobernanza digital: identidad, MFA, roles, auditoria, cifrado proyectado, hash de evidencia,
  cadena de custodia, proteccion de datos e interoperabilidad.

Toda capacidad de imagen, voz, ubicacion en tiempo real, dispositivo robado, ciberdelito o tratamiento de
menores exige finalidad, base legal, autorizacion competente, acceso por rol y auditoria posterior. El
backend de Etapa 4A no ejecuta ninguna de esas acciones.

## Etapa 5.2 - Boveda y seguridad de evidencia

La Etapa 5.2 agrega una capa especifica de proteccion documental:

- `PIPO Evidence Vault`: boveda de evidencia ficticia con estado, clasificacion, titularidad, politica de acceso y retencion.
- `CommunicationSecurityStatus`: estado visible de transporte local, HTTPS o no verificado.
- `EvidenceAccessRequest` y `EvidenceAccessHistory`: solicitud, decision, historial de vista y descarga.
- `EvidenceSharingGrant`: permiso temporal y revocable por finalidad y campos visibles.
- `EvidenceRetentionPolicy`: politica de conservacion, hold y eliminacion simulada.
- `DigitalAcquisitionRecord`: registro conceptual de entrega voluntaria, preservacion guiada o adquisicion autorizada.
- `EvidenceTransferRecord`: cadena de transferencia demostrativa.
- `CitizenSanitizedEvidenceCopy`: copia ciudadana depurada separada de la evidencia interna.

### Control de acceso

`canAccessResource()` conserva compatibilidad con usos anteriores y agrega respuesta ampliada:

- `allowed`;
- `reason`;
- `limitations`;
- `expiresAt`;
- `requiresSecondApproval`;
- `visibleFields`;
- `downloadable`;
- `watermarkedViewRequired`.

Finalidades autorizadas:

- `OPERATIONAL_RESPONSE`;
- `MEDICAL_ASSISTANCE`;
- `JUDICIAL_REVIEW`;
- `CYBERCRIME_ANALYSIS`;
- `FIELD_DOCUMENTATION`;
- `SUPERVISORY_REVIEW`;
- `CITIZEN_DELIVERY`;
- `QUALITY_AUDIT`.

Para `RESTRICTED_JUDICIAL` se exige finalidad compatible, autorizacion activa, operador autorizado, MFA,
sesion vigente, segunda aprobacion simulada, supervision y auditoria.

### Criptografia

La demo cifra solo contenido ficticio:

- Web Crypto;
- AES-GCM;
- IV unico;
- SHA-256 independiente;
- verificacion despues de descifrar;
- revocacion logica.

Aviso obligatorio:

`Local cryptographic demonstration - not a production key-management system.`

Arquitectura productiva:

- HTTPS/TLS;
- WSS;
- certificados;
- proteccion contra downgrade;
- cabeceras seguras;
- restriccion de origen;
- autenticacion de servicio;
- vencimiento de sesiones;
- reintentos seguros;
- revocacion;
- envelope encryption;
- KMS/HSM;
- rotacion;
- separacion de funciones;
- respaldo seguro;
- destruccion segura.

## Bitacora

Los eventos de IA y decision humana se agregan a la cadena append-only:

- `ai.analysis.requested`;
- `ai.analysis.completed`;
- `ai.analysis.failed`;
- `ai.suggestion.presented`;
- `human.review.started`;
- `human.suggestion.accepted`;
- `human.suggestion.modified`;
- `human.suggestion.rejected`;
- `human.decision.confirmed`;
- `incident.classification.updated`;
- `console.suggested`;
- `console.assigned`;
- `followup.question.created`;
- `followup.answer.recorded`.

La bitacora reconstruye entrada original, sugerencia, revision, decision final, diferencias y derivacion preparada.

## Etapa 4B - Campo multioperador

`field-workflow.js` agrega una capa operativa de campo separada de la consola maestra.

Componentes:

- operadores ficticios;
- asignaciones;
- estados de intervencion;
- acontecimientos individuales;
- evidencia simulada;
- solicitudes de apoyo;
- actas individuales;
- versiones documentales;
- aclaraciones.

Principio:

> Cada intervencion conserva autoria, responsabilidad y trazabilidad propias.

La consola maestra puede ver referencias y solicitar aclaraciones, pero no puede modificar el registro de
otro operador. Cada funcionario conserva:

- `operatorId`;
- `consoleId`;
- `role`;
- `rankOrRole`;
- `specialty`;
- `enrolledDeviceId`;
- `sessionId`;
- `joinedAt`;
- `interventionStatus`;
- `individualActId`.

### Estados de intervencion

La maquina de estados impide:

- arribo antes de aceptacion;
- intervencion antes de arribo;
- cierre sin acontecimientos propios;
- cancelacion o rechazo sin fundamento.

Los estados son:

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

### Acontecimientos

Cada acontecimiento es append-only y contiene:

- `eventId`;
- `incidentId`;
- `operatorId`;
- `consoleId`;
- `timestamp`;
- `category`;
- `description`;
- `classification`;
- `locationSimulated`;
- `linkedEvidenceIds`;
- `integrityReference`.

Un operador no edita acontecimientos de otro. Toda aclaracion o rectificacion genera un nuevo evento con
referencia al original.

### Evidencia simulada

No se capturan sensores reales ni ubicacion real. La evidencia contiene autor, operador, organismo,
fecha, hora, tipo, clasificacion, origen, descripcion, referencia de integridad, permisos y consolas con acceso.

### Actas individuales

Cada operador genera su propia `Individual Intervention Act`. El acta finalizada queda bloqueada. Toda
ampliacion posterior crea una version nueva sin alterar la version original.

La vista muestra:

`Documento individual del funcionario interviniente. No sustituye las actas de otros operadores.`

### Relacion con IA

La IA puede ordenar datos y detectar faltantes, pero no inventa acontecimientos, no transforma
manifestaciones en hechos, no finaliza actas y no sustituye al operador.

## Etapa 5 - Cierre documental

`procedure-act.js` agrega la capa documental final del incidente.

Componentes:

- `ProcedureActState`;
- `Acta Digital de Procedimiento PIPO`;
- cronologia automatica;
- borrador asistido por IA;
- completitud;
- motor de consistencia;
- supervision;
- aclaraciones;
- versiones;
- referencia de integridad;
- `Master Incident Record`;
- cierre trazable.

Principio:

> Las actuaciones individuales se integran, pero nunca se sustituyen ni se reescriben.

### Flujo

1. La consola maestra crea el Acta Digital desde bitacora y actas individuales.
2. El sistema arma cronologia por referencia a eventos, operadores, consolas, evidencia y actas fuente.
3. La IA puede generar un borrador neutral y trazable.
4. El operador revisa y completa confirmacion.
5. El motor calcula completitud.
6. El motor de consistencia detecta errores, advertencias y datos pendientes.
7. Si corresponde, supervisor valida recepcion sin modificar relato.
8. El acta se finaliza y queda bloqueada.
9. Ampliaciones o rectificaciones crean versiones nuevas.
10. El expediente maestro se genera como indice y sintesis.
11. La consola maestra propone y ejecuta cierre si no hay bloqueantes.

### Estados del Acta Digital

- `DRAFT`;
- `IN_REVIEW`;
- `PENDING_SUPERVISOR`;
- `RETURNED_FOR_CLARIFICATION`;
- `FINALIZED`;
- `AMENDED`;
- `RECTIFIED`;
- `ANNULLED_WITH_REASON`.

Una version finalizada no se sobrescribe. Toda ampliacion, rectificacion o anulacion conserva el documento
original y agrega una version con motivo, autor, fecha, referencia previa e integridad de demostracion.

### Consistencia

Los hallazgos se clasifican como:

- `BLOCKING_ERROR`;
- `WARNING`;
- `RECOMMENDATION`;
- `PENDING_INFORMATION`.

Los errores bloqueantes impiden finalizar el acta o cerrar el incidente.

### Integridad

La demo usa una referencia de integridad rotulada como:

`Referencia de integridad de la demostracion`

El modulo incluye una funcion async que usa Web Crypto API para SHA-256 cuando esta disponible y fallback
deterministico cuando no lo esta.

No afirma firma digital certificada, cadena de custodia judicial completa, inmutabilidad absoluta,
certificacion estatal ni prueba judicial automatica.

## Etapa 5.1 - Multiperspectiva y devolucion ciudadana

`citizen-closure.js` agrega una capa de presentacion y entrega ciudadana sobre el expediente ya generado.
No reemplaza `procedure-act.js`: consume el expediente, actas, cronologia y bitacora para construir una
vista depurada.

### Perspectivas

- `CITIZEN`: ve estado general, organismos participantes, documentos habilitados, proximos pasos y canales
  de consulta. No ve identidades protegidas, notas internas, operaciones reservadas, evidencia de terceros,
  comunicaciones internas ni informacion `RESTRICTED_JUDICIAL`.
- `FIELD_OPERATOR`: reutiliza `field-workflow.js`; ve su asignacion, minimo necesario, acontecimientos,
  evidencia y actas propias. No firma por terceros ni edita actas ajenas.
- `FEDERATED_CONSOLE`: ve incidentes asignados, operadores propios, evidencia compartida por finalidad,
  documentos propios y estado de participacion.
- `MASTER_CONSOLE`: puede mapear el incidente completo, ver referencias en solo lectura, pedir aclaraciones,
  coordinar cierre y generar el paquete ciudadano. No borra eventos, no altera evidencia y no convierte
  divergencias en un relato unico.

### Modelos

La etapa agrega:

- `DemoPerspectiveSession`;
- `CitizenClosureSummary`;
- `CitizenIncidentPackage`;
- `CitizenDocumentAccess`;
- `CitizenServiceFeedback`;
- `CitizenFormalObservation`;
- `CitizenFollowUpAction`;
- `CitizenDeliveryReceipt`.

Todos comparten `id`, `incidentId`, `createdAt`, `createdBy`, `status`, `version`, `classification` e
`integrityReference`.

### Vista segura

`buildCitizenSafeView(masterRecord, accessContext)` aplica minimizacion y devuelve:

- `deliverableAutomatically`;
- `deliverableOnRequest`;
- `restricted`;
- `visibleTimeline`;
- `minimizationNotice`.

Cada exclusion informa un motivo generico. El motivo evita exponer datos de terceros, tacticas operativas,
medidas judiciales o comunicaciones internas.

### Cierre ciudadano

`CitizenClosureSummary` contiene:

- ID de incidente;
- fecha de inicio y cierre;
- descripcion inicial depurada;
- estado final;
- organismos participantes;
- acciones relevantes;
- derivaciones;
- referencias simuladas de acta, denuncia o constancia;
- documentos habilitados;
- medidas pendientes;
- organismo responsable;
- proximos pasos;
- recomendaciones de cuidado;
- canales de consulta;
- referencia de integridad.

El paquete ciudadano incluye impresion, guardado como PDF desde navegador y JSON depurado. La opinion de
servicio es dato de calidad separado. La observacion formal tiene circuito propio y no altera el expediente
por si misma.
