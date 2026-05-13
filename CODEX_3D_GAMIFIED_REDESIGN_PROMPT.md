# Codex CLI Prompt: 3D Gamified ISC2 CC Study App

Use this prompt in Codex CLI:

```text
You are working in repo:
C:\Users\marku\OneDrive\Documents\GitHub\isc2-cc-study

Goal:
Redesign this ISC2 CC study site into a modern, interactive, 3D gamified web app. Treat it as a playable study experience, not a static landing page.

Context:
- You have full repo control.
- Inspect the full repo before changing files.
- Pay special attention to:
  - /assets
  - /assets/3D_designs_assets
  - any README, guidance, prompt, theme, or artifact files inside /assets
- Recently added /assets/3D_designs_assets should strongly influence the visual direction.
- Use the existing tiny cyber planet / GLB / inspiration assets where practical.
- Preserve useful study content and data already in the repo.

Use relevant Codex skills:
- Frontend app/design skill for polished UI redesign.
- Three.js / WebGL game skill for the interactive 3D layer.
- Browser/frontend testing skill for verification.
- GitHub skill only if needed for branch/remote work.

Required work:
1. Analyze the repository structure, existing app files, data files, and asset guidance.
2. Create a new branch for the redesign.
3. Redesign and repackage the site as a 3D gamified study app.
4. Build a usable first-play experience:
   - interactive 3D scene inspired by the cyber tiny planet assets
   - study progression or mission map
   - quiz/drill interaction using existing question/data content where possible
   - visible feedback, scoring/progress, and restart/continue behavior
   - responsive HUD/controls
5. Keep implementation aligned with the repo's current stack unless there is a strong reason to change it.
6. Use real assets from /assets, especially /assets/3D_designs_assets, instead of placeholder visuals.
7. Run the app locally and serve it for play-through.
8. Use Browser or Chrome automation to inspect the running app:
   - verify the app loads
   - verify the 3D scene is visible and nonblank
   - verify controls/interactions work
   - verify console has no material errors
   - verify desktop and mobile layouts
9. Patch any issues found during browser testing.
10. Leave the repo in a clean, reviewable state.

Design direction:
- Modern cyber-study command center.
- 3D "tiny cyber planet" as the primary first-screen signal.
- Gamified progression: missions, nodes, XP, streaks, readiness, domains, or unlocks.
- DOM HUD for study controls and progress; WebGL for the 3D world.
- Avoid a marketing landing page. The first screen should be the playable app.
- Keep UI dense enough for study use, but polished and readable.
- Avoid generic neon overload; make the cyber aesthetic purposeful.

Technical preferences:
- Prefer Three.js for 3D.
- Keep simulation/game state separate from render objects.
- Use DOM overlays for HUD, quiz panels, mission cards, and settings.
- Make assets load reliably from local relative paths.
- Add fallbacks if a GLB cannot load.
- Do not introduce unnecessary backend services.
- Do not remove unrelated existing content.

Verification and final report:
After implementation, provide:
- branch name
- local URL
- files changed
- commands run
- browser verification summary
- known limitations or remaining risks
- concise explanation of the playable flow
```
