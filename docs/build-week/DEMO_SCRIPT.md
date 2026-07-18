# Demo Script - Build Week Release Candidate

## Etapa 6C.1 - Recorrido operativo principal

1. Iniciar `Recorrido operativo PIPO` y presentar el escenario ficticio de accidente vial.
2. Mostrar el dispositivo ciudadano: punto PIPO, condicion seleccionada, permisos simulados, ID y alerta recibida por
   la Consola Maestra PIPO.
3. Avanzar a la recepcion maestra: contexto disponible, prioridad preliminar, riesgos y datos pendientes.
4. Avanzar a la derivacion simultanea: 911 Seguridad, 107 Salud, Transito y Bomberos reciben la misma alerta
   ficticia en paralelo.
5. Mostrar los cuatro recursos sugeridos, la distancia y ETA simuladas, la regla explicada y la confirmacion humana
   de demostracion.
6. Mostrar estados paralelos de campo, contexto prearribo simulado y el mapa abstracto sin servicios externos.
7. Mostrar que cada organismo conserva un acta individual y que la consola maestra integra referencias sin reescribir
   su contenido.
8. Finalizar con cierre institucional y paquete ciudadano depurado: estado, organismos participantes, acciones,
   documentos habilitados, proximo paso y referencia.
9. Cambiar idioma o region para demostrar que se actualizan etiquetas de interfaz, no capacidades ni integraciones.

El recorrido dura aproximadamente un minuto. Sus eventos, medios, personas, recursos, tiempos, ubicaciones y
organismos son ficticios y permanecen en memoria durante la demostracion.

## Etapa 6C.0 - Recorrido ciudadano recomendado

1. Abrir `docs/build-week/` y explicar que PIPO se proyecta como una aplicacion descargable de activacion inmediata.
2. Mostrar el telefono ficticio y aclarar que el punto PIPO representa un acceso autorizado segun el sistema operativo,
   no una burbuja universal ya implementada.
3. Abrir el punto PIPO con teclado o puntero y elegir una condicion de emergencia ficticia.
4. Mostrar que ubicacion, audio, video, descripcion e informacion de dispositivo son permisos simulados e
   independientes, inicialmente desactivados.
5. Iniciar la alerta simulada y recorrer el video abstracto, la onda de audio, el mapa, el temporizador, el incidente
   y las acciones para detener cada medio simulado.
6. Mostrar la tarjeta de recepcion institucional y el flujo ciudadano -> consola maestra -> organismo competente ->
   campo -> acta -> cierre.
7. Cambiar idioma y region en forma independiente. Aclarar que los nombres locales son etiquetas de demostracion y no
   integraciones reales.
8. Cerrar con el aviso: la IA no activa sensores; la persona inicia la sesion y las decisiones son humanas.
9. Abrir `Informacion tecnica de Build Week` o `Ver modulos avanzados` solo para profundizar en los componentes previos.

## Limites de este recorrido

- No hay aplicacion nativa instalada.
- No hay sensores, camara, microfono, geolocalizacion, rastreo, despacho ni comunicacion institucional real.
- No se guarda ningun incidente ni permiso; solo la preferencia `pipo_demo_locale` puede persistir.
- La bitacora visible es una cadena de demostracion en memoria y no una cadena de custodia oficial.

Duracion objetivo: menos de tres minutos.

## Recorrido prioritario

1. Abrir `docs/build-week/` y explicar el problema: una alerta puede perder contexto entre canales y organismos.
2. Mostrar `Perspectives` en modo ciudadano: informacion minimizada, documentos habilitados y proximos pasos.
3. Mostrar un relato libre ficticio en `Incident Assistant`.
4. Ejecutar `Analizar incidente` con `SIMULATED_DEMO`; explicar que no transmite datos y no requiere backend.
5. Mostrar la sugerencia y confirmar que la decision final es humana.
6. Volver a `Consola maestra` y mostrar coordinacion sin reescritura de registros ajenos.
7. Ir a `Field Operators` y ejecutar `Demo 4 organismos`.
8. Mostrar que cada operador conserva acontecimientos, evidencia ficticia y acta individual propia.
9. Ir a `Procedure Act` y ejecutar `Demo Etapa 5`.
10. Mostrar completitud, inconsistencia simulada, aclaracion por anexo, versionado y expediente maestro.
11. Volver a `Citizen Closure` para mostrar resumen depurado, recibo, documentos habilitados y observacion formal.
12. Ir a `Evidence Vault` y ejecutar `Demo 5.2`.
13. Mostrar cifrado local de contenido ficticio, integridad, permisos, descarga bloqueada y retencion simulada.
14. Cerrar con limites y atribucion: datos ficticios, sin sensores, sin conexiones oficiales, sin validez juridica automatica; la auditoria final se documenta en `GPT_5_6_BUILD_CONTRIBUTION.md`.

## Frase de cierre

PIPO no reemplaza emergencias oficiales. Propone una capa conceptual de comunicacion, trazabilidad y
documentacion para reducir perdida de informacion y ordenar la respuesta con control humano.

## Limites visibles

- Todos los datos son ficticios.
- No hay sensores reales, camaras, microfonos, ubicacion real ni conexion con sistemas de emergencia.
- La IA es asesora y requiere validacion humana.
- El backend es experimental y opcional; la demo funciona sin el.
- La boveda es una demostracion criptografica local, no KMS/HSM ni cadena de custodia oficial.
- La vista ciudadana se mantiene minimizada y no expone controles internos.
