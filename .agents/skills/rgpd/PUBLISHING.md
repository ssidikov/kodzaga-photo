# Publishing checklist

Use this checklist before making the repository public or announcing it.

## Repository

- [ ] Repository is public on GitHub.
- [ ] Default branch is `main`.
- [ ] `SKILL.md` exists at repository root.
- [ ] README install command uses the real `SenasDev/rgpd-skill`.
- [ ] README badge uses the real `SenasDev/rgpd-skill`.
- [ ] License is Apache-2.0.
- [ ] GitHub repository topics include: `agent-skills`, `skills`, `skills-sh`, `rgpd`, `gdpr`, `privacy`, `data-protection`.

## Validate with skills.sh CLI

List detected skills:

```bash
npx skills add SenasDev/rgpd-skill --list
```

Install for Codex globally:

```bash
npx skills add SenasDev/rgpd-skill --skill rgpd -g -a codex -y
```

Install from a direct local path before publishing:

```bash
npx skills add . --list
```

## After publishing

- [ ] Visit `https://skills.sh/SenasDev/rgpd-skill`.
- [ ] Confirm badge renders: `https://skills.sh/b/SenasDev/rgpd-skill`.
- [ ] Test install from a clean directory.
