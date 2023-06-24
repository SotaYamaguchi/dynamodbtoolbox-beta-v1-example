module.exports = {
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/typescript',
    'plugin:unicorn/recommended',
    'prettier',
  ],
  overrides: [
    {
      extends: ['plugin:jest/recommended', 'plugin:jest/style'],
      files: ['*.test.ts'],
      plugins: ['jest'],
      rules: {
        'jest/no-commented-out-tests': 'off',
      },
    },
    {
      files: ['index.ts','index.mock.ts'],
      plugins: ['sort-exports'],
      rules: {
        "sort-exports/sort-exports": ["error", {"sortDir": "asc"}],
      }
    },
  ],
  plugins: [
    'jest',
    'import',
    'unused-imports',
    'sort-keys-fix',
    'sort-destructure-keys',
    'typescript-sort-keys',
    'testing-library',
    'unicorn',
  ],
  rules: {
    '@typescript-eslint/consistent-type-imports': 'error',
'@typescript-eslint/explicit-function-return-type': [
      'error',
      {
        allowExpressions: true,
      },
    ], 
'@typescript-eslint/no-unused-vars': 'error',   
'import/no-cycle': 'error',
'import/no-relative-parent-imports': 'off',
'import/order': [
      'error',
      {
        alphabetize: {
          order: 'asc',
        },
        groups: ['builtin', 'external', 'parent', 'sibling', 'index', 'object', 'type'],
        'newlines-between': 'never',
      },
    ],
    

'no-console': 'error',
    
// オブジェクトリターンのソート
'sort-destructure-keys/sort-destructure-keys': 'error',
    
'sort-keys-fix/sort-keys-fix': 'error',
    // オブジェクト引数のソート
'typescript-sort-keys/interface': ['error', 'asc', { natural: true }],
    'typescript-sort-keys/string-enum': ['error', 'asc', { natural: true }],
    'unicorn/filename-case': 'off',
    'unicorn/no-null': 'off',
    'unicorn/prevent-abbreviations': 'off',
    'unused-imports/no-unused-imports': 'error',
  },
  settings: {
    'import/resolver': {
      typescript: {
        // alwaysTryTypes: true,
        project: 'tsconfig.json',
      },
    },
  },
}
