# Build Week Changelog

## Etapa 6C.1 - Recorrido operativo principal y orquestacion visual del incidente

- Agrega `Recorrido operativo PIPO` como experiencia principal guiada de ocho etapas.
- Presenta el escenario ficticio de accidente vial con una persona lesionada, posible derrame, riesgo de incendio y
  transito afectado.
- Expone tres zonas claras: dispositivo ciudadano, coordinacion institucional y recursos de campo.
- Conecta una Consola Maestra PIPO con 911 Seguridad, 107 Salud, Transito y Bomberos mediante derivacion simultanea
  de demostracion.
- Muestra recursos ficticios, reglas de seleccion explicadas y confirmacion humana simulada por organismo.
- Representa estados paralelos de campo, actas individuales, integracion documental por referencias, cierre y
  devolucion ciudadana depurada.
- Agrega bitacora in-memory enlazada por referencias previas para todos los eventos del recorrido y muestra la cadena
  completa sin borrar ni ocultar los eventos anteriores del mismo recorrido.
- Integra `es-AR` y `en-US` con los selectores existentes de idioma y region, sin recargar ni cambiar conexiones.
- Agrega `operational-journey.js`, `operational-journey.test.js` y `OPERATIONAL_JOURNEY.md`.
- Mantiene intactos `docs/index.html`, `docs/styles.css`, `docs/app.js`, la configuracion de Pages y v36.

## Etapa 6C.0 - Citizen activation, product clarity and localization hotfix

- Reordena la entrada publica de Build Week hacia una portada centrada en PIPO Emergency Layer.
- Agrega un telefono ficticio con punto PIPO, menu accesible de condiciones de emergencia y confirmacion de permisos
  simulados individuales.
- Agrega una sesion visual simulada con video abstracto, onda de audio, mapa, temporizador, controles de detencion y
  tarjeta de recepcion institucional.
- Agrega bitacora in-memory append-only para los eventos de activacion ciudadana de demostracion.
- Agrega `es-AR` y `en-US`, deteccion por `navigator.language`, selector persistente solo para `pipo_demo_locale` y
  selector de region independiente.
- Mueve el contexto de v36, rama, restauracion y modulos previos a secciones tecnicas colapsables.
- Mantiene intactos `docs/index.html`, `docs/styles.css`, `docs/app.js`, la configuracion de Pages y v36.

## Etapa 6A - Final audit, feature freeze and release candidate

- Activa feature freeze: no agrega modulos ni funciones operativas.
- Elimina la consulta automatica al backend experimental durante la carga de la demo estatica.
- Conserva el backend experimental como opcion explicita y mantiene `SIMULATED_DEMO` como modo inicial.
- Corrige el aislamiento de la perspectiva ciudadana: oculta paneles, enlaces y acciones internas.
- Agrega etiquetas explicitas a los textos ciudadanos y regiones de estado `aria-live`.
- Normaliza el rotulo `Continuar sin IA`.
- Agrega `release-candidate.test.js` para ejecutar la suite de etapas, chequeos sintacticos, aislamiento,
  ausencia de secretos, ausencia de almacenamiento persistente y preservacion de v36.
- Crea documentacion de trabajo preexistente, atribucion de auditoria, informe final y checklist RC.
- Mantiene intactos `docs/index.html`, `docs/styles.css`, `docs/app.js` y la version publica v36.

## Etapa 5.2 - Proteccion criptografica, boveda y adquisicion autorizada

- Agrega `evidence-vault.js` con `PIPO Evidence Vault` para evidencia ficticia.
- Agrega deteccion visible de transporte: `LOCAL_DEVELOPMENT`, `HTTPS_PROTECTED` y `TRANSPORT_NOT_VERIFIED`.
- Agrega cifrado local de demostracion con Web Crypto, AES-GCM, IV unico y claves temporales en memoria.
- Agrega hash SHA-256 de contenido ficticio original, hash de representacion cifrada y verificacion de integridad.
- Extiende `canAccessResource()` con finalidad, vencimiento, autorizacion, supervision, campos visibles, descarga y marca de agua.
- Agrega controles `RESTRICTED_JUDICIAL` con autorizacion activa, operador autorizado, MFA, sesion vigente y segunda aprobacion simulada.
- Agrega permisos temporales con inicio, vencimiento, revocacion, campos visibles y descarga bloqueada.
- Agrega historial de acceso con evidencia, operador, consola, sesion, finalidad, accion, resultado y autorizacion.
- Agrega politicas de retencion, hold, eliminacion simulada y certificado de demo.
- Agrega `DigitalAcquisitionRecord` para entrega voluntaria, preservacion guiada y adquisicion autorizada conceptual.
- Agrega `Demonstration evidence transfer chain` y aviso de limitacion frente a cadena de custodia oficial.
- Agrega copia ciudadana depurada y bloqueo de entrega automatica para material `RESTRICTED_JUDICIAL`.
- Agrega secciones UI: Security Status, Evidence Vault, Access Requests, Acquisition Records y Transfer History.
- Agrega `evidence-vault.test.js`.
- Crea `SECURITY_AND_EVIDENCE_PROTECTION.md`, `EVIDENCE_VAULT_ARCHITECTURE.md`, `DIGITAL_ACQUISITION_WORKFLOW.md` y `SECURITY_CONTROL_STATUS.md`.
- Mantiene intactos `docs/index.html`, `docs/styles.css`, `docs/app.js` y la version publica v36.

