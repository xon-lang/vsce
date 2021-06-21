import { clearScopes } from '@xon/ast';
import { translateModule } from '@xon/translator-ts';
import * as fs from 'fs';
import * as path from 'path';
import {
  ExtensionContext,
  languages,
  TextDocument,
  window,
  workspace,
} from 'vscode';
import { XonDocumentFormatter } from './xon-document-formatter';

let outputChannel = window.createOutputChannel('XON');
outputChannel.show();

export function activate(context: ExtensionContext) {
  context.subscriptions.push(
    languages.registerDocumentFormattingEditProvider(
      'xon',
      new XonDocumentFormatter()
    )
  );

  context.subscriptions.push(
    workspace.onDidSaveTextDocument(onDidSaveTextDocument)
  );
}

async function onDidSaveTextDocument(document: TextDocument) {
  if (document.languageId !== 'xon' || document.uri.scheme !== 'file') return;

  const dirname = path.dirname(document.fileName);
  const filename = path.parse(document.fileName).name + '.ts';
  const filePath = path.resolve(dirname, filename);

  clearScopes();
  try {
    const translatedXonCode = translateModule(document.getText());
    fs.writeFileSync(filePath, translatedXonCode);
  } catch (error) {
    outputChannel.appendLine(error.toString());
  }
}
