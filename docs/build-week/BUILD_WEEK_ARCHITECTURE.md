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

Modo futuro preparado solo como contrato:

- proveedor llamado desde servidor o funcion serverless;
- credenciales fuera del frontend;
- validacion de sesion, rol, finalidad y auditoria;
- entrada y salida compatibles con `AISuggestion`;
- reemplazo sin cambiar la interfaz.

No hay endpoint falso ni proveedor conectado en la demo actual.

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
