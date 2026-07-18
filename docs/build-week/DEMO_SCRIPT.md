# Demo Script

Duracion objetivo: menos de tres minutos.

## Recorrido

1. Abrir `docs/build-week/`.
2. Mostrar que es una rama separada y que v36 queda preservada.
3. En `Field Operators`, tocar `Demo 4 organismos`.
4. Explicar el escenario: accidente vial con lesion, derrame, 911, 107, Transito y Bomberos.
5. Mostrar que cada operador conserva estado, eventos, evidencia simulada y acta individual propia.
6. Ir a `Procedure Act`.
7. Tocar `Demo Etapa 5`.
8. Mostrar `Acta Digital de Procedimiento PIPO`.
9. Mostrar `Acta 100% completa`.
10. Mostrar consistencia: inconsistencia horaria simulada, aclaracion y respuesta por anexo.
11. Mostrar versionado: `v1`, `v2`, `v3`, `v3.1`, `v3.2`.
12. Mostrar referencia de integridad de demostracion.
13. Ir a `Closure`.
14. Mostrar expediente maestro, supervision validada, exportacion JSON y cierre.
15. Ir a `Perspectives`.
16. Cambiar entre `Ciudadano`, `Operador de campo`, `Consola federada` y `Consola maestra`.
17. Mostrar que el ID del incidente y el estado no se reinician.
18. Tocar `Demo Etapa 5.1`.
19. Ir a `Citizen Closure`.
20. Mostrar resumen ciudadano, vista segura, proximos pasos, documentos habilitados, recibo, opinion y
    observacion formal.
21. Ir a `Security Status`.
22. Mostrar transporte: si es local debe decir `LOCAL_DEVELOPMENT` y no prometer TLS productivo.
23. Ir a `Evidence Vault`.
24. Tocar `Ejecutar demo 5.2`.
25. Mostrar evidencia ficticia cifrada, integridad verificada, acceso restringido, retencion y descarga bloqueada.
26. Ir a `Access Requests` y mostrar historial de vista, denegacion, vencimiento o revocacion.
27. Ir a `Acquisition Records` y mostrar `DigitalAcquisitionRecord` como registro conceptual, sin adquisicion real.
28. Ir a `Transfer History` y leer el aviso de cadena de transferencia demostrativa.
29. Cerrar con el principio: las actuaciones individuales se integran sin ser sustituidas ni reescritas, y
    la devolucion ciudadana se entrega minimizada y trazable.

## Frase corta

PIPO no reemplaza emergencias oficiales. Propone una capa de comunicacion, trazabilidad y documentacion
para reducir perdida de informacion y ordenar la respuesta.

## Aviso

Todos los datos son ficticios. No hay sensores reales, camaras, microfonos, ubicacion real, claves en
frontend ni conexion con sistemas de emergencia.

El resumen ciudadano no es copia del expediente maestro. Excluye identidades protegidas, notas internas,
operaciones reservadas, evidencia de terceros, comunicaciones internas e informacion judicial restringida.

La boveda de evidencia es una demostracion criptografica local. No es KMS/HSM, no almacena archivos
sensibles reales y no representa cadena de custodia oficial.
