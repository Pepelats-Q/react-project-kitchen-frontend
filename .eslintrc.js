module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'prettier',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:import/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:react-hooks/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  overrides: [
    {
      files: ['*.jsx', '*.js'],
    },
  ],
  plugins: ['react', 'prettier', '@typescript-eslint'],
  rules: {
    'no-param-reassign': 'warn',
    'consistent-return': 'warn',
    'jsx-a11y/no-static-element-interactions': 'warn',
    'jsx-a11y/click-events-have-key-events': 'warn',
    'jsx-a11y/no-noninteractive-element-interactions': 'warn',
    'default-param-last': 'warn',
    'prefer-destructuring': 'warn',
    'linebreak-style': 'off',

    // React
    'react/require-default-props': 'off', // предлагаю дефолты прописывать в объявлении
    'react/forbid-prop-types': 'warn',
    'react/prop-types': 'warn',
    'react/no-multi-comp': ['error', { ignoreStateless: true }],
    'react/no-set-state': 'warn',
    'react/no-string-refs': 'error',
    'react/prefer-es6-class': 'error',
    'react/prefer-stateless-function': 'error',
    'react/require-render-return': 'error',
    'react/self-closing-comp': 'error',
    'react/sort-comp': 'warn',
    'react/destructuring-assignment': 'warn',
    'react/sort-prop-types': 'warn',
    'react/function-component-definition': ['warn', { namedComponents: 'arrow-function' }], // пишем в виде стрелочных функций
    'react-hooks/exhaustive-deps': 'off', // На useEffect без зависимостей ругается.

    // JSX
    'react/jsx-boolean-value': 'warn', // тут с error на warn
    'react/jsx-closing-bracket-location': 'error',
    'react/jsx-equals-spacing': 'error',
    'react/jsx-first-prop-new-line': 'error',
    'react/jsx-filename-extension': 'warn',
    'react/jsx-handler-names': 'warn',
    'react/jsx-indent-props': ['error', 2],
    'react/jsx-indent': ['error', 2],
    'react/jsx-key': 'error',
    'react/jsx-max-props-per-line': 'off', // нет необходимости в ограничении количества, так как есть ограничение по ширине строк
    'react/jsx-no-bind': 'warn', // тут с error на warn
    'react/jsx-no-literals': 'off', // мы используем строки в коде
    'react/jsx-no-target-blank': 'error',
    'react/jsx-pascal-case': 'error',
    'react/jsx-sort-props': 'warn',
    'react/jsx-space-before-closing': 'error',

    // переменные
    camelcase: 'warn', // переменные в css - по БЭМ с нижн. подчеркиванием. Но линт ругается. поэтому поставила warn
    'jsx-a11y/label-has-associated-control': 'warn',
  },
};
