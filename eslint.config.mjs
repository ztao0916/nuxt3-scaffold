// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";
// Your custom configs here
export default withNuxt({
  rules: {
    "no-console": "off", // allow console.log in TypeScript files
    "@typescript-eslint/no-unused-vars": "off", // allow unused variables in TypeScript files
    //缩进2个空格
    indent: ["error", 2],
    "no-debugger": "off", //关闭debugger校验
    "no-unused-vars": "error", //警告已声明变量,未读取校验,不报错了
    "spaced-comment": ["error", "always"], // 注释必须空格
    "prettier/prettier": [
      //解决和prettier冲突的问题
      "error",
      {
        singleQuote: true, //强制单引号
        semi: true, //去掉结尾的分号
        vueIndentScriptAndStyle: true, //vue中的script和css缩进
        tabWidth: 2, //缩进2
        endOfLine: "lf", //换行符使用lf
        arrowParens: "always", //箭头函数参数始终带括号
        trailingComma: "none", //结尾不加逗号
      },
    ],
  },
});
