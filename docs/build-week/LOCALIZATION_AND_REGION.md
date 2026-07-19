# Localization And Region

## Supported public locales

The citizen-facing Build Week experience supports two complete locales:

- `es-AR`
- `en-US`

At startup it reads `navigator.language`: Spanish selects `es-AR`, English selects `en-US`, and every other value
falls back to `es-AR`. A person may change the language without reloading the page. The only persisted browser value
is the non-sensitive locale preference under `pipo_demo_locale`.

The interface updates `document.documentElement.lang` whenever the selection changes. Incident data, permissions,
events, evidence, statements, and simulated media remain in memory and are never stored in browser storage.

## Operational region

Language and operational region are independent selectors. The demonstration currently offers:

- Argentina - Buenos Aires: labels such as 911 Seguridad, 107 Salud, Bomberos, and Defensa Civil.
- International demonstration: generic labels for public safety, emergency health, fire, and civil protection.

These labels demonstrate routing vocabulary only. They do not claim integration, dispatch access, interoperability,
or an active agreement with any jurisdiction or organization.

## Technical modules

The previous Build Week modules remain available under `Informacion tecnica de Build Week` and `Ver modulos avanzados`.
The guided first experience is citizen activation. Technical identifiers may remain visible in technical contexts, but
the public navigation uses localized labels.
