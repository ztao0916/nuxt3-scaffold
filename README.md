#  Nuxt3脚手架

## 初始化

`node`版本: 18.16.0

`pnpm` 版本: 9.5.0

```plain
pnpm dlx nuxi@latest init nuxt3-scaffold  //创建新项目

pnpm install //安装依赖

pnpm run dev --port=3100 -o //在3100端口启动并自动打开浏览器地址
```
## 规范化提交

在一个项目中代码检查、统一代码风格肯定是不能少的

大多数情况下都是定式,一次编写,次次受益,不需要花太多时间去整理研究

### eslint

安装依赖,官方提供的`eslint`模块:[传送门](https://eslint.nuxt.com/packages/module)

```plain
pnpm add -D @nuxt/eslint eslint //eslint
pnpm add -D prettier eslint-config-prettier eslint-plugin-prettier //prettier
```
在`nuxt.config.ts`中引入模块

```plain
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint'
  ],
  eslint: {
    // options here
  }
})
```

安装依赖完成后,在根目录下创建文件`eslint.config.cjs`,配置规则如下:

```plain
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended', // 使用推荐的eslint
    'plugin:vue/vue3-recommended', // 使用插件支持vue3
    'plugin:prettier/recommended',
    'eslint-config-prettier'
  ],
  // eslint-plugin-vue
  plugins: [
    'vue', // 引入vue的插件 vue <==> eslint-plugin-vue
    'prettier' // 引入规范插件  prettier <==>  eslint-plugin-prettier
  ],
  rules: {
    'no-console': 'off', // allow console.log in TypeScript files
    '@typescript-eslint/no-unused-vars': 'off', // allow unused variables in TypeScript files
    //缩进2个空格
    indent: ['error', 2],
    'no-debugger': 'off', //关闭debugger校验
    'no-unused-vars': 'error', //警告已声明变量,未读取校验,不报错了
    'spaced-comment': ['error', 'always'], // 注释必须空格
    'prettier/prettier': [
      //解决和prettier冲突的问题
      'error',
      {
        singleQuote: true, //强制单引号
        semi: true, //去掉结尾的分号
        vueIndentScriptAndStyle: true, //vue中的script和css缩进
        tabWidth: 2, //缩进2
        endOfLine: 'lf', //换行符使用lf
        arrowParens: 'always', //箭头函数参数始终带括号
        trailingComma: 'none' //结尾不加逗号
      }
    ]
  }
};
```

在`package.json`中 增加脚本,运行`**npm run lint**`命令检查代码风格是否正确或运行`**npm run lint:fix**`自动修复问题

```plain
"lint": "eslint .",
"lint:fix": "eslint . --fix"
```



### 样式规范

一般都是使用`stylelint`来作为`css`规范,但是没发现有哪些特别的好处,暂时不考虑接入

使用`tailwindcss`作为样式库,使用`css预处理器sass`编写样式

`tailwindcss`模块官网: [传送门](https://tailwindcss.nuxtjs.org/)

```plain
pnpm i -D @nuxtjs/tailwindcss tailwindcss
```

然后在`nuxt.config.ts`文件的`modules`中引入`@nuxtjs/tailwindcss`,至此就可以使用`tailwindcss`了

安装`sass`依赖

```plain
pnpm add sass -D
```

新建`assets/css/common.scss`文件,在里面新增一个`css`类名,然后在`pages/index.vue`中引入即可

```plain
@import "~/assets/css/common.scss";
```

### Git提交验证

需要使用到`husky`, `lint-stage`, `commitlint`等依赖包

#### husky

```plain
pnpm add husky -D //安装依赖
pnpm exec husky init //执行后会在根目录生成一个.husky文件夹
```

#### lint-staged

```plain
pnpm add lint-staged -D //安装依赖
```

在`package.json`的`scripts`添加脚本

```plain
"pre-commit": "lint-staged"
```

根目录下新建文件`.lintstagedrc`,内容如下

```plain
{
 "lint-staged": {
   "*.{js,jsx,vue,ts,tsx}": [
     "eslint --fix",
     "prettier --write"
   ]
 }
}
```

将`.husky/pre-commit`的脚本内容更改为

```plain
npm run pre-commit
```

配置完成后,当我们每次执行`git`命令的时候就会去检查暂存区的文件,有语法错误就会抛出

#### commitlint

```plain
pnpm add @commitlint/config-conventional @commitlint/cli -D //安装依赖
```

根目录下创建`commitlint.config.cjs`,写入内容

```plain
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      // type枚举
      2,
      'always',
      [
        'build', // 编译相关的修改，例如发布版本、对项目构建或者依赖的改动
        'feat', // 新功能
        'fix', // 修补bug
        'docs', // 文档修改
        'style', // 代码格式修改, 注意不是 css 修改
        'refactor', // 重构
        'perf', // 优化相关，比如提升性能、体验
        'test', // 测试用例修改
        'revert', // 代码回滚
        'ci', // 持续集成修改
        'config', // 配置修改
        'chore' // 其他改动
      ]
    ],
    'type-empty': [2, 'never'], // never: type不能为空; always: type必须为空
    'type-case': [0, 'always', 'lower-case'], // type必须小写，upper-case大写，camel-case小驼峰，kebab-case短横线，pascal-case大驼峰，等等
    'scope-empty': [0],
    'scope-case': [0],
    'subject-empty': [2, 'never'], // subject不能为空
    'subject-case': [0],
    'subject-full-stop': [0, 'never', '.'], // subject以.为结束标记
    'header-max-length': [2, 'always', 72], // header最长72
    'body-leading-blank': [0], // body换行
    'footer-leading-blank': [0, 'always'] // footer以空行开头
  }
};
```

向`package.json`的`scripts`中添加脚本

```plain
"commitlint": "commitlint --config commitlint.config.cjs -e -V" 
```

新增 `.husky/commit-msg`配置文件,加入配置即可

```plain
npm run commitlint
```

完成以后,每次提交的时候都会做代码规范校验

## 目录结构

基本的目录结构如下,大部分模块都是自动导入的

```typescript
📁 .nuxt // Nuxt在开发中使用.nuxt/目录来生成你的Vue应用程序。
📁 .output // 当构建你的应用程序用于生产时，Nuxt 会创建 .output/ 目录。
📁 assets // 用于添加所有将由构建工具处理的网站资产。
📁 components // 放置所有 Vue 组件的地方。
📁 composables // 将你的Vue组合式函数自动导入到你的应用程序中。
📁 content // 为你的应用创建一个基于文件的内容管理系统（CMS）。
📁 layouts // Nuxt 提供了一个布局框架，用于将常见的 UI 模式提取为可重用的布局。
📁 middleware // Nuxt 提供了中间件来在导航到特定路由之前运行代码。
📁 modules // 在应用程序中自动注册本地模块。
📁 node_modules // 包管理器会将项目的依赖存储在 node_modules/ 目录中。
📁 pages // Nuxt 提供了基于文件的路由功能，用于在你的 Web 应用中创建路由。
📁 plugins // Nuxt拥有一个插件系统，可以在创建Vue应用程序时使用Vue插件和其他功能。
📁 public // 用于提供网站的静态资源。
📁 server // 用于在应用程序中注册API和服务器处理程序。
📁 utils // 在整个应用程序中自动导入你的工具函数。
📄 .env // 用于指定构建和开发环境变量。
📄 .gitignore // 指定了Git应该忽略的故意未跟踪的文件。
📄 .nuxtignore // 允许 Nuxt 在构建阶段忽略项目根目录下的文件。
📄 app.vue // Nuxt 应用的主要组件，入口文件。
📄 app.config.ts // 使用App Config文件在应用程序中公开响应式配置。
📄 nuxt.config.ts // Nuxt可以通过一个单独的nuxt.config文件进行简单配置。
📄 package.json // 包含了应用程序的所有依赖项和脚本。
📄 tsconfig.json // Nuxt会根据你在Nuxt项目中使用的别名，以及其他合理的默认值，自动生成一个`.nuxt/tsconfig.json`文件。
```

## 组件库

### element-plus

主要使用它,配置文档: [传送门](https://github.com/element-plus/element-plus-nuxt#readme)

```plain
pnpm add element-plus @element-plus/nuxt -D //安装依赖


//添加模块-nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    '@element-plus/nuxt'
  ],
  elementPlus: { 
    icon: 'ElIcon',
    importStyle: 'scss',
  }
})
```

 至此,一个基本的通用脚手架结构就搭建完成了