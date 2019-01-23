'use strict'

import * as vscode from 'vscode'
import * as Future from 'fluture'

import { getHindentVersion } from './hindent'
import { getStylishHaskellVersion } from './stylishHaskell'
import { logger, Logger } from './logger'

import HaskellDocumentFormattingEditProvider from './HaskellDocumentFormattingEditProvider'

const haskellDocumentSelector: vscode.DocumentSelector = {
    language: 'haskell',
    scheme: 'file',
}

export const activate = (ctx: vscode.ExtensionContext) => {
    const cwd = vscode.workspace.rootPath || process.cwd()

    const channel = vscode.window.createOutputChannel('vscode-stylish-hindent')
    ctx.subscriptions.push(channel)

    const log = logger(channel)
    log.information('Activating extension')

    const logError = (errorMessage: string) => {
        log.error(errorMessage)
        vscode.window.showErrorMessage(errorMessage)
    }

    Future.both(getHindentVersion(cwd), getStylishHaskellVersion(cwd)).fork(
        logError,
        registerFormatterProvider(ctx, cwd, log),
    )
}

const registerFormatterProvider = (
    ctx: vscode.ExtensionContext,
    workingDirectory: string,
    logger: Logger,
) => ([hindentVersion, stylishHaskellVersion]: string[]) => {
    logger.information(
        `Registering document formatting provider using formatters:\n${hindentVersion}\n${stylishHaskellVersion}`,
    )

    ctx.subscriptions.push(
        vscode.languages.registerDocumentFormattingEditProvider(
            haskellDocumentSelector,
            new HaskellDocumentFormattingEditProvider(workingDirectory, logger),
        ),
    )

    ctx.subscriptions.push(
        vscode.languages.registerDocumentRangeFormattingEditProvider(
            haskellDocumentSelector,
            new HaskellDocumentFormattingEditProvider(workingDirectory, logger),
        ),
    )
}

export function deactivate() {}
