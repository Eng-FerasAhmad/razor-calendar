module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    settings: {
        react: {
            version: 'detect',
        },
        'import/resolver': {
            typescript: {},
        },
    },
    extends: [
        'airbnb-base',
        'plugin:react-hooks/recommended',
        'plugin:react/recommended',
        'plugin:prettier/recommended',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['./tsconfig.json', './tsconfig.node.json'],
        tsconfigRootDir: __dirname,
    },
    plugins: ['react-refresh', 'react', 'react-hooks', '@typescript-eslint'],
    rules: {
        'react-refresh/only-export-components': [
            'warn',
            { allowConstantExport: true },
        ],
        'react/react-in-jsx-scope': 'off',
        'prettier/prettier': [
            'error',
            {
                singleQuote: true,
            },
        ],
        'import/extensions': [
            'error',
            'ignorePackages',
            {
                ts: 'never',
                tsx: 'never',
            },
        ],
        'no-param-reassign': [
            'error',
            {
                ignorePropertyModificationsFor: ['state'],
            },
        ],
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': ['error'],
        '@typescript-eslint/explicit-function-return-type': [
            'error',
            {
                allowExpressions: true,
            },
        ],
        'max-len': ['warn', { code: 80 }],
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
    },
    overrides: [
        {
            files: ['**/*.ts', '**/*.tsx'],
            parser: '@typescript-eslint/parser',
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
                project: ['./tsconfig.json', './tsconfig.node.json'],
                tsconfigRootDir: __dirname,
            },
            plugins: ['unused-imports'],
            extends: [
                'airbnb-typescript',
                'plugin:react/recommended',
                'plugin:react-hooks/recommended',
                'plugin:import/recommended',
                'plugin:import/typescript',
                'plugin:@typescript-eslint/recommended',
                'plugin:prettier/recommended',
            ],
            rules: {
                'react-refresh/only-export-components': [
                    'warn',
                    { allowConstantExport: true },
                ],
                'prettier/prettier': [
                    'error',
                    {
                        singleQuote: true,
                    },
                ],
                'react/react-in-jsx-scope': 'off',
                'import/prefer-default-export': 'off',
                'import/prefer-default-export': 'off',
                '@typescript-eslint/no-unsafe-assignment': 'off',
                'import/no-extraneous-dependencies': 'off',
                'import/prefer-default-export': 'off',
                'react-refresh/only-export-components': 'off',
                'import/order': [
                    'error',
                    {
                        groups: [
                            'builtin',
                            'external',
                            'parent',
                            'sibling',
                            'index',
                            'type',
                        ],
                        pathGroups: [
                            {
                                pattern: 'react',
                                group: 'external',
                                position: 'before',
                            },
                            {
                                pattern: 'globalStyle',
                                patternOptions: { matchBase: true },
                                group: 'sibling',
                                position: 'after',
                            },
                            {
                                pattern: 'style',
                                patternOptions: { matchBase: true },
                                group: 'sibling',
                                position: 'after',
                            },
                        ],
                        alphabetize: {
                            order: 'asc',
                            caseInsensitive: true,
                        },
                    },
                ],
            },
        },
    ],
};
