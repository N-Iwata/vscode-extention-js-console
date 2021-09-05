import * as vscode from "vscode";

const insertText = (val: string) => {
  const editor = vscode.window.activeTextEditor;

  if (!editor) {
    vscode.window.showErrorMessage("Can't insert log because no document is open");
    return;
  }

  const selection = editor.selection;
  const range = new vscode.Range(selection.start, selection.end);

  editor.edit((editBuilder) => {
    editBuilder.replace(range, val);
  });
};

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "js-console" is now active!');

  const insertConsoleLog = vscode.commands.registerCommand("js-console.insertConsoleLog", () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      return;
    }

    const selection = editor.selection;
    const text = editor.document.getText(selection);
    text
      ? vscode.commands.executeCommand("editor.action.insertLineAfter").then(() => {
          const logToInsert = `console.log('${text}: ', ${text});`;
          insertText(logToInsert);
        })
      : insertText("console.log();");
  });

  context.subscriptions.push(insertConsoleLog);
}

export function deactivate() {}
