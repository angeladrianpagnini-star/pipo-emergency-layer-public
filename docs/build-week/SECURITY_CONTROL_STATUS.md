# Security Control Status - Etapa 5.2

Este documento clasifica los controles de PIPO Build Week segun su estado real dentro de la demo.

## Matriz de controles

| Control | Implementado | Simulado | Produccion | Limitacion |
| --- | --- | --- | --- | --- |
| Deteccion de transporte | Si | No | Parcial | La demo distingue HTTP local, HTTPS y transporte no verificado; no instala certificados reales. |
| Cifrado local de evidencia ficticia | Si | Si | No | Web Crypto cifra contenido ficticio en memoria. No es un sistema productivo de gestion de claves. |
| Hash SHA-256 de integridad | Si | Si | Parcial | Verifica contenido ficticio y detecta alteracion; la validacion oficial requiere herramientas y protocolo. |
| Boveda de evidencia | Parcial | Si | No | Guarda solo metadatos y contenido ficticio. No almacena archivos sensibles reales. |
| Permisos por finalidad | Si | Si | Parcial | `canAccessResource()` evalua rol, consola, incidente, finalidad, sesion, MFA, supervision y vencimiento. |
| Acceso judicial restringido | Si | Si | Parcial | Requiere autorizacion activa, operador autorizado, segunda aprobacion simulada y auditoria; no reemplaza validacion legal real. |
| Permisos temporales | Si | Si | Parcial | Permite otorgar, vencer y revocar permisos en la demo; no usa infraestructura productiva. |
| Registro de vistas y descargas | Si | Si | Parcial | Cada accion queda en historial y bitacora; no existe almacenamiento externo inmutable. |
| Descarga bloqueada por politica | Si | Si | Parcial | La demo bloquea descarga salvo liberacion especifica; no genera documentos oficiales. |
| Retencion y eliminacion | Si | Si | No | La eliminacion es simulada. No se borran archivos reales porque no se almacenan archivos sensibles. |
| DigitalAcquisitionRecord | Si | Si | No | Registra entrega voluntaria, preservacion guiada y adquisicion autorizada conceptual; no ejecuta acceso real a dispositivos. |
| Transfer History | Si | Si | No | Es una cadena de transferencia demostrativa, no cadena de custodia oficial. |
| Copia ciudadana depurada | Si | Si | Parcial | Excluye metadatos internos e identidades protegidas; una entrega real requiere revision institucional. |
| Identidad, MFA y biometria local | Parcial | Si | Parcial | Se representan como booleanos ficticios. No hay autenticador productivo ni dato biometrico real. |
| Envelope encryption, KMS/HSM, rotacion | No | No | Diseno | Documentado como arquitectura proyectada; fuera de alcance de la demo. |
| HTTPS/TLS, WSS, cabeceras seguras, origen restringido | No | No | Diseno | Requisito productivo documentado; la demo local puede correr por HTTP con aviso visible. |

## Evidencia de prueba

- `evidence-vault.test.js` verifica cifrado/descifrado ficticio con Web Crypto.
- La prueba confirma IV unico entre cifrados sucesivos.
- La prueba confirma integridad correcta y deteccion de modificacion.
- La prueba confirma acceso permitido, denegado, vencido y revocado.
- La prueba confirma segunda aprobacion simulada para `RESTRICTED_JUDICIAL`.
- La prueba confirma descarga bloqueada por politica.
- La prueba confirma historial de vista.
- La prueba confirma retencion, hold, eliminacion simulada y certificado de demo.
- La prueba confirma `DigitalAcquisitionRecord`.
- La prueba confirma copia ciudadana depurada y bloqueo de entrega automatica restringida.
- La prueba confirma que la bitacora no guarda contenido ficticio de evidencia.

## Criterio de lectura institucional

La frase correcta para presentacion institucional es:

> Arquitectura proyectada con cifrado, control de acceso, hash de evidencia y auditoria.

Evitar afirmar que el prototipo publico ya posee proteccion productiva completa.
