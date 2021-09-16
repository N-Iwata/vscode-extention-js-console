import * as vscode from "vscode";

type InsertType = "log" | "table" | "warn" | "error";

const insertText = (text: string) => {
  const editor = vscode.window.activeTextEditor;

  if (!editor) {
    vscode.window.showErrorMessage("Can't insert console because document is not open");
    return;
  }
  const selection = editor.selection;
  const range = new vscode.Range(selection.start, selection.end);

  editor.edit((editBuilder) => {
    editBuilder.replace(range, text);
  });
};

const insertConsole = async (type: InsertType) => {
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
    const consoleText =
      type === "table" ? `console.${type}(${text});` : `console.${type}('${text}: ', ${text});`;
    insertText(consoleText);
  } else {
    const consoleText = `console.${type}();`;
    insertText(consoleText);
  }
};

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "js-console" is now active!');

  // insert console.log()
  const insertConsoleLog = vscode.commands.registerCommand("js-console.insertConsoleLog", () => {
    insertConsole("log");
  });

  context.subscriptions.push(insertConsoleLog);

  // insert console.table()
  const insertConsoleTable = vscode.commands.registerCommand(
    "js-console.insertConsoleTable",
    () => {
      insertConsole("table");
    }
  );

  context.subscriptions.push(insertConsoleTable);

  // insert console.warn()
  const insertConsoleWarn = vscode.commands.registerCommand("js-console.insertConsoleWarn", () => {
    insertConsole("warn");
  });

  context.subscriptions.push(insertConsoleWarn);

  // insert console.error()
  const insertConsoleError = vscode.commands.registerCommand(
    "js-console.insertConsoleError",
    () => {
      insertConsole("error");
    }
  );

  context.subscriptions.push(insertConsoleError);
}

export function deactivate() {}
