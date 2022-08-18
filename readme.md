# @esm2cjs/is

This is a fork of https://github.com/sindresorhus/is, but automatically patched to support ESM **and** CommonJS, unlike the original repository.

## Install

You can use an npm alias to install this package under the original name:

```
npm i @sindresorhus/is@npm:@esm2cjs/is
```

```jsonc
// package.json
"dependencies": {
    "@sindresorhus/is": "npm:@esm2cjs/is"
}
```

but `npm` might dedupe this incorrectly when other packages depend on the replaced package. If you can, prefer using the scoped package directly:

```
npm i @esm2cjs/is
```

```jsonc
// package.json
"dependencies": {
    "@esm2cjs/is": "^ver.si.on"
}
```

## Usage

```js
// Using ESM import syntax
import { is } from "@esm2cjs/is";

// Using CommonJS require()
const is = require("@esm2cjs/is").default;
```

> **Note:**
> Because the original module uses `export default`, you need to append `.default` to the `require()` call.

For more details, please see the original [repository](https://github.com/sindresorhus/is).

## Sponsoring

To support my efforts in maintaining the ESM/CommonJS hybrid, please sponsor [here](https://github.com/sponsors/AlCalzone).

To support the original author of the module, please sponsor [here](https://github.com/sindresorhus/is).
