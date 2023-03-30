# chiQuery

> 제이쿼리 만들기 프로젝트 <del>치커리</del>

## Table of Contents

1. [Download](#download)
1. [Browser Support](#browser-support)
1. [API](#api)
1. [Installation](#installation)
1. [Conventions](#conventions)

## Download

[https://github.com/choegyumin-study/chiquery/tree/prod](https://github.com/choegyumin-study/chiquery/tree/prod)

## Browser Support

- Chrome: Current
- Edge: Current
- Firefox: Current
- Internet Explorer: 8+
- Opera: Current
- Safari: Current

## API

### Core

#### Selector

- [chiQuery](https://api.jquery.com/jQuery/)
  - Use `.querySelectorAll()`
  - `jQuery().context` is not defined in chiQuery.
  - `chiQuery().history` === `jQuery().prevObject`

### Feature

#### Miscellaneous

- [each](https://api.jquery.com/each/)
- [get](https://api.jquery.com/get/)
- [index](https://api.jquery.com/index/)
- [map](https://api.jquery.com/map/)
- [size](https://api.jquery.com/size/)

#### Navigation

- [add](https://api.jquery.com/add/)
- [children](https://api.jquery.com/children/)
- [closest](https://api.jquery.com/closest/)
- [end](https://api.jquery.com/end/)
- [eq](https://api.jquery.com/eq/)
- [filter](https://api.jquery.com/filter/)
- [find](https://api.jquery.com/find/)
- [first](https://api.jquery.com/first/)
- [has](https://api.jquery.com/has/)
- [is](https://api.jquery.com/is/)
- [last](https://api.jquery.com/last/)
- [next](https://api.jquery.com/next/)
- [nextAll](https://api.jquery.com/nextAll/)
- [not](https://api.jquery.com/not/)
- [parent](https://api.jquery.com/parent/)
- [parents](https://api.jquery.com/parents/)
- [prev](https://api.jquery.com/prev/)
- [prevAll](https://api.jquery.com/prevAll/)
- [siblings](https://api.jquery.com/siblings/)
- [slice](https://api.jquery.com/slice/)

#### Attribute

- [attr](https://api.jquery.com/attr/)
- [addClass](https://api.jquery.com/addClass/)
- [hasClass](https://api.jquery.com/hasClass/)
- [prop](https://api.jquery.com/prop/)
- [removeAttr](https://api.jquery.com/removeAttr/)
- [removeClass](https://api.jquery.com/removeClass/)
- [removeProp](https://api.jquery.com/removeProp/)
- [toggleClass](https://api.jquery.com/toggleClass/)
- [val](https://api.jquery.com/val/)

#### DOM Control

- <del>after</del>
- <del>append</del>
- <del>before</del>
- <del>clone</del>
- <del>detach</del>
- <del>empty</del>
- <del>html</del>
- <del>prepend</del>
- <del>remove</del>
- <del>replaceWith</del>
- <del>text</del>
- <del>unwrap</del>
- <del>wrap</del>
- <del>wrapAll</del>

#### Event

- <del>off</del>
- <del>on</del>
- <del>ready</del>
- <del>trigger</del>

#### Style

- <del>css</del>
- <del>height</del>
- <del>innerHeight</del>
- <del>innerWidth</del>
- <del>outerHeight</del>
- <del>outerWidth</del>
- <del>offset</del>
- <del>offsetParent</del>
- <del>position</del>
- <del>scrollLeft</del>
- <del>scrollTop</del>
- <del>width</del>

### Internal

#### Stack

- changeStack

## Installation

당신은 시작하기 전 다른 몇가지를 먼저 설치해야 합니다:

- <a href="http://nodejs.org/" target="_blank" rel="external">Node.js</a>
- <a href="http://git-scm.com/" target="_blank" rel="external">Git</a>

설치가 완료되었다면, npm을 이용하여 Node 모듈들을 설치합니다:

```shell
npm install -g gulp-cli
npm install --save-dev
```

## Conventions

### Branches

브랜치명은 슬래시(`/`)를 사용하지 않는다.

```text
feature/160715-example (X)
feature-160715-example (O)
```
