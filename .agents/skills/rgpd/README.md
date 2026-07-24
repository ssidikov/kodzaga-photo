# RGPD Agent Skill

[![skills.sh](https://skills.sh/b/SenasDev/rgpd-skill)](https://skills.sh/SenasDev/rgpd-skill)

Skill para agentes de IA que ayuda a revisar y preparar artefactos operativos de privacidad bajo **RGPD/GDPR** y **LOPDGDD**, con foco por defecto en España/UE.

Incluye una guía específica para **banners de cookies/CMP**: banner inicial no coercitivo, aceptar/rechazar/configurar al mismo nivel, cierre sin consentimiento, toggle de preferencias siempre visible abajo a la izquierda y estilos adaptados a la web donde se integre.

> No sustituye asesoría legal. Usa la skill como apoyo operativo y valida con asesoría jurídica o DPO cuando el tratamiento sea sensible, de alto riesgo o vaya a producción.

## Para qué sirve

| Caso | Qué aporta la skill |
|---|---|
| Privacidad por diseño | Mapa de tratamientos, finalidades, bases jurídicas, datos, destinatarios, conservación, seguridad y riesgos. |
| Políticas de privacidad | Revisión de transparencia, información por capas, derechos, plazos, encargados y transferencias. |
| Cookies y CMP | Criterios de UX y técnica para consentimiento, preferencias granulares y carga condicionada de scripts. |
| Encargados y proveedores | Checklist de DPA, subencargados, seguridad, auditoría, brechas, borrado/devolución y transferencias. |
| DPIA / EIPD | Señales de alto riesgo, estructura de evaluación, mitigaciones y puntos de validación legal/DPO. |
| Brechas de datos | Triaje, evidencias, línea temporal, valoración de riesgo, notificaciones y remediación. |

## Qué hace el agente al usarla

La skill indica al agente que debe:

1. Definir alcance, rol de la organización y jurisdicción.
2. Separar hechos, supuestos, riesgos y recomendaciones.
3. Mapear datos, finalidades, bases jurídicas, destinatarios, encargados, transferencias, retención, cookies y medidas de seguridad.
4. Revisar principios RGPD: licitud, transparencia, minimización, limitación de finalidad, conservación, seguridad y responsabilidad proactiva.
5. Entregar artefactos prácticos: checklist, tabla de riesgos, tareas técnicas, borradores o revisión de UX.
6. Señalar incertidumbres y cuándo debe revisar asesoría legal o DPO.

## Criterios para banners de cookies/CMP

Cuando el usuario pida diseñar, revisar o implementar un banner de cookies para España/UE, la skill exige este comportamiento por defecto:

- Mostrar el banner al inicio de la navegación o cuando haya que renovar consentimiento.
- No instalar cookies, píxeles o scripts no esenciales antes de una elección válida.
- No forzar aceptación ni bloquear la web solo para obtener consentimiento.
- Mostrar `Aceptar`, `Rechazar` y `Configurar` en la primera capa.
- Hacer que aceptar y rechazar tengan visibilidad y esfuerzo comparables.
- Permitir cerrar el banner sin que cerrar cuente como aceptar.
- Mantener las cookies no esenciales desactivadas si el usuario cierra sin elegir.
- Mantener un toggle de preferencias siempre visible abajo a la izquierda.
- Permitir cambiar o retirar consentimiento con la misma facilidad con la que se otorgó.
- Separar categorías como necesarias, analíticas, personalización y marketing/publicidad.
- Adaptar estilos al sitio anfitrión usando variables CSS, tipografía, colores, espaciado, bordes, foco y modo claro/oscuro.
- Mantener accesibilidad: teclado, foco visible, contraste y nombres accesibles.

Ejemplo de posición recomendada para el toggle:

```css
.rgpd-cookie-toggle {
  position: fixed;
  left: max(1rem, env(safe-area-inset-left));
  bottom: max(1rem, env(safe-area-inset-bottom));
  z-index: var(--rgpd-z-index, 9999);
}
```

## Qué no hace

- No ofrece asesoría legal definitiva.
- No garantiza cumplimiento por sí sola.
- No sustituye una auditoría legal, técnica o de seguridad.
- No inventa datos sobre tratamientos, proveedores, cookies o transferencias.
- No recomienda patrones oscuros, preselección de cookies no esenciales, consentimiento por scroll o aceptación por seguir navegando.

## Ejemplos de uso

```text
Usa la skill RGPD para revisar este flujo de onboarding.
```

```text
Prepara una checklist RGPD para este SaaS.
```

```text
Revisa si esta política de privacidad cubre bases legales, retención y encargados.
```

```text
Diseña un banner de cookies RGPD que no fuerce al usuario, se pueda cerrar, mantenga un toggle visible abajo a la izquierda y herede estilos de mi web.
```

```text
Revisa este componente de cookies y dime si aceptar, rechazar y configurar están al mismo nivel.
```

```text
Haz una checklist de triaje para una posible brecha de datos.
```

## Instalación

Desde GitHub:

```bash
npx skills add SenasDev/rgpd-skill --skill rgpd
```

Para instalarla globalmente y apuntar a Codex:

```bash
npx skills add SenasDev/rgpd-skill --skill rgpd -g -a codex -y
```

Para comprobar que skills.sh detecta la skill:

```bash
npx skills add SenasDev/rgpd-skill --list
```

También puedes revisar la ficha en:

```text
https://skills.sh/SenasDev/rgpd-skill
```

## Estructura

```text
.
├── SKILL.md
├── references/
│   └── rgpd-checklists.md
├── LICENSE
├── README.md
├── CHANGELOG.md
├── CONTRIBUTING.md
├── PUBLISHING.md
└── SECURITY.md
```

## Archivos principales

| Archivo | Función |
|---|---|
| `SKILL.md` | Instrucciones principales que seguirá el agente. |
| `references/rgpd-checklists.md` | Checklists operativas para privacidad, cookies, DPIA, proveedores e incidentes. |
| `README.md` | Explica para qué sirve la skill y cómo instalarla. |
| `PUBLISHING.md` | Checklist de publicación y verificación. |

## Compatibilidad

La skill está preparada para repositorios compatibles con `skills.sh`: el archivo `SKILL.md` está en la raíz, incluye frontmatter y referencia los materiales de apoyo en `references/`.

## Licencia

Apache-2.0.
