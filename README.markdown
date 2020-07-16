translate-json
=====

<div style="text-align: center">

[![npm version](https://badge.fury.io/js/translate-json.svg)](https://www.npmjs.com/package/translate-json)
![Tests](https://github.com/LukeChannings/translate-json/workflows/Tests/badge.svg)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

</div>

Tool to translate strings in a JSON document.

## Install

    npm i -g translate-json

## Usage

    Usage:
      translate-json [options] -l <language> (- | <input>) [<output>]
      translate-json [options] --lang=<language> (- | <input>) [<output>]

    Options:
      -t, --translator              The translation service to use: google (default), yandex, bing.
      -k, --api-key                 The API key to be used with the translation service.
      -p, --preserve-html-entities  Preserve HTML entities in translated text. (False by default.)
      -e, --exclude                 Regular expression to exclude key paths. e.g. '^(notThis|this|not.this.either)$'
      -d, --dry-run                 Do not actually translate any values, prefix strings with 'zz_' to mark them.
      -h, --help                    Show this screen.
      -v, --version                 Show version.
      --verbose                     Log more.

    Examples:
      translate-json --lang=ru ./labels.json ./labels-ru.json
      translate-json -d --lang=ru ./labels.json ./labels-ru.json
      translate-json --preserve-html-entities --lang=ru ./labels.json ./labels-ru.json
      cat input.json | translate-json -l ru - > output.json
