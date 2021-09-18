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

const insertConsole = async (type: InsertType) => {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    return;
  }
  const textColor = vscode.workspace.getConfiguration("js-console").get("textColor") as string;

  let selection = editor.selection;
  let text = editor.document.getText(selection);

  if (!text) {
    await vscode.commands.executeCommand("editor.action.addSelectionToNextFindMatch");
    selection = editor.selection;
    text = editor.document.getText(selection);
  }

  if (type === "log") {
    if (text) {
      await vscode.commands.executeCommand("editor.action.insertLineAfter");

      if (textColor) {
        if (!isColor(textColor)) {
          vscode.window.showInformationMessage(
            "Text color cannot be specified because the color code is incorrect."
          );
          const consoleText = `console.${type}('${text}: ', ${text});`;
          insertText(consoleText);
        } else {
          const consoleText = `console.${type}('%c ${text}: ', 'color: ${textColor}', ${text});`;
          insertText(consoleText);
        }
      } else {
        const consoleText = `console.${type}('${text}: ', ${text});`;
        insertText(consoleText);
      }
    } else {
      const consoleText = `console.${type}();`;
      insertText(consoleText);
    }
  } else if (type === "table") {
    if (text) {
      await vscode.commands.executeCommand("editor.action.insertLineAfter");
      const consoleText = `console.${type}(${text});`;
      insertText(consoleText);
    } else {
      const consoleText = `console.${type}();`;
      insertText(consoleText);
    }
  } else {
    if (text) {
      await vscode.commands.executeCommand("editor.action.insertLineAfter");
      const consoleText = `console.${type}('${text}: ', ${text});`;
      insertText(consoleText);
    } else {
      const consoleText = `console.${type}();`;
      insertText(consoleText);
    }
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
