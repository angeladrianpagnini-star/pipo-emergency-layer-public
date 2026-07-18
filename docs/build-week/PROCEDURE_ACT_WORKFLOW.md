# Procedure Act Workflow

## Objetivo

La Etapa 5 completa el ciclo documental de PIPO Emergency Layer mediante el Acta Digital de Procedimiento
PIPO.

Principio:

> Las actuaciones individuales se integran, pero nunca se sustituyen ni se reescriben.

## Fuentes

El acta se genera desde:

- bitacora append-only;
- acontecimientos de campo;
- actas individuales;
- evidencia simulada;
- solicitudes de apoyo;
- aclaraciones;
- decisiones humanas;
- borrador asistido por IA, cuando existe.

## Estados

- `DRAFT`;
- `IN_REVIEW`;
- `PENDING_SUPERVISOR`;
- `RETURNED_FOR_CLARIFICATION`;
- `FINALIZED`;
- `AMENDED`;
- `RECTIFIED`;
- `ANNULLED_WITH_REASON`.

Una version finalizada queda bloqueada. Toda ampliacion o rectificacion crea una nueva version y conserva
la referencia al contenido anterior.

## Contenido

El acta contiene:

- identificacion;
- motivo de intervencion;
- circunstancias al arribo;
- informacion recabada clasificada;
- actuaciones;
- evidencia relacionada;
- resultado;
- observaciones finales;
- confirmacion del operador.

## Borrador asistido

La IA solo redacta un borrador neutral y trazable. Debe citar fuentes, marcar datos faltantes y separar
hechos observados de manifestaciones.

Aviso obligatorio:

`Borrador generado con asistencia de IA. Requiere revision y aprobacion del funcionario actuante.`

## Completitud

El indicador calcula `Acta XX % completa` sobre:

- identificacion;
- responsable;
- lugar;
- horarios;
- motivo;
- relato;
- hechos;
- manifestaciones;
- actuaciones;
- evidencia;
- resultado;
- seguimiento;
- confirmacion.

Los campos obligatorios pendientes impiden finalizar.

## Consistencia

El motor clasifica hallazgos como:

- `BLOCKING_ERROR`;
- `WARNING`;
- `RECOMMENDATION`;
- `PENDING_INFORMATION`.

Los bloqueantes impiden finalizar o cerrar.

## Supervision

El supervisor puede consultar, observar, pedir aclaracion, devolver o validar recepcion documental.

No puede modificar el relato, borrar registros, firmar por el operador ni alterar la bitacora.

## Integridad

La demo genera una `Referencia de integridad de la demostracion`. Cuando Web Crypto API esta disponible,
el modulo puede calcular SHA-256; si no, usa fallback deterministico para la demostracion.

No afirma firma digital certificada ni valor judicial automatico.
