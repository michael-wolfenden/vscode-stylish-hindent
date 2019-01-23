# vscode-stylish-hindent

Format Haskell code with [hindent](https://github.com/chrisdone/hindent) and [stylish-haskell](https://github.com/jaspervdj/stylish-haskell) in Visual Studio Code.

# Important

This extension has not been published to the Visual Studio Marketplace, I run it by copying the source to the local extensions folder. This was purely a learning excercise for me. Having said that, this extension is feature complete.

# Features

This extension uses [hindent](https://github.com/chrisdone/hindent) and [stylish-haskell](https://github.com/jaspervdj/stylish-haskell) to format Haskell source code.

-   To format a full-page document, open the command palette and choose "Format Document".
-   To format a selection, select some text, open the command palette, and choose "Format Selection".
-   To format on save, open User Preferences (⌘ , or Ctrl ,), then add: `"editor.formatOnSave": true`

# Requirements

-   [Stack](http://haskellstack.org) must be in `$PATH`.
-   [hindent](https://github.com/chrisdone/hindent) must be available in the current stack project (`stack build hindent`)
-   [stylish-haskell](https://github.com/jaspervdj/stylish-haskell) must be available in the current stack project (`stack build stylish-haskell`)
