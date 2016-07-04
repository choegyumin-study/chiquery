# chiQuery

> 제이쿼리 만들기 프로젝트 <del>치커리</del>

## Download

[https://github.com/choi4450-study/chiquery/tree/dist/master](https://github.com/choi4450-study/chiquery/tree/dist/master)

## Browser Support

- Chrome: Current
- Edge: Current
- Firefox: Current
- Internet Explorer: 8+
- Opera: Current
- Safari: Current

## Installation

You do need to have a couple of other things installed first:

- <a href="http://nodejs.org/" target="_blank" rel="external">Node.js</a>
- <a href="http://git-scm.com/" target="_blank" rel="external">Git</a>

If your computer already has these, congratulations! Just install Node modules with npm:

```shell
npm install -g gulp-cli
npm install --save-dev
```

## API

### Core

#### Selector

- [chiQuery](https://api.jquery.com/jQuery/)
  - Use `.querySelectorAll()`
  - `chiQuery().context` === `jQuery().context` || `chiQuery().context` !== `jQuery().context`
  - `chiQuery().history` === `jQuery().prevObject` || `chiQuery().history` !== `jQuery().prevObject`

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
- <del>nextUntil</del>
- [not](https://api.jquery.com/not/)
- [parent](https://api.jquery.com/parent/)
- [parents](https://api.jquery.com/parents/)
- [prev](https://api.jquery.com/prev/)
- [prevAll](https://api.jquery.com/prevAll/)
- <del>prevUntil</del>
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

- after
- append
- <del>appendTo</del>
- before
- clone
- detach
- empty
- html
- <del>insertAfter</del>
- <del>insertBefore</del>
- prepend
- <del>prependTo</del>
- remove
- <del>replaceAll</del>
- replaceWith
- text
- unwrap
- wrap
- wrapAll

#### Event

- off
- on
- ready
- trigger

#### Style

- css
- height
- innerHeight
- innerWidth
- outerHeight
- outerWidth
- offset
- offsetParent
- position
- scrollLeft
- scrollTop
- width

### Internal

#### Stack

- changeStack
