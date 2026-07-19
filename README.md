# PIPO Emergency Layer Public

## Capa visual de alerta ciudadana y respuesta territorial

PIPO Emergency Layer Public es una version publica y segura de una propuesta conceptual para mejorar la comunicacion de emergencias, la derivacion institucional y la trazabilidad operativa.

La idea principal es simple: una persona debe poder activar una alerta desde una capa visual propia del dispositivo, sin depender de la aplicacion que tenga abierta ni de que servicios de terceros modifiquen sus productos.

## Que muestra esta version publica

- una capa visual de emergencia disponible sobre la pantalla activa del dispositivo;
- alta segura con identidad, MFA y dispositivo enrolado;
- seleccion simple de tipo de incidente;
- derivacion hacia organismos competentes;
- consola basica de recepcion;
- estado del incidente;
- registro operativo general;
- cierre obligatorio de cada alerta;
- enfoque de seguridad, privacidad y minimo dato necesario.
- un recorrido guiado de ocho etapas con recepcion maestra, derivacion paralela, recursos ficticios, actuaciones
  individuales y devolucion ciudadana depurada.

## Alcance publico

Esta version no implementa integraciones reales, no captura datos personales, no accede a sensores del dispositivo y no opera sobre aplicaciones de terceros.

Es una demo explicativa para presentar el concepto de forma responsable.

## Principios

- No reemplaza canales oficiales de emergencia.
- No interviene aplicaciones privadas.
- No recolecta datos reales.
- No habilita vigilancia.
- Toda implementacion real requiere marco legal, autorizaciones, auditoria, seguridad y acuerdos institucionales.

## Tres capas del modelo

La propuesta se ordena en tres niveles:

- Capa ciudadana: boton PIPO, alerta, ubicacion, evidencia disponible y condicion de emergencia.
- Capa institucional: centro de monitoreo, operador, derivacion, funcionario receptor, organismos intervinientes y cierre del caso.
- Capa de gobernanza digital: identidad, MFA, roles, auditoria, cifrado proyectado, hash de evidencia, cadena de custodia, proteccion de datos e interoperabilidad.

## Marco legal y gobernanza

Una implementacion real debe definir consentimiento, tratamiento de datos sensibles, biometria, imagen y voz, ubicacion en tiempo real, resguardo de menores, cadena de custodia digital, acceso por funcionario autorizado, prohibicion de vigilancia permanente y auditoria posterior.

Tambien debe existir una autoridad de gobernanza que determine quien administra, quien accede, quien audita, quien conserva evidencia, quien deriva, quien cierra el caso, quien responde por mal uso y quien habilita integraciones externas.

## Estructura

- `prototype/`: demo visual publica y segura.
- `SECURITY.md`: principios de seguridad y privacidad.
- `PUBLIC_SCOPE.md`: diferencias entre la version publica y la version privada de trabajo.

## Uso local

Desde `prototype/`:

```powershell
node server.js
```

Abrir:

```text
http://127.0.0.1:4181
```

## Demo web publica

La demo publicable se sirve desde `docs/` mediante GitHub Pages.

---

# OpenAI Build Week 2026

## PIPO Emergency Layer

PIPO Emergency Layer is a conceptual civic-technology prototype for improving emergency communication, operational coordination, and traceable documentation. Its public Build Week demonstration models a citizen alert, human-validated multi-agency routing, independent field actions, and a citizen-centered closure package.

**Public Build Week demo:**
https://angeladrianpagnini-star.github.io/pipo-emergency-layer-public/build-week/

**Public v36 visual prototype:**
https://angeladrianpagnini-star.github.io/pipo-emergency-layer-public/?v=36

The Build Week route is independent at `docs/build-week/`; it does not replace or modify the public v36 demo.

## Recommended judge walkthrough

1. Open the public Build Week demo. No login or API key is required.
2. Select `English — International` or `Spanish — Argentina - Buenos Aires`.
3. In the citizen screen, open the PIPO point, choose the road-incident condition, enable simulated permissions, and start the simulated alert.
4. Select **Explore institutional coordination**, then start the eight-step guided journey.
5. Validate the alert, adjust priority, and route it to 911, 107 Health, Traffic, and Fire.
6. Confirm the four suggested resources. Suggestions are based on simulated proximity, specialty, availability, and jurisdiction; assignment always requires a human confirmation.
7. Review field status, four independent acts, the master-documentation flow, institutional closure, and the citizen package.
8. In Spanish, open the advanced modules for the simulated AI, Evidence Vault, audit, and documentation views. Those modules are intentionally unavailable in English until they have a complete English localization.

## What existed before Build Week

- v36 visual prototype;
- a basic simulated citizen alert;
- an initial console and field view;
- the original conceptual architecture for PIPO.

## What was built during Build Week

- an independent Build Week route with federated consoles;
- append-only simulated ledger and human-in-the-loop AI Incident Assistant;
- optional, server-side experimental backend bridge with simulated mode as the public default;
- multi-operator field workflow, independent acts, Digital Procedure Act, and master incident record;
- citizen closure, Evidence Vault, simulated local cryptographic controls, and authorized-acquisition records;
- citizen activation flow, es-AR/en-US localization, and an eight-step guided operational journey;
- final audit, localization polish, security scans, tests, and release stabilization.

Build Week work extends the prior prototype; it does not claim that all of PIPO was created during Build Week. See `docs/build-week/PRE_EXISTING_WORK.md` and `docs/build-week/BUILD_WEEK_FINAL_REPORT.md` for detail.

## Safety and limitations

- The public demo uses fictitious data and simulated locations, audio, video, permissions, resources, and records.
- It has no real sensors, tracking, emergency-service connection, official dispatch, database, authentication, or external map.
- It does not send incident data and does not require a provider credential to test the public demo.
- The experimental OpenAI backend bridge is not active in the public GitHub Pages demo.
- AI output is advisory only. Resource assignment, closure, and any operational decision require human validation.
- This is not an emergency service and does not replace official emergency channels.

## How we used Codex and GPT-5.6 Terra

Codex was used to inspect the repository, preserve v36, implement and test staged Build Week modules, review diffs, run security scans, prepare commits and pull requests, and validate the demonstration.

The final Build Week audit task was launched in Codex with 5.6 Terra selected in the user interface. The in-task assistant exposed only the generic GPT-5 family label and could not independently verify the deployment identifier.

Accordingly, 5.6 Terra is attributed to the final audit and stabilization phase, including feature freeze, reproducible-defect review, accessibility and localization review, testing, and presentation polish. This does not assert that all PIPO work was developed with that deployment.

## Built with

HTML5, CSS3, JavaScript, Node.js, Web Crypto API, GitHub, GitHub Pages, OpenAI Codex, OpenAI Responses API, Structured Outputs, responsive web design, accessibility practices, human-in-the-loop AI, civic tech, cybersecurity, and Markdown.

The project is prepared for the **Work and Productivity** track: its core value is improved coordination, information flow, documentation, and accountability across operational teams and institutions, with citizen activation and closure as the entry and return points.
