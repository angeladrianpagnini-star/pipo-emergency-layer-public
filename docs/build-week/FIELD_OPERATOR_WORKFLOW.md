# Field Operator Mobile Workflow

## Objetivo

La Etapa 4B representa el trabajo de campo dentro de PIPO Emergency Layer sin absorber la autonomia
documental de cada organismo.

Principio:

> Cada intervencion conserva autoria, responsabilidad y trazabilidad propias.

## Escenario demo

Incidente multidisciplinario:

`Accidente vial con persona lesionada, derrame y posible riesgo de incendio.`

Operadores incluidos:

- movil policial;
- operador 107;
- agente de Transito;
- Bomberos;
- Policia Cientifica;
- especialista en Ciberdelitos.

## Identidad del operador

Cada operador ficticio conserva:

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

La interfaz muestra MFA y biometria local como confirmaciones simuladas. No se almacenan datos biometricos.

## Estados

Estados disponibles:

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

Reglas:

- no hay arribo antes de aceptacion;
- no hay intervencion antes del arribo;
- no hay finalizacion sin acontecimientos propios;
- no hay rechazo o cancelacion sin fundamento.

## Acontecimientos individuales

Categorias:

- hecho observado;
- manifestacion de tercero;
- dato del sistema;
- actuacion realizada;
- comunicacion;
- derivacion;
- evidencia;
- inferencia pendiente de revision;
- novedad;
- aclaracion.

Cada acontecimiento es inalterable y queda enlazado por referencia de integridad de demostracion.

## Evidencia simulada

Tipos:

- fotografia;
- video;
- audio;
- ubicacion;
- documento;
- captura digital;
- constancia;
- informe externo.

No hay captura de sensores reales, ubicacion real ni datos personales reales.

## Solicitudes de apoyo

Desde campo se puede solicitar apoyo a:

- 911;
- 107;
- Bomberos;
- Defensa Civil;
- Transito;
- Genero;
- Ninez;
- Fiscalia;
- Ciberdelitos;
- Comisaria;
- CVGRT.

La consola destinataria acepta con su propio operador y genera evento independiente.

## Acta individual

Cada operador puede:

- crear borrador;
- revisar;
- finalizar;
- ampliar mediante version nueva;
- recibir o responder aclaraciones.

El acta finalizada queda bloqueada. Nadie firma por otro operador y la consola maestra no reescribe.

Texto visible:

`Documento individual del funcionario interviniente. No sustituye las actas de otros operadores.`

## IA opcional

La IA puede ayudar a ordenar datos o detectar faltantes, pero no inventa acontecimientos, no transforma
manifestaciones en hechos, no crea evidencia, no finaliza actas y no sustituye al operador.
