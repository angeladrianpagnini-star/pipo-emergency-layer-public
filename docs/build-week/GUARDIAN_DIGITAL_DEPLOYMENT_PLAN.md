# Guardian Digital Deployment Plan

## Alcance

Hoja de ruta futura para separar el laboratorio PIPO de una eventual presencia institucional Guardian Digital.

No se implementa, no se despliega y no se modifica la publicacion actual.

## Objetivos futuros

- sitio institucional Guardian Digital;
- espacio de laboratorio de innovacion para PIPO;
- subdominio dedicado para demos PIPO;
- despliegues de vista previa;
- backend server-side separado;
- credenciales protegidas del lado servidor;
- separacion entre servicios comerciales y laboratorio de innovacion.

## Arquitectura futura sugerida

1. Sitio institucional:
   - contenido publico;
   - descripcion de servicios;
   - contacto institucional;
   - portfolio o laboratorio.

2. Laboratorio PIPO:
   - demos conceptuales;
   - rutas de preview;
   - aviso de datos ficticios;
   - no conexion con emergencias reales.

3. Cloudflare Pages:
   - publicacion estatica;
   - ramas de preview;
   - control de dominio;
   - separacion por entorno.

4. Worker para backend:
   - endpoint server-side;
   - variables protegidas;
   - validacion de contrato;
   - timeout;
   - auditoria de metadatos;
   - sin persistencia de relatos.

5. Subdominio PIPO:
   - `pipo.guardian-digital.example`;
   - rutas publicas de demo;
   - rutas experimentales con aviso de laboratorio.

## Separacion operativa

El sitio institucional no debe prometer integraciones oficiales inexistentes. PIPO debe presentarse como
prototipo conceptual, laboratorio de innovacion y demostracion tecnica.

## Pendientes antes de implementar

- definir dominio real;
- definir responsable de administracion;
- definir politica de privacidad;
- definir texto publico legal;
- definir entornos de preview y produccion;
- definir controles de acceso para backend;
- revisar marca, contenidos y alcance comercial.

## No hacer en esta etapa

- no desplegar Guardian Digital;
- no crear Cloudflare Pages;
- no crear Worker;
- no configurar dominio;
- no cargar credenciales;
- no cambiar GitHub Pages actual;
- no publicar la rama `build-week-2026`.
