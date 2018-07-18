// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const path = require("path");
const fs = require("fs");

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
  let disposable = vscode.commands.registerCommand(
    "openRelatedFiles.open",
    function() {
      let config = vscode.workspace.getConfiguration("openRelatedFiles");
      let ignoreExtArr = [...config.get("ignoreExt")];

      // The code you place here will be executed every time your command is executed
      let editor = vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }

      let hasIgnoredExt = _fileName => {
        return ignoreExtArr.some(ext => {
          return _fileName.endsWith(ext);
        });
      };

      let baseName = _fileName => {
        return _fileName.split(".")[0];
      };

      let extName = _fileName => {
        let [_first, ...rest] = _fileName.split(".");
        return rest.join(".");
      };

      let currentFileName = path.basename(editor.document.fileName);
      let currentFileDir = path.dirname(editor.document.fileName);

      fs.readdir(currentFileDir, (err, files) => {
        let relevantFiles = files.filter(file => {
          return (
            !hasIgnoredExt(file) &&
            baseName(file) == baseName(currentFileName) &&
            file != currentFileName
          );
        });

        relevantFiles.forEach(file => {
          let fullPath = [currentFileDir, file].join(path.sep);
          vscode.workspace
            .openTextDocument(vscode.Uri.file(fullPath))
            .then(doc => {
              console.log(doc);
              vscode.window.showTextDocument(doc, {preview: false});
            });
        });
      });
    }
  );

  context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}
exports.deactivate = deactivate;
