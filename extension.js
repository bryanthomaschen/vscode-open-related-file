const vscode = require("vscode");
const path = require("path");
const fs = require("fs");

function activate(context) {
  let baseName = _fileName => {
    return _fileName.split(".")[0];
  };

  let extName = _fileName => {
    let [first, ...rest] = _fileName.split(".");
    return rest.join(".");
  };

  let openFile = _fullPath => {
    vscode.workspace
    .openTextDocument(vscode.Uri.file(_fullPath))
    .then(doc => {
      console.log(doc);
      vscode.window.showTextDocument(doc, { preview: false });
    });
  };

  let disposableOpen = vscode.commands.registerCommand(
    "openRelatedFiles.open",
    function() {
      let config = vscode.workspace.getConfiguration("openRelatedFiles");

      /** @type {Array} */
      let ignoreExtArr = config.get("ignoreExt");

      let editor = vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }

      let hasIgnoredExt = _fileName => {
        return ignoreExtArr.some(ext => {
          return _fileName.endsWith(ext);
        });
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
          openFile(fullPath);
        });
      });
    }
  );

  let disposableCreate = vscode.commands.registerCommand(
    "openRelatedFiles.create",
    function() {
      let config = vscode.workspace.getConfiguration("openRelatedFiles");
      let fileExtMap = config.get("createFileMap");

      let editor = vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }

      let currentFileName = path.basename(editor.document.fileName);
      let currentFileDir = path.dirname(editor.document.fileName);
      let currentFileExt = "." + extName(currentFileName);

      if (fileExtMap.hasOwnProperty(currentFileExt)) {
        /** @type {Array} */
        let interestedExts = fileExtMap[currentFileExt];
        let interestedFiles = interestedExts.map(ext => {
          return baseName(currentFileName) + ext;
        });

        interestedFiles.forEach(file => {
          let fullPath = [currentFileDir, file].join(path.sep);
          fs.open(fullPath, 'wx', (err, fd) => {
            if (!err) {
              fs.close(fd, err => { if (err) throw err; });
            }
            openFile(fullPath);
          });
        });
      }
    }
  );

  context.subscriptions.push(disposableOpen);
  context.subscriptions.push(disposableCreate);
}
exports.activate = activate;

function deactivate() {}
exports.deactivate = deactivate;
