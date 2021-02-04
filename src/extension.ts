import { ExtensionContext, languages } from 'vscode';
import { XonDocumentFormatter } from './xon-document-formatter';

export function activate(context: ExtensionContext) {
    context.subscriptions.push(
        languages.registerDocumentFormattingEditProvider(
            'xon',
            new XonDocumentFormatter()
        )
    );
}
