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
node --check docs\build-week\citizen-closure.js
node --check docs\build-week\app.js
node docs\build-week\incident-assistant.test.js
node docs\build-week\field-workflow.test.js
node docs\build-week\procedure-act.test.js
node docs\build-week\citizen-closure.test.js
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

## Casos Etapa 5.1

- cambia perspectiva entre ciudadano, campo, consola federada y consola maestra;
- conserva ID, estado, cronologia, operadores, actas, evidencia simulada, observaciones y cierre;
- muestra rol, permisos, informacion disponible y funciones restringidas;
- reutiliza `field-workflow.js` para la vista de operador de campo;
- limita la consola federada a incidentes, operadores, intervenciones y documentos propios;
- permite a la consola maestra ver referencias en solo lectura y coordinar entrega;
- impide representar a la consola maestra como autora de actas ajenas;
- genera `CitizenClosureSummary`;
- separa entrega automatica, entrega a pedido e informacion restringida;
- explica cada exclusion con motivo generico;
- genera proximos pasos con categorias normalizadas y aviso de variacion por autoridad competente;
- prepara `CitizenIncidentPackage`;
- muestra impresion, PDF por navegador y JSON depurado;
- registra entrega, apertura y confirmacion de recibo;
- procesa solicitud y descarga simulada de documento habilitado;
- bloquea descarga de documento restringido;
- registra opinion de servicio sin modificar expediente;
- registra observacion formal como tramite separado;
- diferencia opinion de servicio y observacion formal;
- registra eventos de bitacora de cierre ciudadano;
- prueba escenario A de accidente multidisciplinario;
- prueba escenario B de dispositivo sustraido;
- funciona con IA disponible y no disponible.

## Visual

Probar en navegador:

- escritorio: sin overflow horizontal;
- movil: paneles apilados y navegacion utilizable;
- foco visible en botones, inputs, selects y textareas;
- mensajes de bloqueo comprensibles;
- vista de impresion disponible;
- selector multiperspectiva visible sin overflow;
- `Citizen Closure` legible en pantalla movil.
