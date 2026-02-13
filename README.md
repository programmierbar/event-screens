# programmier.bar Event Screens

Looping presentation slides for [programmier.bar](https://programmier.bar) meetup events, built with [Slidev](https://sli.dev/).

## Getting Started

```bash
npm install
npm dev
```
or 
```bash
deno install
deno task dev
```

Visit <http://localhost:3030> to view the slides.

## Editing

- Edit [`slides.md`](./slides.md) to modify slide content. Slides are separated by `---` with YAML frontmatter for layout and transition options.
- Custom layouts live in [`theme/layouts/`](./theme/layouts/) (e.g., `title`, `cover`, `agenda`, `quoted`, `feedback`).
- Shared components live in [`theme/components/`](./theme/components/) (e.g., `Logo`, `Autoplay`).
- Theme styles are in [`theme/styles/`](./theme/styles/).
- Static assets (images, QR codes) go in [`public/assets/`](./public/assets/).

## Build & Export

```bash
npm build     # Build SPA to dist/
npm export    # Export to PDF
```
or
```bash
deno task build
deno task export
```

(Exporting requires Playwright to be installed)

Learn more about Slidev at the [documentation](https://sli.dev/).