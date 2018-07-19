# open-related-file

*open-related-file* is a [VS code](https://code.visualstudio.com/) extension written to improve my programming workflow. Feel free to use it as you please.

## Available Commands

`Open related files` will open files that have the same base name as the currently focused file.

`Create related files` will create (if it doesn't already exist) files with the same base name but with one or more extensions specified in the configuration object `OpenRelatedFiles.createFileMap`.

> **NOTE**
> 
> File extension names are computed based on the first period `.`.
> 
> Therefore, when opening related files of `some.name.bs.js`, the following will be considered related:
> 
> ```
> some.ext
> some.another.ext
> ```
> Whereas the following will **not** be considered related:
> ```
> some.name
> some.name.js
> ```

## Usage

### Open related files

`Open related files` is accessible from the command palette.

![](https://raw.githubusercontent.com/bryanthomaschen/vscode-open-related-file/master/open-related-file-usecase.gif)

You can add a custom keybinding as well:
```
  "key": "<some key binding>"
  "command": "openRelatedFiles.open",
  "when": "editorTextFocus"
```

### Create related files

`Create related files` is accessible from the command.

You can also add a custom keybinding for this:
```
  "key": "<some key binding>"
  "command": "openRelatedFiles.create",
  "when": "editorTextFocus"
```

## Configuration Options

**`openRelatedFiles.ignoreExt`**

* Array of file extensions to ignore when *opening* related files.

   Example:
   ```
   "openRelatedFiles.ignoreExt" = [
       ".bs.js",
       ".ignored_file_type",
       ...
   ]
   ```

**`openRelatedFiles.createFileMap`**

* Object map of file extensions to create

   Example:
   ```
   "openRelatedFiles.createFileMap" = {
       ".re": [
           ".pcss",
           ".md",
           ".some_other_ext"
       ]
   }
   ```

   Ths above will create and open `SomeFile.pcss`, `SomeFile.md`, `SomeFile.some_other_ext` if you run the command with `SomeFile.re` in focus. If the file already existed, it will not be overwritten.

## Motivation

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
