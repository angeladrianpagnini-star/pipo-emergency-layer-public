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
