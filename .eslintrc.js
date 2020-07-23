module.exports = {
    /*
 * @Descripttion: aiyoudiao
 * @version: 1.0.0
 * @Author: aiyoudiao
 * @Date: 2020-03-24 13:40:32
 * @LastEditTime: 2020-03-25 12:58:10
 * @LastEditors: aiyoudiao
 * @FilePath: \.eslintrc.js
 */
    root: true,
    env: {
        node: true,
    },
    extends: ['plugin:vue/essential', '@vue/airbnb'],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'array-element-newline': ['error', 'consistent'],
        indent: ['error', 4, { MemberExpression: 0, SwitchCase: 1 }],
        quotes: ['error', 'single'],
        'comma-dangle': ['error', 'always-multiline'],
        semi: ['error', 'never'],
        'object-curly-spacing': ['error', 'always'],
        'max-len': ['error', 140],
        'no-new': 'off',
        'linebreak-style': 'off',
        'import/extensions': 'off',
        'eol-last': 'off',
        'no-shadow': 'off',
        'no-unused-vars': 'warn',
        'import/no-cycle': 'off',
        'arrow-parens': 'off',
        eqeqeq: 'off',
        'vue/no-parsing-error': [2, { 'x-invalid-end-tag': false }],
        'no-param-reassign': 'off',
        'import/prefer-default-export': 'off',
        'no-use-before-define': 'off',
        'no-continue': 'off',
        'prefer-destructuring': 'off',
        'no-plusplus': 'off',
        'prefer-const': 'off',
        'global-require': 'off',
        'no-prototype-builtins': 'off',
        'consistent-return': 'off',
        'vue/require-component-is': 'off',
        'prefer-template': 'off',
        'one-var-declaration-per-line': 'off',
        'one-var': 'off',
        'import/named': 'off',
        'object-curly-newline': 'off',
        'default-case': 'off',
        'import/no-dynamic-require': 'off',
    },
    parserOptions: {
        parser: 'babel-eslint',
    },
    overrides: [
        {
            files: [
                '**/__tests__/*.{j,t}s?(x)',
                '**/tests/unit/**/*.spec.{j,t}s?(x)',
            ],
            env: {
                jest: true,
            },
        },
    ],
    plugins: ['vue'],
}
