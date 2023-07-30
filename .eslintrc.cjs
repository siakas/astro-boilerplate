module.exports = {
  env: {
    node: true,
    es2022: true,
    browser: true,
  },
  extends: ['plugin:astro/recommended', 'react-app', 'prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['import', 'unused-imports'],
  overrides: [
    {
      files: ['*.astro'],
      parser: 'astro-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro'],
      },
    },
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        // コンポーネントの props に型チェックをおこなうための propTypes プロパティの定義を強制するルール
        // TypeScript の場合は不要なので、ファイル拡張子が `.tsx` の場合に無効化するよう設定を上書き
        'react/prop-types': 'off',

        // JSX における不明な属性値に対するルール
        // ここでは Emotion で利用する `css` 属性を許容するよう設定
        'react/no-unknown-property': [
          'error',
          {
            ignore: ['css'],
          },
        ],
      },
    },
  ],
  rules: {
    // 任意の構文の間に空行を入れるかどうかの定義
    // ここでは return 文の前に空行を入れるが、一行の const 宣言の直後に限って空行なしを許容する設定としている
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        prev: '*',
        next: 'return',
      },
      {
        blankLine: 'any',
        prev: 'singleline-const',
        next: 'return',
      },
    ],

    // 型情報のみの import を import type に強制するルール
    // デフォルトでは import { type ... } の書式になっているので、
    // import type { ... } の書式に変更
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        fixStyle: 'separate-type-imports',
      },
    ],

    // オブジェクトの型定義にインターフェースまたは型エイリアスのどちらかを強制するルール
    // eslint-config-standard-with-typescript がインターフェースを強制しているのを無効化
    '@typescript-eslint/consistent-type-definitions': 'off',

    // 関数の戻り値に必ず型定義を書かなければいけないルール
    // eslint-config-standard-with-typescript が全面採用しているが厳しすぎるため、
    // その適用がエクスポートされる関数に限られる @typescript-eslint/explicit-module-boundary-types に入れ替え
    // 追記：
    // @typescript-eslint/explicit-module-boundary-types の方も有効化するメリットがないという意見もあるので error から off に変更
    // 参考：
    // https://twitter.com/fiahfy/status/1521724999953879040
    // https://github.com/typescript-eslint/typescript-eslint/issues/3746
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',

    // Promise の誤用を防ぐためのルール
    // 何も返さない async 関数のコールに明示的に void キーワードをつけることを強制され、
    // かつ、コンポーネントのイベント属性に async 関数を渡す際に、
    // (e): void => { handleSubmit(e) } のような煩雑な記述を強いられるのを部分的に無効化
    '@typescript-eslint/no-misused-promises': [
      'error',
      {
        checksVoidReturn: false,
      },
    ],

    // 本ルールについての説明、補足を追加すること
    // `${process.env.REACT_APP_REST_URL}/tasks/` のような記述に対するエラーを無効化している
    '@typescript-eslint/restrict-template-expressions': 'off',

    // 使用していないインポートを自動削除するルール
    // 本プラグインとコンフリクトを起こす no-unused-vars の設定を無効化し、
    // 変数および引数の名前の頭に `_` をつけた場合のみ許可する設定をこちらでおこなっている
    '@typescript-eslint/no-unused-vars': 'off', // or 'no-unused-vars': 'off'
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],

    // Boolean 値が期待される記述で、Boolean 型以外の使用を許可しないルール
    // リスクを理解したうえでルールを無効化
    // 問題が多く見られるようならルールを再適用する
    '@typescript-eslint/strict-boolean-expressions': 'off',
    // '@typescript-eslint/strict-boolean-expressions': [
    //   'error',
    //   {
    //     allowString: true,
    //     allowNumber: true,
    //     allowNullableObject: true,
    //   },
    // ],

    // トリプルスラッシュ・ディレクティブの使用を許可するかどうかを定義するルール
    // ここでは eslint-config-standard-with-typescript が一律禁止にしているのを、type 属性に限り許可するように設定
    '@typescript-eslint/triple-slash-reference': [
      'error',
      {
        types: 'always',
      },
    ],

    // autoFocus 属性の使用を禁止するルール
    // autoFocus 属性の使用はユーザビリティを損なうため禁止は妥当なのだが、
    // デフォルトで有効化されてるフレームワーク等に対して値を false にしたい場合でもエラーになってしまうので判定を無効化
    'jsx-a11y/no-autofocus': 'off',

    // インポートの際のファイル拡張子を記述するかを定義するルール
    // ここでは npm パッケージ以外のファイルについて、`.js`、`.jsx`、`.ts`、`.tsx` のみ拡張子を省略し、
    // それ以外のファイルは拡張子を記述させるように設定
    // `.astro` は拡張子を明示するように指定
    'import/extensions': [
      'error',
      {
        ignorePackages: true,
        pattern: {
          js: 'never',
          jsx: 'never',
          ts: 'never',
          tsx: 'never',
          astro: 'always',
        },
      },
    ],

    // 最後のインポート文のあとは空行を入れるよう設定
    'import/newline-after-import': 'error',

    // モジュールインポートの順番をカスタマイズ
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling'],
          'object',
          'type',
          'index',
        ],
        pathGroups: [
          // react, react-dom から読み込むファイルは最上段に配置
          {
            pattern: '{react,react-dom/**}',
            group: 'builtin',
            position: 'before',
          },
          // @/ からインポートするファイルをグルーピング
          {
            pattern: '{@/**}',
            group: 'internal',
            position: 'before',
          },
          // 非相対パスで記述した内部モジュールのコンポーネントを相対パスモジュールの直前に配置
          {
            pattern: '{[A-Z]*,**/[A-Z]*}',
            group: 'internal',
            position: 'after',
          },
          // @@/ からインポートするファイルを一番最後に配置
          {
            pattern: '@@/**',
            group: 'index',
            position: 'after',
          },
        ],
        'newlines-between': 'never',
        pathGroupsExcludedImportTypes: ['builtin'],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],

    // displayName コンポーネントのプロパティで、デバッグメッセージでコンポーネントを明示するのに使用
    // これがなくてもほとんどの場合はコンポーネントを特定できるため無効化
    'react/display-name': 'off',

    // React 17 以降で eslint-plugin-react を使用している場合のための設定
    // 下記を無効化することで不要なエラーを回避
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',

    // Boolean 変数の受け渡しには JSX の省略形を使用する
    // 追記：true を明示的に記述しないと正しく動作しないライブラリもあるので
    // 'react/jsx-boolean-value': 'error',

    // 文字列の属性値に波括弧は不要
    'react/jsx-curly-brace-presence': 'error',

    // 子要素のないコンポーネントは自己終了タグを使う
    // HTML タグは除外している
    'react/self-closing-comp': [
      'error',
      {
        component: true,
        html: false,
      },
    ],

    // React Hook における依存関係を示す第二引数の内容を明示させるルール
    // 第二引数に空配列を指定したい場合にも警告が出てしまうので無効化
    'react-hooks/exhaustive-deps': 'off',
  },
}
