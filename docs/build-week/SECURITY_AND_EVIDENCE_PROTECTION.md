# Security And Evidence Protection - Etapa 5.2

PIPO Build Week 5.2 separa tres capas:

1. Capa ciudadana: boton PIPO, alerta, ubicacion declarada o estimada, evidencia seleccionada y condicion de emergencia.
2. Capa institucional: Centro de Monitoreo, operador, derivacion, funcionario receptor y organismos intervinientes.
3. Capa de gobernanza digital: identidad, MFA, roles, auditoria, cifrado proyectado, hash, cadena de transferencia demostrativa, proteccion de datos e interoperabilidad.

## Marco legal y de gobernanza

Toda capacidad sensible requiere:

- consentimiento cuando corresponda;
- finalidad declarada;
- tratamiento proporcional de datos sensibles;
- reglas especiales para imagen, voz, ubicacion y datos biometricos;
- resguardo reforzado de menores y victimas;
- acceso por funcionario autorizado;
- prohibicion de vigilancia permanente;
- auditoria posterior;
- retencion documentada;
- cierre obligatorio del incidente.

La demo no habilita camara, microfono, ubicacion real, cuentas, sensores ni acceso remoto a dispositivos.

## Gobernanza independiente

Una version productiva necesita autoridad de gobernanza para definir:

- quien administra;
- quien accede;
- quien audita;
- quien conserva evidencia;
- quien deriva;
- quien cierra el caso;
- quien responde por mal uso;
- quien habilita integraciones externas.

Sin esa gobernanza, PIPO seria tecnologia sin capacidad institucional suficiente.

## Comunicaciones seguras

Requisitos productivos:

- HTTPS/TLS obligatorio;
- WSS para canales en tiempo real;
- certificados validos;
- proteccion contra downgrade;
- cabeceras seguras;
- restriccion de origen;
- autenticacion de servicio;
- vencimiento de sesiones;
- reintentos seguros;
- revocacion de accesos.

La demo detecta:

- `LOCAL_DEVELOPMENT`: HTTP local o archivo local para pruebas.
- `HTTPS_PROTECTED`: pagina servida por HTTPS.
- `TRANSPORT_NOT_VERIFIED`: transporte no validado.

Cuando corre localmente por HTTP se muestra:

> Local development transport

## Proteccion criptografica

La demo usa Web Crypto para contenido ficticio:

- genera una clave de datos en memoria;
- cifra con AES-GCM;
- usa IV unico;
- calcula SHA-256 del contenido ficticio original;
- calcula SHA-256 de la representacion cifrada;
- descifra solo despues de evaluar autorizacion;
- verifica integridad despues de descifrar;
- permite revocacion logica.

Aviso obligatorio:

> Local cryptographic demonstration - not a production key-management system.

Arquitectura productiva proyectada:

- envelope encryption;
- clave de datos por archivo o incidente;
- clave maestra del lado servidor;
- KMS/HSM;
- rotacion;
- revocacion;
- separacion de funciones;
- respaldo seguro;
- destruccion segura;
- acceso temporal trazable.

## Errores y registros

Los errores tecnicos no muestran:

- claves;
- credenciales;
- rutas internas sensibles;
- contenido documental;
- stack traces;
- narrativa completa del incidente.

Los registros tecnicos se limitan a:

- `requestId`;
- `errorCode`;
- `timestamp`;
- `component`;
- `status`.

No se registra contenido de evidencia.
