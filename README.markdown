translate-json
=====

## Install

    npm i -g json-translate

## Usage

    Usage: translate-json -l [language-code] -t [google|yandex] [input]

    --language, --lang, -l :: The language to convert the document to. e.g. ru, ar, fr, etc.
    --translator, -t :: The translation servie to use. "google", or "yandex".
    --apiKey, --key, -k :: The API key to be used with the translation service.
    --exclude, --e :: Regular expression to exclude key paths. e.g. "^(notThis|this|not.this.either)$
    --input, -i, [last parameter] :: The JSON document to translate.
    --output, -o :: Destination to write the translated JSON document.
    --dryRun, --dry, -d :: Do not actually translate any values, prefix strings with 'zz_' to mark them.
    --help, -h :: This help message

**Note**: Google is the default translator, and an API key is not needed for it.

## Examples

> `translate-json -l fr ./labels-en.json > labels-fr.json`

Do not translate all options and settings fields in the document.

> `translate-json --verbose -l nl --exclude '(^(options|settings)\..+$)' ./src.json ./homepage-nl.json`
