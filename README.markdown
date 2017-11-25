translate-json
=====

[![npm version](https://badge.fury.io/js/translate-json.svg)](https://www.npmjs.com/package/translate-json)
[![Build Status](https://travis-ci.org/LukeChannings/translate-json.svg?branch=master)](https://travis-ci.org/LukeChannings/translate-json)
[![Coverage Status](https://coveralls.io/repos/github/LukeChannings/translate-json/badge.svg?branch=master)](https://coveralls.io/github/LukeChannings/translate-json?branch=master)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

Tool to translate strings in a JSON document.

## Install

    npm i -g translate-json
    
    Please note that this package uses --harmony-async-await flag. Linux kernel doesn't support passing this flag to node via env, so you might want to change first line of index.js to use node > 7 or remove env and provide direct path to node. 

## Usage

    Usage:
      translate-json [options] -l <language> (- | <input>) [<output>]
      translate-json [options] --lang=<language> (- | <input>) [<output>]

    Options:
      -t, --translator              The translation service to use: google (default), yandex, bing.
      -k, --api-key                 The API key to be used with the translation service. (Not needed for google.)
      -p, --preserve-html-entities  Preserve HTML entities in translated text. (False by default.)
      -c, --concurrency             Number of fields to translate simultaneously. (Default is 30)
      -e, --exclude                 Regular expression to exclude key paths. e.g. '^(notThis|this|not.this.either)$'
      -d, --dry-run                 Do not actually translate any values, prefix strings with 'zz_' to mark them.
      -h, --help                    Show this screen.
      -v, --version                 Show version.
      --verbose                     Log more.

    Examples:
      translate-json --lang=ru ./labels.json ./labels-ru.json
      translate-json -d --lang=ru ./labels.json ./labels-ru.json
      translate-json -c 60 --preserve-html-entities --lang=ru ./labels.json ./labels-ru.json
      cat input.json | translate-json -l ru - > output.json
