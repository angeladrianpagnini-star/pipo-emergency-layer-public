# Release Candidate Checklist - Build Week 2026 RC1

Estado: listo para commit local y etiqueta local. No publicado.

| Area | Estado | Evidencia |
| --- | --- | --- |
| Rama Build Week | Listo | `build-week-2026` |
| Version publica v36 | Preservada | sin diferencias contra `pre-build-week-v36` en los tres archivos protegidos |
| Feature freeze | Activo | solo correcciones y documentacion de Etapa 6A |
| Datos y secretos | Listo | datos ficticios; escaneo sin valores con forma de credencial |
| IA simulada | Listo | modo predeterminado, sin backend requerido |
| Backend experimental | Listo con limite | se consulta solo bajo seleccion explicita y falla de forma segura |
| Permisos y cierre ciudadano | Listo | pruebas de minimizacion, acceso y perspectiva ciudadana |
| Evidence Vault | Listo para demo | cifrado y retencion solo de demostracion local |
| Accesibilidad | Listo para RC | foco visible, etiquetas y regiones de estado verificadas |
| Responsive | Listo para RC | comprobacion de escritorio y movil sin overflow horizontal |
| Pruebas automatizadas | Listo | `node docs\\build-week\\release-candidate.test.js` y las verificaciones de sintaxis completadas sin fallas |
| Push, merge o publicacion | Bloqueado | fuera del alcance autorizado |

## Limites de publicacion

- No es una integracion oficial con 911, 107 u otros organismos.
- No captura audio, video, ubicacion ni sensores reales.
- No procesa datos personales reales.
- No constituye prueba judicial automatica, firma certificada ni cadena de custodia oficial.
- No incorpora KMS/HSM, certificados productivos, autenticacion productiva ni almacenamiento de evidencia real.

## Orden de salida autorizado

1. Ejecutar la suite completa de pruebas.
2. Confirmar `git diff --check` y que v36 permanece intacta.
3. Crear commit local del release candidate.
4. Crear etiqueta local `build-week-2026-rc1` sin sobrescribir etiquetas existentes.
5. Detenerse antes de push, merge o publicacion.
