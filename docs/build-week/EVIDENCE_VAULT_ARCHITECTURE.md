# Evidence Vault Architecture - Etapa 5.2

`PIPO Evidence Vault` es una boveda de demostracion para evidencia ficticia. Su objetivo es mostrar como deberian articularse cifrado, hash, permisos, retencion, auditoria y entrega ciudadana depurada.

## Modelo EvidenceVaultItem

Campos principales:

- `evidenceId`;
- `incidentId`;
- `ownerConsoleId`;
- `createdByOperatorId`;
- `type`;
- `fileName`;
- `simulatedSize`;
- `classification`;
- `createdAt`;
- `integrityHash`;
- `encryptionStatus`;
- `accessPolicy`;
- `retentionPolicy`;
- `expirationDate`;
- `authorizedConsoles`;
- `authorizedOperators`;
- `accessHistory`;
- `sharingHistory`;
- `downloadPolicy`;
- `status`.

Estados:

- `ACTIVE`;
- `RESTRICTED`;
- `SHARED_TEMPORARILY`;
- `ACCESS_REVOKED`;
- `RETENTION_HOLD`;
- `EXPIRED`;
- `DELETION_SCHEDULED`;
- `DELETED_SIMULATED`.

## Integridad

El hash cumple funcion de integridad, no de confidencialidad.

Estados:

- `INTEGRITY_VERIFIED`;
- `INTEGRITY_MISMATCH`;
- `NOT_VERIFIED`.

La demo calcula:

- hash del contenido ficticio original;
- hash de la representacion cifrada;
- verificacion posterior al descifrado autorizado.

## Acceso

`canAccessResource()` evalua:

- operador;
- consola;
- incidente;
- rol;
- especialidad;
- clasificacion;
- finalidad;
- autorizacion;
- vencimiento;
- supervision;
- MFA;
- sesion vigente.

Finalidades autorizadas:

- `OPERATIONAL_RESPONSE`;
- `MEDICAL_ASSISTANCE`;
- `JUDICIAL_REVIEW`;
- `CYBERCRIME_ANALYSIS`;
- `FIELD_DOCUMENTATION`;
- `SUPERVISORY_REVIEW`;
- `CITIZEN_DELIVERY`;
- `QUALITY_AUDIT`.

La respuesta incluye:

- `allowed`;
- `reason`;
- `limitations`;
- `expiresAt`;
- `requiresSecondApproval`;
- `visibleFields`;
- `downloadable`;
- `watermarkedViewRequired`.

Para `RESTRICTED_JUDICIAL` exige autorizacion activa compatible, operador autorizado, MFA, sesion vigente, segunda aprobacion simulada y auditoria.

## Permisos temporales

`EvidenceSharingGrant` permite:

- inicio;
- vencimiento;
- finalidad;
- consola destino;
- campos visibles;
- visualizacion permitida o bloqueada;
- descarga permitida o bloqueada;
- revocacion;
- motivo de revocacion.

Al vencer un permiso se bloquea el acceso futuro, se genera evento y se conserva historial. No se borra la evidencia.

## Retencion

Politicas simuladas:

- `SHORT_OPERATIONAL`;
- `STANDARD_INCIDENT`;
- `MEDICAL_SENSITIVE`;
- `CYBERCRIME_PRESERVATION`;
- `JUDICIAL_HOLD`;
- `CITIZEN_COPY`;
- `TRAINING_DEMO`.

Cada politica define:

- `retentionDays`;
- `deletionRule`;
- `holdAllowed`;
- `legalReviewRequired`;
- `citizenAccessRule`;
- `auditRequired`.

Mensaje de eliminacion:

> Deletion simulated - no real sensitive files are stored.

## Registro de acceso

Cada vista registra:

- `evidenceId`;
- `operatorId`;
- `consoleId`;
- `sessionId`;
- `purpose`;
- `timestamp`;
- `action`;
- `result`;
- `authorizationId`;
- `deviceId`;
- `reason`.

La vista ciudadana no expone identidades internas protegidas.
