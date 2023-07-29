module.exports = {
  extends: ['stylelint-config-standard-scss', 'stylelint-config-recess-order'],
  overrides: [
    {
      files: ['*.astro', '**/*.astro'],

      // `*.astro` では postcss-html を指定しないとシンタックスエラーになってしまう
      customSyntax: 'postcss-html',

      rules: {
        // 次の擬似クラスの使用を許可
        // :global()
        'selector-pseudo-class-no-unknown': [
          true,
          {
            ignorePseudoClasses: ['global'],
          },
        ],
      },
    },
  ],
}
