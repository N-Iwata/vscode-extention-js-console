import * as assert from "assert";

import * as vscode from "vscode";
import { isColor, getText } from "../../extension";

suite("Extension Test Suite", () => {
  vscode.window.showInformationMessage("Start all tests.");

  test("isColor", () => {
    assert.strictEqual(isColor("#112233"), true);
    assert.strictEqual(isColor("#aabbcc"), true);
    assert.strictEqual(isColor("#ABCDE0"), true);
    assert.strictEqual(isColor("#AAA"), true);
    assert.strictEqual(isColor("#A0f"), true);
    assert.strictEqual(isColor("#1122"), false);
    assert.strictEqual(isColor("#GGFFHH"), false);
    assert.strictEqual(isColor("abc"), false);
  });

  test("getText log", () => {
    assert.strictEqual(getText("log", "", "#112233"), "console.log();");
    assert.strictEqual(
      getText("log", "name", "#112233"),
      "console.log('%c name: ', 'color: #112233', name);"
    );
    assert.strictEqual(
      getText("log", "name", "#aabbcc"),
      "console.log('%c name: ', 'color: #aabbcc', name);"
    );
    assert.strictEqual(getText("log", "name", "#GGFFHH"), "console.log('name: ', name);");
    assert.strictEqual(getText("log", "name", ""), "console.log('name: ', name);");
  });

  test("getText table", () => {
    assert.strictEqual(getText("table", "", "#112233"), "console.table();");
    assert.strictEqual(getText("table", "name", "#112233"), "console.table(name);");
  });

  test("getText warn", () => {
    assert.strictEqual(getText("warn", "", "#112233"), "console.warn();");
    assert.strictEqual(getText("warn", "name", "#112233"), "console.warn('name: ', name);");
  });

  test("getText error", () => {
    assert.strictEqual(getText("error", "", "#112233"), "console.error();");
    assert.strictEqual(getText("error", "name", "#112233"), "console.error('name: ', name);");
  });
});
