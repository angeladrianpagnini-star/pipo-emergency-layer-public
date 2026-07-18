# Build Week Changelog

## Etapa 4B - Movil de campo multioperador y actas individuales

- Agrega `field-workflow.js` con estados de intervencion, operadores ficticios, evidencia simulada, apoyo y actas.
- Agrega vista `Field Operator Mobile` en `docs/build-week/index.html`.
- Permite seleccionar operador ficticio de 911, 107, Transito, Bomberos, Policia Cientifica o Ciberdelitos.
- Muestra operador, organismo, funcion, especialidad, consola, dispositivo enrolado, MFA, biometria local, estado e incidente.
- Agrega recorrido de aceptacion, salida, arribo, inicio, actividad y finalizacion.
- Bloquea transiciones invalidas: arribo antes de aceptacion, intervencion antes del arribo y cierre sin acontecimientos.
- Permite acontecimientos propios con categorias operativas.
- Permite evidencia simulada con referencia de integridad, permisos y consolas con acceso.
- Permite solicitud y aceptacion de apoyo interinstitucional.
- Permite crear, revisar, finalizar, ampliar y solicitar aclaracion sobre actas individuales.
- Bloquea edicion de actas ajenas y actas finalizadas.
- Agrega eventos 4B a `ledger.js`.
- Agrega `field-workflow.test.js`.
- Agrega `FIELD_OPERATOR_WORKFLOW.md`.
- Agrega `GUARDIAN_DIGITAL_DEPLOYMENT_PLAN.md` como hoja de ruta futura, sin despliegue.
- Mantiene intactos `docs/index.html`, `docs/styles.css`, `docs/app.js` y la version publica v36.

## Etapa 4A - Backend seguro experimental

- Agrega `server/` con endpoint conceptual `POST /api/analyze-incident`.
- Agrega `GET /api/backend-status` para exponer estado no sensible del backend.
- Configura el modelo del lado servidor mediante `PIPO_OPENAI_MODEL`, con valor inicial `gpt-5.6`.
- Usa credencial del proveedor solo del lado servidor mediante `PIPO_OPENAI_CREDENTIAL`.
- Mantiene `SIMULATED_DEMO` como fallback operativo completo.
- Agrega selector de modo en el `PIPO AI Incident Assistant`.
- Muestra modo activo, estado de backend, `requestId` y version de analisis.
- Agrega reintento, cambio a demo simulada y continuidad sin IA.
- Valida entrada, rechaza texto vacio, limita caracteres y normaliza prioridad/confianza.
- Filtra consolas no configuradas y fuerza `requiresHumanValidation: true`.
- Registra auditoria server-side solo con metadatos tecnicos.
- Agrega pruebas de contrato, errores, timeout, respuesta incompleta, consola inexistente y escenarios sensibles.
- Mantiene intactos `docs/index.html`, `docs/styles.css`, `docs/app.js` y la version publica v36.

## Etapa 3 - PIPO AI Incident Assistant

- Agrega `incident-scenarios.js` con escenarios ficticios completos.
- Agrega `ai-service.js` con modo `SIMULATED_DEMO` deterministico.
- Deja documentado el contrato futuro `OPENAI_SECURE_BACKEND` sin endpoint ni claves en frontend.
- Agrega `incident-assistant.js` para validacion humana, comparacion IA/humano y diferencias materiales.
- Extiende `AISuggestion` y `HumanDecision`.
- Extiende `ledger.js` con eventos de analisis, revision, decision y preguntas de seguimiento.
- Integra una seccion responsive en `index.html`.
- Mantiene intactos `docs/index.html`, `docs/styles.css`, `docs/app.js` y la version publica v36.

## Etapa 2 - Bitacora append-only

- Agrega eventos operativos con referencia previa e integridad de demostracion.
- Bloquea borrado silencioso y conserva rectificaciones como eventos nuevos.

## Etapa 1.1 - Federacion operativa

- Agrega consolas, operadores, actas individuales, expediente maestro, grants, autorizaciones y flujos de ciberdelitos.

## Etapa 0 - Preservacion

- Crea ruta separada `docs/build-week/` para evolucionar sin alterar v36.
