module.exports = {
    parser: '@typescript-eslint/parser',
    env: {
        browser: true,
        es6: true,
    },
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'airbnb', 'prettier'],
    plugins: ['@typescript-eslint', 'prettier'],
    ignorePatterns: ["dist/", "build/", "__test__", "docs/"],
    rules: {
        'prettier/prettier': ['error'],
        'import/no-extraneous-dependencies': 0,
        'import/no-unresolved': 0,
        'import/no-relative-packages': 0,
        'no-unused-vars': [
            'warn',
            {
                argsIgnorePattern: '^_',
                varsIgnorePattern: '^_',
            },
        ],
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
            },
        },
    },
};
