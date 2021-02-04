import {
    CancellationToken,
    DocumentFormattingEditProvider,
    FormattingOptions,
    ProviderResult,
    TextDocument,
    TextEdit,
} from 'vscode';

export class XonDocumentFormatter implements DocumentFormattingEditProvider {
    provideDocumentFormattingEdits(
        document: TextDocument,
        options: FormattingOptions,
        token: CancellationToken
    ): ProviderResult<TextEdit[]> {
        const firstLine = document.lineAt(0);
        if (firstLine.text !== '000') {
            return [TextEdit.insert(firstLine.range.start, '111\n')];
        }
    }
}
