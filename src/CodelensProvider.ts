import * as vscode from "vscode";

/**
 * CodelensProvider
 */
export class CodelensProvider implements vscode.CodeLensProvider {
  private codeLenses: vscode.CodeLens[] = [];
  private regex: RegExp;
  private _onDidChangeCodeLenses: vscode.EventEmitter<void> =
    new vscode.EventEmitter<void>();
  public readonly onDidChangeCodeLenses: vscode.Event<void> =
    this._onDidChangeCodeLenses.event;

  constructor() {
    this.regex = /(.+)/g;

    vscode.workspace.onDidChangeConfiguration((_) => {
      this._onDidChangeCodeLenses.fire();
    });
  }

  public provideCodeLenses(
    document: vscode.TextDocument,
    token: vscode.CancellationToken
  ): vscode.CodeLens[] | Thenable<vscode.CodeLens[]> {
    if (
      vscode.workspace
        .getConfiguration("hello-world")
        .get("createCodelens", true)
    ) {
      this.codeLenses = [];
      const regex = new RegExp(this.regex);
      const text = document.getText();
      let matches;
      while ((matches = regex.exec(text)) !== null) {
        const line = document.lineAt(document.positionAt(matches.index).line);
        console.log(line);
        const indexOf = line.text.indexOf(matches[0]);
        console.log(indexOf);
        const position = new vscode.Position(line.lineNumber, indexOf);
        const range = document.getWordRangeAtPosition(
          position,
          new RegExp(this.regex)
        );

        let command: vscode.Command = {
          title: "▶️",
          tooltip: "Execute Code line",
          command: "hello-world.codelensAction",
          arguments: [line.text],
        };

        if (range) {
          this.codeLenses.push(new vscode.CodeLens(range, command));
        }
      }
      return this.codeLenses;
    }
    return [];
  }

  public resolveCodeLens(
    codeLens: vscode.CodeLens,
    token: vscode.CancellationToken
  ) {
    if (
      vscode.workspace
        .getConfiguration("hello-world")
        .get("enableCodeLens", true)
    ) {
      console.log(codeLens);
      // codeLens.command = {
      //   title: "▶️",
      //   tooltip: "Execute Code line",
      //   command: "hello-world.codelensAction",
      //   arguments: ["Argument 1", false],
      // };
      return codeLens;
    }
    return null;
  }
}
