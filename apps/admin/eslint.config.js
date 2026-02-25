import rootConfig from "../../eslint.config.js";

export default [
  ...rootConfig,
  // 如果 admin 项目有特殊的规则，写在这里覆盖即可
  {
    rules: {
      "no-console": "off" // 比如后台系统允许 console
    }
  }
];