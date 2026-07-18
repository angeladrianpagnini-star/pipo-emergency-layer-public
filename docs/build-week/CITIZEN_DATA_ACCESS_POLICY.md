# Citizen Data Access Policy

Esta politica describe como la demo Build Week entrega informacion al ciudadano sin exponer el expediente
interno completo.

## Separacion de capas

### Capa ciudadana

Incluye boton PIPO, alerta, condicion de emergencia, ubicacion declarada o estimada, evidencia seleccionada
y devolucion ciudadana.

### Capa institucional

Incluye Centro de Monitoreo, operador, derivacion, funcionario receptor, organismos intervinientes, actas
individuales, expediente maestro y cierre.

### Capa de gobernanza digital

Incluye identidad, MFA, roles, auditoria, cifrado proyectado, referencia de integridad, cadena de custodia,
proteccion de datos, interoperabilidad y reglas de retencion.

## Informacion entregable

Puede entregarse automaticamente:

- ID de incidente;
- estado general;
- organismos participantes;
- resumen ciudadano revisado;
- canal de seguimiento;
- referencia de integridad.

Puede entregarse a pedido:

- documentos habilitados;
- constancias simuladas;
- referencias de denuncia o acta;
- JSON depurado;
- vista de impresion o PDF por navegador.

## Informacion restringida

No se entrega en la vista ciudadana:

- identidades protegidas;
- datos de menores;
- datos biometricos;
- imagen o voz de terceros;
- ubicacion precisa no necesaria;
- notas internas;
- comunicaciones internas;
- tacticas operativas;
- evidencia de terceros;
- informacion `RESTRICTED_JUDICIAL`;
- datos que puedan afectar medidas posteriores;
- registros que requieran autoridad competente.

Cada exclusion debe mostrarse con motivo generico, sin revelar el contenido excluido.

## Reglas legales y operativas proyectadas

Una implementacion real deberia definir:

- consentimiento;
- tratamiento de datos sensibles;
- tratamiento de imagen y voz;
- tratamiento de ubicacion en tiempo real;
- resguardo de menores;
- cadena de custodia digital;
- acceso por funcionario autorizado;
- prohibicion de vigilancia permanente;
- auditoria posterior;
- politica de conservacion proporcional;
- responsable de cierre;
- responsable por mal uso;
- habilitacion de integraciones externas.

## Gobernanza independiente

PIPO requiere autoridad de gobernanza clara:

- quien administra la herramienta;
- quien accede a cada dato;
- quien audita accesos;
- quien conserva evidencia;
- quien deriva;
- quien cierra el caso;
- quien responde por mal uso;
- quien autoriza o revoca integraciones.

## Demo publica

La ruta Build Week:

- usa datos ficticios;
- no usa datos personales reales;
- no activa camara, microfono ni ubicacion real;
- no persiste informacion sensible en almacenamiento del navegador;
- no se conecta con sistemas oficiales;
- no publica sobre v36;
- no afirma firma digital certificada ni valor judicial automatico.
