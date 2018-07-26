module.exports = {
    'env': {
        'browser': true,
        'es6': true,
        'node': true,
        "jasmine": true,
        "commonjs": true
    },
    'extends': 'eslint:recommended',
    'parserOptions': {
        'ecmaVersion': 2017,
        'sourceType': 'module'
    },
    'rules': {
      'func-call-spacing': [
          'error',
          'never'
        ],
        'indent': [
            'error',
            'tab'
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'always'
        ],
        'brace-style': [
          'error',
          'stroustrup', {
            'allowSingleLine': true
          }
        ],
        'no-undef': 'off',
        'no-unused-vars': 'off'
    }
};
