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
node --check docs\build-week\evidence-vault.js
node --check docs\build-week\citizen-activation.js
node --check docs\build-week\app.js
node docs\build-week\incident-assistant.test.js
node docs\build-week\field-workflow.test.js
node docs\build-week\procedure-act.test.js
node docs\build-week\citizen-closure.test.js
node docs\build-week\evidence-vault.test.js
node docs\build-week\citizen-activation.test.js
node docs\build-week\server\secure-backend.test.js
node docs\build-week\release-candidate.test.js
git diff --check
```

## Credential scan

```powershell
rg -n "sk-[A-Za-z0-9]|OPENAI_API[_-]KEY|api[_-]?key|secr[e]t|pass[word]|private[_-]?key|BEGIN .*K[E]Y|tok[e]n" docs\build-week
```

## Browser storage scan

```powershell
rg -n "\.setItem\(|\.getItem\(|\.open\(" docs\build-week\evidence-vault.js docs\build-week\evidence-vault.test.js
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

## Casos Etapa 5.2

- muestra estado `LOCAL_DEVELOPMENT` cuando corre HTTP local;
- muestra `HTTPS_PROTECTED` cuando la pagina se sirve por HTTPS;
- muestra `TRANSPORT_NOT_VERIFIED` cuando el transporte no puede validarse;
- cifra contenido ficticio con Web Crypto;
- usa IV unico por cifrado;
- calcula SHA-256 del contenido ficticio original;
- calcula SHA-256 de la representacion cifrada;
- descifra solo con acceso autorizado;
- verifica integridad despues de descifrar;
- detecta alteracion de contenido ficticio;
- deniega acceso sin MFA, sesion o segunda aprobacion cuando corresponde;
- permite acceso por finalidad autorizada;
- deniega finalidad no habilitada;
- vence permisos temporales y bloquea acceso posterior;
- revoca permisos temporales y conserva historial;
- registra cada vista con evidencia, operador, consola, sesion, finalidad, accion, resultado y autorizacion;
- bloquea descarga por politica;
- aplica politicas de retencion;
- simula hold, programacion de eliminacion y eliminacion documentada;
- crea `DigitalAcquisitionRecord` voluntario;
- rechaza adquisicion autorizada conceptual sin autoridad o alcance;
- completa adquisicion autorizada conceptual con hash coincidente;
- crea `Demonstration evidence transfer chain`;
- bloquea entrega ciudadana automatica de `RESTRICTED_JUDICIAL`;
- crea copia ciudadana depurada para material habilitable;
- verifica que la bitacora no registre contenido de evidencia;
- verifica que la demo no guarde claves en almacenamiento persistente del navegador.

## Visual

Probar en navegador:

- escritorio: sin overflow horizontal;
- movil: paneles apilados y navegacion utilizable;
- foco visible en botones, inputs, selects y textareas;
- mensajes de bloqueo comprensibles;
- vista de impresion disponible;
- selector multiperspectiva visible sin overflow;
- `Citizen Closure` legible en pantalla movil.
- `Security Status`, `Evidence Vault`, `Access Requests`, `Acquisition Records` y `Transfer History` legibles en escritorio y movil.

## Release candidate - Etapa 6A

- La carga inicial queda en `SIMULATED_DEMO` y no consulta un endpoint experimental inexistente.
- El backend solo se consulta cuando se selecciona `OPENAI_SECURE_BACKEND` de manera explicita.
- La perspectiva ciudadana no expone paneles, enlaces ni acciones internas.
- La consola maestra recupera sus paneles internos al cambiar de perspectiva.
- Las areas de comentario ciudadano y observacion formal tienen etiqueta accesible.
- Los mensajes de perspectiva, asistente, acta, boveda y bitacora usan regiones de estado anunciables.
- El release candidate conserva sin cambios los tres archivos protegidos de v36.

## Citizen activation and localization - Etapa 6C.0

- La primera pantalla identifica a PIPO como aplicacion proyectada de activacion inmediata.
- El telefono ficticio muestra un punto PIPO, indicacion de simulacion y acceso disponible.
- El punto abre por puntero, foco de teclado y se cierra con Escape.
- Las nueve condiciones de emergencia se pueden seleccionar.
- Ubicacion, audio, video, descripcion e informacion ficticia de dispositivo se activan o retiran de forma
  independiente y no hay ninguna seleccion inicial automatica.
- Iniciar alerta crea solo una sesion en memoria y permite detener audio, video y ubicacion simulados.
- La recepcion institucional presenta alerta, permisos, prioridad, operador, consolas, hora e incidente ficticio.
- La bitacora agrega eventos con referencia previa; no ofrece borrado ni reescritura.
- El codigo no contiene APIs de sensores reales, `getUserMedia`, geolocalizacion real o persistencia de incidentes.
- `es-AR` y `en-US` actualizan los controles principales sin recargar y actualizan `document.documentElement.lang`.
- La region Argentina - Buenos Aires y la demostracion internacional cambian etiquetas sin afirmar integracion real.
- Escritorio y movil no presentan overflow horizontal, los controles conservan foco visible y los movimientos respetan
  `prefers-reduced-motion`.
- Los textos ingleses de navegacion tecnica se traducen al elegir `es-AR`; los terminos internos pueden quedar solo
  dentro de la seccion tecnica secundaria.
