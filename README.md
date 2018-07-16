# open-related-file

*open-related-file* is a [VS code](https://code.visualstudio.com/) extension written to improve my programming workflow. Feel free to use it as you please.

## The Problem

I write [Reason](https://reasonml.github.io/) code most of the time. Specifically, many times I find myself writing [ReasonReact](https://reasonml.github.io/reason-react/) components that typically have the following directory structure:

```
workspace/
├── components/
    ├── SomeComponent.re
    ├── SomeComponent.bs.js
    ├── SomeComponent.pcss
    └── ...
```

Multiply the above by even a digit's worth of components and add VS Code's notorious file explorer issues like [this](https://github.com/Microsoft/vscode/issues/17777) and the amount of time spent looking for related files adds up.

## Usage

`Open related files` will appear in the Command Palette.

![](https://raw.githubusercontent.com/bryanthomaschen/vscode-open-related-file/master/open-related-file-usecase.gif)

You can add a custom keybinding as well:
```
  "key": "<some key binding>"
  "command": "openRelatedFiles.open",
  "when": "editorTextFocus"
```

## Configuration

Right now the only configuration option is to specify an array of file extensions to ignore when opening similarly named files.
```
"openRelatedFiles.ignoreExt" = [
    ".bs.js",
    ".ignored_file_type",
    ...
]
```

**NOTE**

File extension names are computed based on the first period `.`.

Therefore, when opening related files of `some.name.bs.js`, the following will be considered related:

```
some.ext
some.another.ext
```
Whereas the following will **not** be considered related:
```
some.name
some.name.js
```
