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
> - [x] [Accessibility tests](https://github.com/BrightspaceUI/guide/wiki/Testing#automated-accessibility-testing-with-axe)
> - [x] [Visual diff tests](https://github.com/BrightspaceUI/visual-diff)
> - [x] [Localization](https://github.com/BrightspaceUI/guide/wiki/Localization) with Serge (if applicable)
> - [x] Demo page
> - [x] README documentation

A web component used for rendering grades in Brightspace

![demo screenshot](./docs/demo_screenshot.png)

## Properties

#### d2l-labs-d2l-grade-result

| Property          | Type      | Default | Description                                                  |
| ----------------- | --------- | ------- | ------------------------------------------------------------ |
| `href`            | `string`  | `''`    | The Hypermedia route to power the component. This component runs off of the /grade route or an activity. |
| `token`           | `string`  | `''`    | For authentication                                           |
| `disableAutoSave` | `boolean` | `false` | Prevent the component from automatically saving the grade to the API when the grade is changed. |
| `_hideTitle`      | `boolean` | `false` | This property will hide the "Overall Grade" title above the component. |

##### Public Methods

| Method                         | Description                                                  |
| ------------------------------ | ------------------------------------------------------------ |
| `saveGrade(): void`            | This is the method used to manually save the grade to the server when `disableAutoSave = true`. This method will emit `@d2l-grade-result-grade-saved-success` or `@d2l-grade-result-grade-saved-error`. |
| `hasUnsavedChanges(): boolean` | Determines whether the grade has been changed by the user and has not been saved to the server yet. |

If you are only interested in rendering the presentational layer of the component, you can simply use the `d2l-grade-result-presentational` component.

#### d2l-labs-d2l-grade-result-presentational

| Property                 | GradeType   | Type                        | Default     | Description                                                  |
| ------------------------ | ----------- | --------------------------- | ----------- | ------------------------------------------------------------ |
| `gradeType`              | All         | `'Numeric' | 'LetterGrade'` | `'Numeric'` | Specifies the type of grade that the component is meant to render. |
| `labelText`              | All         | `string`                    | `''`        | The text that appears above the component.                   |
| `scoreNumerator`         | Numeric     | `number`                    | `0`         | The numerator of the numeric score that is given.            |
| `scoreDenominator`       | Numeric     | `number`                    | `0`         | The denominator of the numeric score that is given.          |
| `selectedLetterGrade`    | LetterGrade | `string`                    | `''`        | The current selected letter grade of the options given.      |
| `letterGradeOptions`     | LetterGrade | `string[]`                  | `[]`        | All of the possible letter grades that can be selected.      |
| `includeGradeButton`     | All         | `boolean`                   | `false`     | Determines whether the grades icon button is rendered.       |
| `includeReportsButton`   | All         | `boolean`                   | `false`     | Determines whether the reports icon button is rendered.      |
| `gradeButtonTooltip`     | All         | `string`                    | `''`        | The text that is inside of the tooltip when hovering over the grades button. |
| `reportsButtonTooltip`   | All         | `string`                    | `''`        | The text that is inside of the tooltip when hovering over the reports button. |
| `readOnly`               | All         | `boolean`                   | `false`     | Set to `true` if the user does not have permissions to edit the grade. |
| `isGradeAutoCompleted`   | All         | `boolean`                   | `false`     | Set to `true` if a grade has been automatically provided for the activity. This will show the 'Manually Override Grade' button. |
| `isManualOverrideActive` | All         | `boolean`                   | `false`     | Set to `true` is the user is currently manually overriding the grade. This will change the text of the manual override button to 'Clear Manual Override'. |
| `hideTitle`              | All         | `boolean`                   | `false`     | This property will hide the "Overall Grade" title above the component. |

## Events

#### d2l-labs-d2l-grade-result

| Event                                           | Description                                                  |
| ----------------------------------------------- | ------------------------------------------------------------ |
| `@d2l-grade-result-initialized-success`         | This event is fired when the component is successfully initialized and a grade is loaded from the API. |
| `@d2l-grade-result-initialized-error`           | This event is fired when there is an error initializing the component. This is usually caused by an invalid `href` or `token`. |
| `@d2l-grade-result-grade-updated-success`       | This event is fired when the grade is successfully updated on the frontend. |
| `@d2l-grade-result-grade-updated-error`         | This event is fired when there is an error updating the grade on the frontend. |
| `@d2l-grade-result-grade-saved-success`         | This event is fired when the grade is successfully saved to the server. |
| `@d2l-grade-result-grade-saved-error`           | This event is fired when there is an error while saving the grade to the server. |
| `@d2l-grade-result-grade-button-click`          | This event is fired when the grades button is clicked.       |
| `@d2l-grade-result-reports-button-click`        | This event is fired when the reports button is clicked.      |
| `@d2l-grade-result-manual-override-click`       | This event is fired when the manual override button is clicked. |
| `@d2l-grade-result-manual-override-clear-click` | This event is fired when the manual override clear is clicked. |

#### d2l-labs-d2l-grade-result-presentational

| Event                                           | Description                                                  |
| ----------------------------------------------- | ------------------------------------------------------------ |
| `@d2l-grade-result-grade-button-click`          | This event is fired when the grades button is clicked.       |
| `@d2l-grade-result-reports-button-click`        | This event is fired when the reports button is clicked.      |
| `@d2l-grade-result-grade-change`                | This event is fired on the change of the grade for a `gradeType="Numeric"` grade. |
| `@d2l-grade-result-letter-score-selected`       | This event is fired on the change of the grade for a `gradeType="LetterGrade"` grade. |
| `@d2l-grade-result-manual-override-click`       | This event is fired when the manual override button is clicked. |
| `@d2l-grade-result-manual-override-clear-click` | This event is fired when the manual override clear is clicked. |

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
<d2l-labs-d2l-grade-result href="href" token="token" disableAutoSave _hideTitle>My element</d2l-labs-d2l-grade-result>
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