## Etapa 5.1 - Simulacion multiperspectiva y cierre ciudadano

- Agrega `citizen-closure.js` con selector de perspectiva: `CITIZEN`, `FIELD_OPERATOR`, `FEDERATED_CONSOLE` y `MASTER_CONSOLE`.
- Permite cambiar de perspectiva sin reiniciar el incidente, conservando ID, estado, cronologia, operadores,
  actas, evidencia simulada, solicitudes de apoyo, paquete ciudadano y cierre.
- Agrega encabezado de perspectiva con rol, permisos, informacion disponible y funciones restringidas.
- Agrega `CitizenClosureSummary` con lenguaje claro, revision institucional, documentos habilitados,
  proximos pasos, canales de consulta y referencia de integridad.
- Agrega `buildCitizenSafeView(masterRecord, accessContext)` para separar entrega automatica, entrega a pedido
  e informacion restringida con motivo generico.
- Agrega `CitizenIncidentPackage` con vista de impresion, PDF por navegador y exportacion JSON depurada.
- Agrega `CitizenDeliveryReceipt` con entrega, apertura, confirmacion, metodo, version e integridad.
- Agrega opinion de servicio separada del expediente y observacion formal ciudadana con estados propios.
- Agrega escenarios A/B: accidente multidisciplinario y dispositivo sustraido con preservacion digital simulada.
- Agrega eventos de bitacora para perspectiva, resumen, recibo, documentos, opinion, observacion y seguimiento.
- Agrega modelos de datos ciudadanos a `data-models.js`.
- Agrega `citizen-closure.test.js`.
- Crea `MULTI_PERSPECTIVE_DEMO.md`, `CITIZEN_CLOSURE_WORKFLOW.md` y `CITIZEN_DATA_ACCESS_POLICY.md`.
- Mantiene intactos `docs/index.html`, `docs/styles.css`, `docs/app.js` y la version publica v36.

## Etapa 5 - Acta Digital, expediente maestro y cierre trazable

- Agrega `procedure-act.js` con modelos de Acta Digital de Procedimiento, expediente maestro y cierre.
- Agrega `procedure-act.test.js` con pruebas de acta, cronologia, completitud, consistencia, supervisor, versionado, hash, exportacion y cierre.
- Agrega navegacion interna: Incident Assistant, Master Console, Field Operators, Individual Acts, Procedure Act, Master Incident Record, Audit y Closure.
- Agrega panel `Acta Digital de Procedimiento PIPO`.
- Agrega panel `Expediente y cierre trazable`.
- Genera cronologia automatica desde bitacora append-only, eventos de campo, evidencia, actas individuales y aclaraciones.
- Genera borrador asistido por IA con aviso obligatorio de revision humana.
- Calcula `Acta XX % completa` y muestra campos completos, pendientes, advertencias y errores bloqueantes.
- Bloquea finalizacion cuando faltan confirmacion, supervision o requisitos de cierre.
- Detecta una inconsistencia horaria simulada y conserva su respuesta como anexo.
- Agrega versionado documental `v1`, `v2`, `v3`, `v3.1` y `v3.2`.
- Calcula referencia de integridad de demostracion y mantiene vista de impresion.
- Exporta JSON del acta, expediente, hallazgos, completitud, cronologia y cierre.
- Agrega eventos de bitacora de Etapa 5.
- Crea `PROCEDURE_ACT_WORKFLOW.md`, `MASTER_INCIDENT_RECORD.md`, `DEMO_SCRIPT.md` y `TEST_PLAN.md`.
- Mantiene intactos `docs/index.html`, `docs/styles.css`, `docs/app.js` y la version publica v36.

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
