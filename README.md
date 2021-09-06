# vscode-extension-js-console README

## Features

Easily insert console.log | table | warn | error statements, by N-Iwata[(@rpf_nob)](https://twitter.com/rpf_nob)

## Install

This extension is available for free in the Visual Studio Code Marketplace

## How to use

With selection or cursor into the variable(Anything is OK):

- Press Cmd+Shift+L => The output on a new line will be: console.log('variable: ', variable);
- Press Cmd+Shift+T => The output on a new line will be: console.table('variable: ', variable);
- Press Cmd+Shift+W => The output on a new line will be: console.warn('variable: ', variable);
- Press Cmd+Shift+E => The output on a new line will be: console.error('variable: ', variable);

Without selection:

- Press Cmd+Shift+L => The output on the same line will be: console.log();
- Press Cmd+Shift+T => The output on the same line will be: console.table();
- Press Cmd+Shift+W => The output on the same line will be: console.warn();
- Press Cmd+Shift+E => The output on the same line will be: console.error();

for windows Ctrl+Shift+・・・

## Release Notes

### 1.0.0

Initial release of ...

## Contribute

### Pull requests

Feel free to make a pull request to the main branch to fix any bugs or suggestions for improvement.

### Issues

Feel free to create an issue if you have any problems or requests for improvement.

## License

[MIT License](LICENSE)
