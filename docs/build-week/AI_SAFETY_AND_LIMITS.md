# AI Safety And Limits

## Aviso obligatorio

`AI-assisted analysis - human validation required.`

En la interfaz tambien se muestra:

`Analisis asistido por IA - requiere validacion humana.`

## Lo que puede hacer

- ordenar informacion;
- resumir en lenguaje neutral;
- detectar datos faltantes;
- formular preguntas de seguimiento;
- senalar riesgos;
- sugerir prioridad;
- sugerir consolas potencialmente competentes;
- explicar fundamento de la sugerencia.

En `OPENAI_SECURE_BACKEND`, estas acciones se realizan mediante un servidor experimental con datos
ficticios y respuesta estructurada. La salida se valida antes de llegar a la interfaz.

## Lo que no puede hacer

- activar una emergencia real;
- despachar recursos;
- iniciar rastreo;
- activar camara, microfono o ubicacion;
- autorizar medidas invasivas;
- ordenar detenciones;
- clasificar culpabilidad;
- sustituir al operador;
- cerrar un incidente;
- finalizar o firmar un acta;
- modificar evidencia;
- ocultar recomendaciones rechazadas.

El backend tampoco puede ejecutar acciones operativas. No tiene funciones para llamar organismos,
activar sensores, consultar cuentas, rastrear dispositivos, abrir camara, abrir microfono, emitir ordenes
ni cerrar reportes.

## Dispositivo robado

Para ubicacion, audio o video institucional simulado se exige:

- denuncia;
- titularidad o relacion legitima;
- autoridad receptora;
- autorizacion competente activa;
- alcance;
- finalidad;
- operadores autorizados;
- fecha de expiracion.

Mensaje visible para ese flujo:

`Location, audio and video capabilities remain disabled until the simulated authorization requirements are met.`

El asistente puede marcar que una capacidad requeriria autorizacion, pero no puede habilitarla. Toda
referencia a rastreo, imagen, voz, cuenta, extraccion o ubicacion real debe volver como advertencia,
informacion faltante y control humano obligatorio.

## Control de afirmaciones

El asistente marca:

- `Unsupported claim`;
- `Contradiction detected`;
- `Human verification required`;
- `Authorization required`.

No convierte manifestaciones del usuario en hechos verificados. No atribuye culpabilidad. No completa datos no informados.

## Decision humana

El operador debe confirmar una decision final. Cuando modifica o rechaza una sugerencia material, debe dejar fundamento.

Diferencias materiales:

- cambio `RED` a `GREEN` o `GREEN` a `RED`;
- eliminacion de una consola critica sugerida;
- incorporacion de capacidad restringida;
- rechazo completo de la sugerencia;
- cierre sin derivacion en incidente critico.

La comparacion `AI vs. Human Decision` es trazabilidad documental y no se usa para puntuar al operador.

## Movil de campo y actas

La vista `Field Operator Mobile` mantiene control humano completo:

- la IA no acepta derivaciones;
- la IA no registra salida, arribo ni intervencion;
- la IA no crea evidencia;
- la IA no solicita apoyo;
- la IA no finaliza actas;
- la IA no corrige registros;
- la IA no firma por un operador.

Cada operador conserva autoria documental. Una aclaracion, rectificacion o ampliacion se agrega como
nuevo registro o nueva version; nunca borra ni reemplaza silenciosamente el original.

La evidencia de campo es ficticia:

- no hay captura de sensores reales;
- no hay ubicacion real;
- no hay imagen, audio o video real;
- no se cargan datos personales reales.

## Backend experimental

Configuracion:

- `PIPO_OPENAI_CREDENTIAL`: credencial del proveedor del lado servidor.
- `PIPO_OPENAI_MODEL`: modelo configurado; por defecto `gpt-5.6`.
- `PIPO_OPENAI_TIMEOUT_MS`: tiempo maximo de respuesta.
- `PIPO_OPENAI_MAX_FREE_TEXT_CHARS`: limite de texto libre.

El frontend no contiene credenciales del proveedor.

Auditoria server-side:

- registra `requestId`, timestamp, `incidentId` ficticio, modo, duracion, resultado, version de contrato,
  modelo, codigo de error y cantidad de caracteres;
- no registra relato, nombres, ubicaciones reales, evidencia, imagen, voz ni datos personales;
- no persiste narrativas.

Fallback:

- ante error o backend ausente, la UI conserva la entrada;
- permite reintentar;
- permite volver a `SIMULATED_DEMO`;
- permite continuar sin IA;
- no bloquea la intervencion humana.
