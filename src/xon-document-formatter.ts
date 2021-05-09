import { formatCode } from '@xon/formatter';
import {
  // CancellationToken,
  DocumentFormattingEditProvider,
  // FormattingOptions,
  ProviderResult,
  Range,
  TextDocument,
  TextEdit,
} from 'vscode';

export class XonDocumentFormatter implements DocumentFormattingEditProvider {
  provideDocumentFormattingEdits(
    document: TextDocument
    // options: FormattingOptions,
    // token: CancellationToken
  ): ProviderResult<TextEdit[]> {
    const firstLine = document.lineAt(0);
    const lastLine = document.lineAt(document.lineCount - 1);
    const range = new Range(firstLine.range.start, lastLine.range.end);

    const text = document.getText(range);
    return [TextEdit.replace(range, formatCode(text))];
  }
}
