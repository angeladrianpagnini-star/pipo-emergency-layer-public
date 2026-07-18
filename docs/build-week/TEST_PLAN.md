# Build Week Test Plan

## Alcance

Pruebas para la ruta `docs/build-week/` sin modificar la version publica v36.

## Automatizadas

Ejecutar:

```powershell
node --check docs\build-week\data-models.js
node --check docs\build-week\ledger.js
node --check docs\build-week\incident-scenarios.js
node --check docs\build-week\ai-service.js
node --check docs\build-week\incident-assistant.js
node --check docs\build-week\field-workflow.js
node --check docs\build-week\procedure-act.js
node --check docs\build-week\app.js
node docs\build-week\incident-assistant.test.js
node docs\build-week\field-workflow.test.js
node docs\build-week\procedure-act.test.js
node docs\build-week\server\secure-backend.test.js
git diff --check
```

## Credential scan

```powershell
rg -n "sk-[A-Za-z0-9]|OPENAI_API[_-]KEY|api[_-]?key|secr[e]t|pass[word]|private[_-]?key|BEGIN .*K[E]Y|tok[e]n" docs\build-week
```

## Regresion v36

```powershell
git diff -- docs/index.html docs/styles.css docs/app.js
```

Debe devolver vacio.

## Casos Etapa 5

- genera Acta Digital;
- crea cronologia automatica;
- clasifica informacion;
- genera borrador asistido;
- funciona sin IA;
- calcula completitud;
- detecta errores bloqueantes;
- muestra advertencias;
- impide finalizar incompleto;
- versiona;
- bloquea version final;
- rectifica sin reescribir original;
- calcula referencia de integridad;
- exporta JSON;
- genera vista de impresion;
- requiere supervisor en caso critico;
- solicita y responde aclaracion;
- genera expediente maestro;
- bloquea cierre invalido;
- cierra incidente valido;
- conserva varias actas independientes;
- valida bitacora append-only.

## Visual

Probar en navegador:

- escritorio: sin overflow horizontal;
- movil: paneles apilados y navegacion utilizable;
- foco visible en botones, inputs, selects y textareas;
- mensajes de bloqueo comprensibles;
- vista de impresion disponible.
