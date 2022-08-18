#!/bin/bash

# un-ignore build folder
sed -i 's#/build##' .gitignore
sed -i 's#build/##' .gitignore

TSCONFIG=$(cat tsconfig.json | jq --tab '
	.compilerOptions.outDir = "build/esm"
	| .compilerOptions.module = "ESNext"
')
echo "$TSCONFIG" > tsconfig.json

PJSON=$(cat package.json | jq --tab '
	del(.type)
	| del(.homepage)
	| .description = .description + ". This is a fork of " + .repository + ", but with CommonJS support."
	| .repository = "esm2cjs/is"
	| .name = "@esm2cjs/is"
	| .author = { "name": "Dominic Griesel", "email": "d.griesel@gmx.net" }
	| .publishConfig = { "access": "public" }
	| .funding = "https://github.com/sponsors/AlCalzone"
	| .main = "build/cjs/index.js"
	| .types = "build/esm/index.d.ts"
	| .typesVersions = {}
	| .typesVersions["*"] = {}
	| .typesVersions["*"]["build/esm/index.d.ts"] = ["build/esm/index.d.ts"]
	| .typesVersions["*"]["build/cjs/index.d.ts"] = ["build/esm/index.d.ts"]
	| .typesVersions["*"]["*"] = ["build/esm/*"]
	| .module = "build/esm/index.js"
	| .files = ["build/esm/**/*.{js,d.ts,json}", "build/cjs/**/*.{js,d.ts,json}"]
	| .exports = {}
	| .exports["."].import = "./build/esm/index.js"
	| .exports["."].require = "./build/cjs/index.js"
	| .exports["./package.json"] = "./package.json"
	| .scripts["to-cjs"] = "esm2cjs --in build/esm --out build/cjs -t node12"
	| .scripts.build = "del build/ && tsc"
')
echo "$PJSON" > package.json

npm i

npm i -D @alcalzone/esm2cjs
npm run to-cjs
npm uninstall -D @alcalzone/esm2cjs

PJSON=$(cat package.json | jq --tab 'del(.scripts["to-cjs"])')
echo "$PJSON" > package.json
