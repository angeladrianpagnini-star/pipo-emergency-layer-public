# Digital Acquisition Workflow - Etapa 5.2

`DigitalAcquisitionRecord` documenta, de manera conceptual y simulada, como podria registrarse la incorporacion de evidencia digital a un incidente.

No implementa acceso fisico, desbloqueo, cuentas, camara, microfono, seguimiento real, sensores ni herramientas forenses.

## Tipos de adquisicion

### A. Voluntary User Submission

La persona selecciona o aporta voluntariamente:

- captura;
- documento;
- archivo;
- URL;
- identificador;
- mensaje;
- metadatos disponibles.

El sistema registra origen declarado, fecha, operador receptor, consola y hash de demostracion cuando corresponda.

### B. Guided Preservation

El operador orienta para:

- no modificar el original;
- registrar fecha y origen;
- generar hash;
- preservar copia;
- documentar metodo;
- dejar limitaciones.

No se accede al dispositivo por fuera de lo aportado.

### C. Authorized Forensic Acquisition

Solo conceptual y simulada.

Requiere:

- autoridad;
- autorizacion;
- alcance;
- dispositivo;
- operador especializado;
- herramienta y version;
- fecha y hora;
- fuente;
- metodo;
- datos adquiridos o referenciados;
- hash de origen;
- hash de copia;
- observaciones;
- limitaciones;
- cadena de transferencia demostrativa.

Estados:

- `REQUESTED`;
- `AUTHORIZED`;
- `IN_PROGRESS`;
- `COMPLETED`;
- `REJECTED`;
- `EXPIRED`;
- `CANCELLED_WITH_REASON`.

## Campos

- `acquisitionId`;
- `incidentId`;
- `acquisitionType`;
- `authority`;
- `authorizationId`;
- `operatorId`;
- `consoleId`;
- `specialty`;
- `simulatedDeviceId`;
- `sourceDescription`;
- `scope`;
- `startedAt`;
- `completedAt`;
- `toolName`;
- `toolVersion`;
- `method`;
- `acquiredItemIds`;
- `originalHash`;
- `copyHash`;
- `integrityStatus`;
- `transferHistory`;
- `storageLocationReference`;
- `limitations`;
- `status`;
- `integrityReference`.

## Transferencia

La demo usa el nombre:

> Demonstration evidence transfer chain

Aviso obligatorio:

> Esta funcion demuestra el registro de transferencias. Una cadena de custodia oficial requiere protocolos, herramientas, competencias y validaciones adicionales.

## Copia ciudadana

La copia ciudadana se mantiene separada de la evidencia interna.

Antes de entregar se debe:

- validar clasificacion;
- redactar;
- excluir metadatos internos;
- excluir claves;
- excluir ubicaciones protegidas;
- excluir identidad de operador cuando corresponda;
- registrar version entregada;
- generar hash de copia depurada.

No se entrega automaticamente material `RESTRICTED_JUDICIAL`.
