import * as vscode from "vscode";

const insertText = (text: string) => {
  const editor = vscode.window.activeTextEditor;

  if (!editor) {
    vscode.window.showErrorMessage("Can't insert console because document is not open");
    return;
  }
  const document = editor.document;
  const selection = editor.selection;
  const range = new vscode.Range(selection.start, selection.end);

  editor.edit((editBuilder) => {
    editBuilder.replace(range, text);
  });
};

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "js-console" is now active!');

  // insert console.log()
  const insertConsoleLog = vscode.commands.registerCommand(
    "js-console.insertConsoleLog",
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }

      let selection = editor.selection;
      let text = editor.document.getText(selection);

      if (!text) {
        await vscode.commands.executeCommand("editor.action.addSelectionToNextFindMatch");
        selection = editor.selection;
        text = editor.document.getText(selection);
      }

      if (text) {
        await vscode.commands.executeCommand("editor.action.insertLineAfter");
        const consoleText = `console.log('${text}: ', ${text});`;
        insertText(consoleText);
      } else {
        const consoleText = "console.log();";
        insertText(consoleText);
      }
    }
  );

  context.subscriptions.push(insertConsoleLog);

  // insert console.table()
  const insertConsoleTable = vscode.commands.registerCommand(
    "js-console.insertConsoleTable",
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }

      const selection = editor.selection;
      const text = editor.document.getText(selection);
      if (text) {
        await vscode.commands.executeCommand("editor.action.insertLineAfter");
        const consoleText = `console.table('${text}: ', ${text});`;
        insertText(consoleText);
      } else {
        const consoleText = "console.table();";
        insertText(consoleText);
      }
    }
  );

  context.subscriptions.push(insertConsoleTable);

  // insert console.warn()
  const insertConsoleWarn = vscode.commands.registerCommand(
    "js-console.insertConsoleWarn",
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }

      const selection = editor.selection;
      const text = editor.document.getText(selection);
      if (text) {
        await vscode.commands.executeCommand("editor.action.insertLineAfter");
        const consoleText = `console.warn('${text}: ', ${text});`;
        insertText(consoleText);
      } else {
        const consoleText = "console.warn();";
        insertText(consoleText);
      }
    }
  );

  context.subscriptions.push(insertConsoleWarn);

  // insert console.error()
  const insertConsoleError = vscode.commands.registerCommand(
    "js-console.insertConsoleError",
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }

      const selection = editor.selection;
      const text = editor.document.getText(selection);
      if (text) {
        await vscode.commands.executeCommand("editor.action.insertLineAfter");
        const consoleText = `console.error('${text}: ', ${text});`;
        insertText(consoleText);
      } else {
        const consoleText = "console.error();";
        insertText(consoleText);
      }
    }
  );

  context.subscriptions.push(insertConsoleError);
}

export function deactivate() {}
