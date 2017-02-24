translate-json
=====

[![Build Status](https://travis-ci.org/TheFuzzball/translate-json.svg?branch=master)](https://travis-ci.org/TheFuzzball/translate-json)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/26ac757ea8cd4e64952b6527b3180c91)](https://www.codacy.com/app/app42740794/translate-json?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=TheFuzzball/translate-json&amp;utm_campaign=Badge_Grade)
[![Codacy Badge](https://api.codacy.com/project/badge/Coverage/26ac757ea8cd4e64952b6527b3180c91)](https://www.codacy.com/app/app42740794/translate-json?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=TheFuzzball/translate-json&amp;utm_campaign=Badge_Coverage)
[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](http://standardjs.com/)

## Install

    npm i -g translate-json

## Usage

    Usage: translate-json -l [language-code] [input] [output]

    --input, -i, [last parameter] :: The JSON document to translate. 
    --output, -o :: Destination to write the translated JSON document.
    --language, --lang, -l :: The language to convert the document to. e.g. ru, ar, fr, etc.
    --concurrency, -c :: Number of fields to translate simultaneously. (Default is 30)
    --exclude, --e :: Regular expression to exclude key paths. e.g. '^(notThis|this|not.this.either)$'
    --dryRun, --dry, -d :: Do not actually translate any values, prefix strings with 'zz_' to mark them.
    --translator, -t :: The translation service to use. google, or yandex. (Default is google)
    --apiKey, --key, -k :: The API key to be used with the translation service. (Not needed for google.)
    --preserveHtmlEntities, --preserve, -p :: Preserve HTML entities in translated text. (Off by default.)
    --help, -h :: This help message
    --version, -v :: The program versionn

**Note**: Google is the default translator, and an API key is not needed for it.

## Examples

> `translate-json -l fr ./labels-en.json labels-fr.json`

Do not translate all options and settings fields in the document.

> `translate-json --verbose -l nl --exclude '(^(options|settings)\..+$)' ./src.json ./homepage-nl.json`
