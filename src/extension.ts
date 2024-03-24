// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { CodelensProvider } from "./CodelensProvider";
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "hello-world" is now active!');

  const codelensProvider = new CodelensProvider();
  vscode.languages.registerCodeLensProvider("*", codelensProvider);

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "hello-world.helloWorld",
    () => {
      // The code you place here will be executed every time your command is executed
      // Display a message box to the user
      vscode.window.showInformationMessage("Hello VS Code");
    }
  );

  let disposable2 = vscode.commands.registerCommand(
    "hello-world.helloAutobots",
    () => {
      vscode.window.showWarningMessage("This is a warning from autobots");
    }
  );

  let disposable3 = vscode.commands.registerCommand(
    "hello-world.acceptUserInput",
    async () => {
      console.log("This is from create terminal");
      let userInput = await vscode.window.showInputBox();
      console.log(userInput);
      vscode.window.showInformationMessage(
        `User provided ${userInput}. Checking validaity of the same.`
      );
    }
  );

  let disposable4 = vscode.commands.registerCommand(
    "hello-world.createTerminal",
    async () => {
      try {
        vscode.window.showWarningMessage("You are creating a terminal");
        let terminal = vscode.window.createTerminal();
        terminal.show(true);

        terminal.sendText("node\r\nconsole.log('My name is livin sunny.')");
        terminal.sendText("console.log('My name is livin sunny.')");
        terminal.sendText("'This is the string'");

        console.log("Terminal Executed");
      } catch (err) {
        console.log(err);
      }
    }
  );

  let disposable5 = vscode.commands.registerCommand(
    "hello-world.createCodelens",
    () => {
      vscode.workspace
        .getConfiguration("hello-world")
        .update("createCodelens", true, true);
    }
  );

  vscode.commands.registerCommand(
    "hello-world.codelensAction",
    (args: string) => {
      vscode.window.showInformationMessage(
        `CodeLens action clicked with args=${args}`
      );
    }
  );

  context.subscriptions.push(
    disposable2,
    disposable3,
    disposable4,
    disposable5
  );
}

// This method is called when your extension is deactivated
export function deactivate() {
  console.log("Your extension is deactivated");
}
