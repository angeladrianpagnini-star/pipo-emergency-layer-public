# Citizen Closure Workflow

Etapa 5.1 agrega una devolucion ciudadana trazable para que la persona pueda entender que ocurrio, que
organismos participaron, que documentos puede solicitar y que pasos siguen.

## Principios

- El resumen ciudadano no es copia del expediente maestro.
- La entrega usa lenguaje claro.
- La informacion se minimiza.
- Cada exclusion tiene motivo generico.
- La opinion de servicio queda separada del expediente.
- La observacion formal tiene circuito propio.
- Toda entrega genera recibo.
- Toda alerta requiere cierre o continuidad documentada.

## Flujo

1. La consola maestra confirma que el incidente tiene cierre o continuidad documentada.
2. Se genera `CitizenClosureSummary`.
3. Se construye `buildCitizenSafeView(masterRecord, accessContext)`.
4. La institucion revisa el resumen.
5. Se prepara `CitizenIncidentPackage`.
6. Se entrega el paquete por canal simulado.
7. Se registra `CitizenDeliveryReceipt`.
8. El ciudadano puede abrir la entrega y confirmar recepcion.
9. El ciudadano puede solicitar documentos habilitados.
10. El ciudadano puede enviar opinion de servicio.
11. El ciudadano puede crear observacion formal.
12. La observacion se asigna, revisa, aclara, responde o cierra sin alterar registros previos.

## Resumen ciudadano

Debe incluir:

- ID de incidente;
- fecha y hora inicial;
- fecha de cierre o continuidad;
- descripcion inicial depurada;
- estado final;
- organismos participantes;
- acciones relevantes;
- derivaciones;
- referencias simuladas de acta, denuncia o constancia;
- documentos habilitados;
- medidas pendientes;
- organismo responsable;
- proximos pasos;
- recomendaciones de cuidado;
- canales de consulta;
- referencia de integridad;
- fecha de generacion.

## Proximos pasos

Categorias normalizadas:

- `NO_FURTHER_ACTION`;
- `FOLLOW_UP_REQUIRED`;
- `MEDICAL_FOLLOW_UP`;
- `JUDICIAL_FOLLOW_UP`;
- `POLICE_REPORT_EXTENSION`;
- `DIGITAL_EVIDENCE_PRESERVATION`;
- `SOCIAL_ASSISTANCE`;
- `CHILD_PROTECTION_FOLLOW_UP`;
- `INSURANCE_NOTIFICATION`;
- `DEVICE_SECURITY_ACTIONS`;
- `SAFETY_PRECAUTIONS`.

Aviso obligatorio:

`Las gestiones posteriores pueden variar segun la autoridad competente y las circunstancias del caso.`

## Paquete ciudadano

`CitizenIncidentPackage` contiene:

- resumen;
- proximos pasos;
- documentos habilitados;
- referencias simuladas;
- canal de seguimiento;
- referencia de integridad;
- fecha de entrega;
- recibo;
- vista de impresion;
- PDF por navegador;
- JSON depurado.

## Opinion de servicio

La opinion registra calificaciones 1 a 5 sobre:

- rapidez;
- claridad;
- trato;
- coordinacion;
- sensacion de proteccion;
- comprension de proximos pasos;
- satisfaccion general.

Puede incluir comentario opcional. No modifica actas, expediente, sanciones ni cierre.

## Observacion formal

La observacion formal registra:

- `observationId`;
- `incidentId`;
- categoria;
- descripcion;
- actas referenciadas;
- eventos referenciados;
- adjuntos simulados;
- fecha;
- estado;
- consola asignada;
- respuesta;
- fecha de resolucion.

Estados:

- `SUBMITTED`;
- `RECEIVED`;
- `UNDER_REVIEW`;
- `CLARIFICATION_REQUESTED`;
- `RESPONDED`;
- `CLOSED`.

Puede originar aclaracion, ampliacion, rectificacion o revision administrativa simulada, pero no altera
por si misma los registros existentes.
