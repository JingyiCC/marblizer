# Marblizer

An interactive paper marbling web app forked from [nickswalker/marblizer](https://github.com/nickswalker/marblizer)

Improve the linetine operation to be more realistic. [Try it](https://jingyicc.github.io/marblizer/).

* Various marbling operations with interactive controls
* Real time preview and rendering
* Scriptable with object oriented JS API

Implements the approach from [Lu et. al.](https://www.computer.org/csdl/mags/cg/2012/06/mcg2012060026-abs.html).

## Usage

[Try it](https://jingyicc.github.io/marblizer/).

| Shortcuts |                  Operations                           |
| ------------------------ | ------------------------------------------- |
| **Tools**                |                                             |
| `d`                      | Ink drop                                    |
| `v`                      | Vortex                                      |
| `l`                      | Line tine                                   |
| `c`                      | Circular tine                               |
| `w`                      | Wavy tine                                   |
| **Tool control**         |                                             |
| `▲`                      | Increase current tool's primary parameter   |
| `▼`                      | Decrease current tool's primary parameter   |
| `▶`                      | Increase current tool's secondary parameter |
| `◀`                      | Decrease current tool's secondary parameter |
| **UI**                   |                                             |
| `shift`+`?`              | Show shortcut overley                       |
| `f`                      | Show operation preview vector field         |
| `s`                      | Show script editor                          |
| `tab`                    | Hide UI panes                               |
| **Composition**          |                                             |
| `r`                      | Reset                                       |
| `s`                      | Show script editor                          |


## Development

You'll need TypeScript 2.1 and a recent version of Chrome.

### Compile

```
npm install
npx tsc
```