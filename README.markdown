translate-json-cli
=====

[![Build Status](https://travis-ci.org/LukeChannings/translate-json-cli.svg?branch=master)](https://travis-ci.org/LukeChannings/translate-json-cli)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/26ac757ea8cd4e64952b6527b3180c91)](https://www.codacy.com/app/app42740794/translate-json?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=LukeChannings/translate-json&amp;utm_campaign=Badge_Grade)
[![Codacy Badge](https://api.codacy.com/project/badge/Coverage/26ac757ea8cd4e64952b6527b3180c91)](https://www.codacy.com/app/app42740794/translate-json?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=LukeChannings/translate-json&amp;utm_campaign=Badge_Coverage)
[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](http://standardjs.com/)

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
      cat labels.json | translate-json -l ru
