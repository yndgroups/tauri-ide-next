## 样式主题
```
初始化
主题样式设置
{
  '&': {
    color: 'white',
    backgroundColor: '#1e1e1e',
  },
  '.cm-content': {
    caretColor: '#1e1e1e',
  },
  '&.cm-focused .cm-cursor': {
    borderLeftColor: '#1e1e1e',
  },
  '&.cm-focused .cm-selectionBackground, ::selection': {
    backgroundColor: '#1e1e1e',
    color: '#FFF',
  },
  '.cm-gutters': {
    backgroundColor: '#1e1e1e',
    color: '#74715e',
    border: 'none',
  },
  '.cm-line': {
    // borderBottom: '1px solid #f00',
  },
  'cm-s-cobalt': {
    borderLeft: '1px solid #30aaed !important',
  },
};
```

```
const myTheme = createTheme({
  theme: 'light',
  settings: {
    background: '#ffffff',
    backgroundImage: '',
    foreground: '#75baff',
    caret: '#5d00ff',
    selection: '#036dd626',
    selectionMatch: '#036dd626',
    lineHighlight: '#8a91991a',
    gutterBorder: '1px solid #ffffff10',
    gutterBackground: '#fff',
    gutterForeground: '#8a919966',
  },
  styles: [
    { tag: t.comment, color: '#787b8099' },
    { tag: t.variableName, color: '#0080ff' },
    { tag: [t.string, t.special(t.brace)], color: '#5c6166' },
    { tag: t.number, color: '#5c6166' },
    { tag: t.bool, color: '#5c6166' },
    { tag: t.null, color: '#5c6166' },
    { tag: t.keyword, color: '#5c6166' },
    { tag: t.operator, color: '#5c6166' },
    { tag: t.className, color: '#5c6166' },
    { tag: t.definition(t.typeName), color: '#5c6166' },
    { tag: t.typeName, color: '#5c6166' },
    { tag: t.angleBracket, color: '#5c6166' },
    { tag: t.tagName, color: '#5c6166' },
    { tag: t.attributeName, color: '#5c6166' },
  ],
});

```