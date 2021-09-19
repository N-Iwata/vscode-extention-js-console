import * as vscode from "vscode";

type InsertType = "log" | "table" | "warn" | "error";

const isColor = (color: string) => {
  return color.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/) !== null;
};

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

const getText = (type: InsertType, text: string, color: string) => {
  if (type === "log") {
    if (text) {
      if (color) {
        if (!isColor(color)) {
          vscode.window.showInformationMessage(
            "Text color cannot be specified because the color code is incorrect."
          );
          return `console.${type}('${text}: ', ${text});`;
        } else {
          return `console.${type}('%c ${text}: ', 'color: ${color}', ${text});`;
        }
      } else {
        return `console.${type}('${text}: ', ${text});`;
      }
    } else {
      return `console.${type}();`;
    }
  } else if (type === "table") {
    return text ? `console.${type}(${text});` : `console.${type}();`;
  } else {
    return text ? `console.${type}('${text}: ', ${text});` : `console.${type}();`;
  }
};

const insertConsole = async (type: InsertType) => {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    return;
  }
  const color = vscode.workspace.getConfiguration("js-console").get("textColor") as string;

  let selection = editor.selection;
  let text = editor.document.getText(selection);

  if (!text) {
    await vscode.commands.executeCommand("editor.action.addSelectionToNextFindMatch");
    selection = editor.selection;
    text = editor.document.getText(selection);
  }

  if (text) {
    await vscode.commands.executeCommand("editor.action.insertLineAfter");
  }
  const consoleText = getText(type, text, color);
  insertText(consoleText);
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
