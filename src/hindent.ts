'use strict'

import { stackExec, mapFailureToFriendlyMessage } from './stack'

const EXECUTABLE_NAME = 'hindent'

export const getHindentVersion = (cwd: string) =>
    stackExec(EXECUTABLE_NAME, ['--version'], {
        cwd,
    }).mapRej(mapFailureToFriendlyMessage(EXECUTABLE_NAME))

export const formatCodeWithHindent = (cwd: string, code: string) =>
    stackExec(EXECUTABLE_NAME, [], {
        cwd,
        input: code,
    }).mapRej(mapFailureToFriendlyMessage(EXECUTABLE_NAME))
