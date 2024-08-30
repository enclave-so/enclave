import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import tseslint from 'typescript-eslint'
import react from 'eslint-plugin-react'
import prettier from 'eslint-plugin-prettier'
import sortImports from 'eslint-plugin-sort-imports-es6-autofix'
import importPlugin from 'eslint-plugin-import'
import noRelativeImports from 'eslint-plugin-no-relative-import-paths'

export default tseslint.config(
  {
    ignores: [
      'dist',
      'postcss.config.cts',
      'vite.config.ts',
      'tailwind.config.js',
      'site/**',
      'sdk/**',
      'extension/**',
    ],
  },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2021,
      globals: globals.browser,
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      prettier,
      'sort-imports-es6-autofix': sortImports,
      import: importPlugin,
      'no-relative-import-paths': noRelativeImports,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      // Base ESLint recommended rules
      'no-unused-vars': 'warn',
      'no-console': 'warn',

      // TypeScript ESLint recommended rules
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',

      // React plugin rules
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',

      // Additional custom rules
      'no-relative-import-paths/no-relative-import-paths': [
        'error',
        {
          allowSameFolder: false,
        },
      ],
      // '@typescript-eslint/no-floating-promises': 'error',
      'require-await': 'error',
      'react-hooks/exhaustive-deps': 'error',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'prettier/prettier': [
        'error',
        {
          trailingComma: 'es5',
          tabWidth: 2,
          semi: false,
          singleQuote: true,
          endOfLine: 'auto',
        },
      ],
      'sort-imports-es6-autofix/sort-imports-es6': [
        2,
        {
          ignoreCase: false,
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
        },
      ],
      'import/prefer-default-export': 'error',
    },
  }
)
