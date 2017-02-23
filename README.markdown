translate-json
=====

# Install

    npm i -g json-translate

# Usage

    translate-json -l [language-code] -t [google|yandex] [input]

    --language, --lang, -l :: The language to convert the document to. e.g. ru, ar, fr, etc.
    --translator, -t :: The translation servie to use. "google", or "yandax".
    --apiKey, --key, -k :: The API key to be used with the translation service.
    --input, -i, [last parameter] :: The JSON document to translate. 
    --output, -o :: Destination to write the translated JSON document.
