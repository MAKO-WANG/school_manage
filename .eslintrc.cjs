'use strict';

module.exports = {
  'root': true,
  'env': {
    'es2021': true,
    'node': true,
    'browser': false,
  },
  'extends': [
    'plugin:@intlify/vue-i18n/recommended',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  'parser': 'vue-eslint-parser',
  'parserOptions': {
    'parser': '@typescript-eslint/parser',
    'ecmaVersion': 2020,
    'sourceType': 'module',
  },
  'plugins': ['vue', '@typescript-eslint', 'prettier'],
  'ignorePatterns': [
    'types/env.d.ts',
    'node_modules/**',
    '**/dist/**',
    './global.d.ts',
    'scripts/**/*.js',
    'packages/**/*.js',
  ],
  'rules': {
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/consistent-type-imports': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/no-duplicate-imports': ['error'],
    'eqeqeq': ['error', 'always'], // 强制三个等号判断
    'semi': ['error', 'always'], // 强制分号
    'lines-between-class-members': [
      'error',
      'always',
      { 'exceptAfterSingleLine': true },
    ], // 强制类的方法之间有空行
    'one-var': ['error', 'never'], // 禁止一次定义多个变量
    'curly': ['error', 'all'], // 一个块只包含一个语句不允许省略花括号
    'quotes': 'off', // 强制使用统一的引号
    'spaced-comment': 2, // 强制在注释中 // 或 /* 使用一致的空格
    'default-case': 2, // 要求 switch 语句中有 default 分支
    'no-eval': 2, // 禁用 eval()
    // 'no-duplicate-imports': 'error',
    'vue/comment-directive': 0, // 关闭只能在模板里面注释
    'vue/no-useless-template-attributes': 'error', // 禁止 template 标签传入无用属性
    'vue/script-setup-uses-vars': 'error', // 强制已声明但从未读取其值报错
    'vue/attribute-hyphenation': 'error', // 强制使用带连字符的属性名称
    'vue/component-tags-order': [
      'error',
      {
        'order': ['template', 'script', 'style'],
      },
    ], // 强制组件的标签顺序
    'vue/component-name-in-template-casing': [
      'error',
      'kebab-case',
      { 'registeredComponentsOnly': true },
    ], // 强制以 kebab-case 形式在模版内使用
    'vue/custom-event-name-casing': [
      'error',
      'camelCase',
      {
        'ignores': [],
      },
    ], // 强制自定义事件名称为 camelCase 格式
    'vue/attributes-order': [
      'error',
      {
        'order': [
          'DEFINITION',
          'LIST_RENDERING',
          'CONDITIONALS',
          'RENDER_MODIFIERS',
          'GLOBAL',
          ['UNIQUE', 'SLOT'],
          'TWO_WAY_BINDING',
          'OTHER_DIRECTIVES',
          'OTHER_ATTR',
          'EVENTS',
          'CONTENT',
        ],
        'alphabetical': false,
      },
    ], // 强制对组件属性进行排序
    'vue/max-len': [
      'error',
      {
        'code': 80,
        'template': 80,
        'tabWidth': 2,
        'comments': 80,
        'ignorePattern': '',
        'ignoreComments': true,
        'ignoreTrailingComments': true,
        'ignoreUrls': true,
        'ignoreStrings': true,
        'ignoreTemplateLiterals': true,
        'ignoreRegExpLiterals': true,
        'ignoreHTMLAttributeValues': false,
        'ignoreHTMLTextContents': true,
      },
    ], // 强制vue文件每一行的格式
    'vue/require-explicit-emits': [
      'error',
      {
        'allowProps': false,
      },
    ], // 强制不允许事件名定义在props
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'never',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      },
    ], // 强制自动关闭组件标志
    'vue/multi-word-component-names': 'off', // 不强制要求组件命名为多单词
    'vue/order-in-components': [
      'error',
      {
        'order': [
          'el',
          'name',
          'key',
          'parent',
          'functional',
          ['delimiters', 'comments'],
          ['components', 'directives', 'filters'],
          'extends',
          'mixins',
          ['provide', 'inject'],
          'ROUTER_GUARDS',
          'layout',
          'middleware',
          'validate',
          'scrollToTop',
          'transition',
          'loading',
          'inheritAttrs',
          'model',
          ['props', 'propsData'],
          'emits',
          'setup',
          'fetch',
          'asyncData',
          'data',
          'head',
          'computed',
          'watch',
          'watchQuery',
          'LIFECYCLE_HOOKS',
          'methods',
          ['template', 'render'],
          'renderError',
        ],
      },
    ], // 强制保持组件中属性的声明顺序,
  },
  'settings': {
    // 解决路径引用ts文件报错的问题
    'import/resolver': {
      'node': {
        'extensions': ['.js', '.jsx', '.ts', '.tsx', '.vue'],
      },
      // 解决tsconfig下的path别名导致eslint插件无法解决的bug
      'typescript': {
        'alwaysTryTypes': true,
      },
    },
  },
  'overrides': [
    {
      'files': ['*.json', '*.json5'],
      'parser': 'jsonc-eslint-parser',
    },
  ],
};
