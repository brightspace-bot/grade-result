# d2l-grade-result

[![NPM version](https://img.shields.io/npm/v/@brightspace-ui-labs/grade-result.svg)](https://www.npmjs.org/package/@brightspace-ui-labs/grade-result)
[![Dependabot badge](https://flat.badgen.net/dependabot/BrightspaceUILabs/d2l-grade-result?icon=dependabot)](https://app.dependabot.com/)
[![Build status](https://travis-ci.com/github/BrightspaceUILabs/grade-result.svg?branch=master)](https://travis-ci.com/github/BrightspaceUILabs/grade-result)

> Note: this is a ["labs" component](https://github.com/BrightspaceUI/guide/wiki/Component-Tiers). While functional, these tasks are prerequisites to promotion to BrightspaceUI "official" status:
>
> - [x] [Design organization buy-in](https://github.com/BrightspaceUI/guide/wiki/Before-you-build#working-with-design) (refer to docs folder)
> - [ ] [design.d2l entry](http://design.d2l/)
> - [x] [Architectural sign-off](https://github.com/BrightspaceUI/guide/wiki/Before-you-build#web-component-architecture) ([Eric Knutson's Notes](https://desire2learn.atlassian.net/wiki/spaces/Nimbus/pages/949223655/Eric+s+thoughts+for+a+slicey+workflow+with+features+along+the+way))
> - [x] [Continuous integration](https://github.com/BrightspaceUI/guide/wiki/Testing#testing-continuously-with-travis-ci)
> - [ ] [Cross-browser testing](https://github.com/BrightspaceUI/guide/wiki/Testing#cross-browser-testing-with-sauce-labs)
> - [x] [Unit tests](https://github.com/BrightspaceUI/guide/wiki/Testing#testing-with-polymer-test) (if applicable)
> - [ ] [Accessibility tests](https://github.com/BrightspaceUI/guide/wiki/Testing#automated-accessibility-testing-with-axe)
> - [x] [Visual diff tests](https://github.com/BrightspaceUI/visual-diff)
> - [ ] [Localization](https://github.com/BrightspaceUI/guide/wiki/Localization) with Serge (if applicable)
> - [x] Demo page
> - [ ] README documentation

A web component used for rendering grades in Brightspace

![demo screenshot](./docs/demo_screenshot.png)

## Installation

To install from NPM:

```shell
npm install @brightspace-ui-labs/d2l-grade-result
```

## Usage

```html
<script type="module">
    import '@brightspace-ui-labs/d2l-grade-result/d2l-grade-result.js';
</script>
<d2l-grade-result href="href" token="token">My element</d2l-grade-result>
```

## Developing, Testing and Contributing

After cloning the repo, run `npm install` to install dependencies.

### Running the demos

To start an [es-dev-server](https://open-wc.org/developing/es-dev-server.html) that hosts the demo page and tests:

```shell
npm start
```

### Testing

To lint:

```shell
npm run lint
```

To run local unit tests:

```shell
npm run test:local
```

To run both linting and unit tests:

```shell
npm test
```

## Versioning, Releasing & Deploying

All version changes should obey [semantic versioning](https://semver.org/) rules.

Include either `[increment major]`, `[increment minor]` or `[increment patch]` in your merge commit message to automatically increment the `package.json` version and create a tag.








