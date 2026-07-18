# Trabajo preexistente y alcance Build Week

## Antes de Build Week

La version publica PIPO v36 ya existia antes de esta linea de trabajo. Su punto de preservacion es el tag
local `pre-build-week-v36`, asociado al commit `5a396404d8415a138aa08414b42a502be5b97780`
(`Add governance and legal framing`, 2026-06-06).

El trabajo preexistente incluye:

- flujo visual inicial de PIPO Emergency Layer;
- alerta simulada;
- consola operativa basica;
- movil de campo basico;
- arquitectura conceptual de emergencia y respuesta territorial;
- documentacion inicial de privacidad, gobernanza y limites;
- publicacion v36 en la ruta `docs/`.

La version v36 no fue construida como parte de Build Week y permanece separada de esta entrega. Sus archivos
protegidos son `docs/index.html`, `docs/styles.css` y `docs/app.js`.

## Construido durante Build Week

Build Week se desarrollo exclusivamente sobre la rama `build-week-2026` y la ruta aislada
`docs/build-week/`. Los commits de esta fase son:

- `7ab7042` - modelo de datos inicial;
- `2bb3d08` - incidentes federados y multiples organismos;
- `4c561ff` - bitacora append-only y consola multibase;
- `7ba36a6` - AI Incident Assistant con validacion humana;
- `858fa1a` - backend experimental con fallback simulado;
- `26914bf` - flujo multioperador y actas individuales;
- `bce458d` - Acta Digital, expediente maestro y cierre trazable;
- `f11d325` - simulacion multiperspectiva y cierre ciudadano;
- `4429ed6` - Evidence Vault, demostracion criptografica y Digital Acquisition Record.

Durante Build Week se incorporaron:

- arquitectura federada con multiples consolas;
- bitacora append-only;
- AI Incident Assistant de uso asesor y validacion humana obligatoria;
- backend experimental separado del frontend y fallback `SIMULATED_DEMO`;
- flujo de campo multioperador y actas individuales con autoria propia;
- Acta Digital de Procedimiento, completitud, consistencia, versiones y expediente maestro;
- cierre trazable y vista ciudadana depurada;
- Evidence Vault de contenido ficticio, hash, cifrado local de demostracion, permisos y retencion simulada;
- Digital Acquisition Record conceptual;
- documentacion, pruebas y auditoria de release candidate.

## Principio de separacion

La entrega Build Week extiende un prototipo conceptual existente. No reemplaza, modifica ni vuelve a publicar
la version publica v36. La evidencia de cada etapa queda asociada a sus commits y a la documentacion de
`docs/build-week/`.
