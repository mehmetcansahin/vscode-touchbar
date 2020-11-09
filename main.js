const vscode = require("vscode");
const { exec } = require("child_process");

function addSymbol(name) {
  let symbols = {
    curly: { start: "{", end: "}" },
    parentheses: { start: "(", end: ")" },
    arrow: { start: "<", end: ">" },
    bracket: { start: "[", end: "]" },
  };
  let editor = vscode.window.activeTextEditor;
  if (!editor) {
    return;
  }
  const position = editor.selection.active;
  const text = editor.document.getText(editor.selection);
  if (typeof text !== "undefined" && text !== "") {
    vscode.commands.executeCommand("deleteWordPartRight");
    editor.insertSnippet(
      new vscode.SnippetString(symbols[name].start + text + symbols[name].end),
      position
    );
  } else {
    editor.insertSnippet(
      new vscode.SnippetString(symbols[name].start + symbols[name].end),
      position
    );
    vscode.commands.executeCommand("cursorLeft");
  }
}

exports.activate = (context) => {
  context.subscriptions.push(
    vscode.commands.registerCommand("mehmetcansahin.touchbar.run", () => {
      vscode.commands.executeCommand("workbench.action.debug.run");
    }),
    vscode.commands.registerCommand("mehmetcansahin.touchbar.debug", () => {
      vscode.commands.executeCommand("workbench.action.debug.start");
    }),
    vscode.commands.registerCommand("mehmetcansahin.touchbar.curly", () =>
      addSymbol("curly")
    ),
    vscode.commands.registerCommand("mehmetcansahin.touchbar.parentheses", () =>
      addSymbol("parentheses")
    ),
    vscode.commands.registerCommand("mehmetcansahin.touchbar.arrow", () =>
      addSymbol("arrow")
    ),
    vscode.commands.registerCommand("mehmetcansahin.touchbar.bracket", () =>
      addSymbol("bracket")
    )
  );
};

exports.deactivate = () => {};
