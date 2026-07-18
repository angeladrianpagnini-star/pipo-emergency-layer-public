# Multi-Perspective Demo

Etapa 5.1 agrega una lectura por rol sobre el mismo incidente simulado. El objetivo es demostrar que PIPO
puede conservar un hilo documental unico sin mostrar la misma informacion a todos.

## Perspectivas

### CITIZEN

Disponible para la persona alertante o solicitante.

Puede ver:

- ID de incidente;
- estado general;
- organismos participantes;
- derivaciones visibles;
- resumen ciudadano;
- documentos habilitados;
- proximos pasos;
- canal de seguimiento;
- recibo de entrega;
- opinion de servicio;
- observacion formal.

No puede ver:

- identidades protegidas;
- notas internas;
- operaciones reservadas;
- evidencia de terceros;
- comunicaciones internas;
- informacion que afecte medidas posteriores;
- informacion `RESTRICTED_JUDICIAL`.

### FIELD_OPERATOR

Reutiliza `field-workflow.js`.

Puede ver:

- asignacion propia;
- minimo necesario del incidente;
- canal operativo multired;
- acontecimientos propios;
- evidencia simulada propia;
- acta individual propia;
- apoyo requerido o aceptado.

No puede:

- firmar por otro operador;
- editar actas ajenas;
- borrar eventos;
- cerrar el expediente maestro.

### FEDERATED_CONSOLE

Representa 911, 107, Transito, Bomberos, Comisaria, Fiscalia, Ninez, Genero, Defensa Civil, CVGRT o
Ciberdelitos.

Puede ver:

- incidentes asignados;
- operadores propios;
- intervenciones propias;
- documentos propios;
- evidencia compartida por finalidad;
- estado de participacion.

Si no hay finalidad o permiso suficiente, la vista devuelve denegacion explicita.

### MASTER_CONSOLE

Representa coordinacion y expediente maestro.

Puede:

- mapear el incidente completo;
- ver participantes;
- ver cronologia referenciada;
- ver actas en solo lectura;
- detectar inconsistencias;
- pedir aclaraciones;
- coordinar cierre;
- generar paquete ciudadano;
- confirmar entrega.

No puede:

- reescribir actas ajenas;
- borrar eventos;
- firmar por operadores;
- alterar evidencia;
- fusionar divergencias como relato unico.

## Estado preservado

El cambio de perspectiva registra `demo.perspective.changed` y conserva:

- `incidentId`;
- estado del incidente;
- cronologia;
- operadores;
- consolas;
- actas;
- evidencia simulada;
- solicitudes de apoyo;
- resumen ciudadano;
- paquete ciudadano;
- recibos;
- opiniones;
- observaciones;
- cierre.

## Escenarios

### A - Accidente multidisciplinario

Incluye ciudadano, movil policial, 107, Transito, Bomberos y consola maestra. El cierre genera resumen,
constancia sanitaria simulada, referencia policial, proximos pasos medicos y opinion de servicio.

### B - Dispositivo sustraido

Incluye ciudadano, Comisaria, Ciberdelitos, Fiscalia y consola maestra. El cierre genera preservacion
digital simulada, pasos de seguridad del dispositivo, estado de denuncia y seguimiento.

## Nota de seguridad

La demo no usa datos reales, no activa sensores, no consulta sistemas oficiales y no persiste informacion
sensible en almacenamiento del navegador.
