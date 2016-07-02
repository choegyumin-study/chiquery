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

### Selector

- [chiQuery](https://api.jquery.com/jQuery/)
  - Use `.querySelectorAll()`
  - chiQuery().context != jQuery().context
  - chiQuery().context == jQuery().prevObject

### Core

#### Miscellaneous

- [each](https://api.jquery.com/each/)
- [get](https://api.jquery.com/get/)
- [index](https://api.jquery.com/index/)
- [size](https://api.jquery.com/size/)

#### Navigation

- add
- children
- closest
- [eq](https://api.jquery.com/eq/)
- filter
- [find](https://api.jquery.com/find/)
- [first](https://api.jquery.com/first/)
- [has](https://api.jquery.com/has/)
- [is](https://api.jquery.com/is/)
- [last](https://api.jquery.com/last/)
- map
- next
- nextAll
- <del>nextUntil</del>
- not
- [parent](https://api.jquery.com/parent/)
- [parents](https://api.jquery.com/parents/)
- prev
- prevAll
- <del>prevUntil</del>
- siblings
- slice

### Pod

#### Attribute

- [attr](https://api.jquery.com/attr/)
- [addClass](https://api.jquery.com/addClass/)
- hasClass
- prop
- [removeAttr](https://api.jquery.com/removeAttr/)
- [removeClass](https://api.jquery.com/removeClass/)
- removeProp
- toggleClass
- val

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
