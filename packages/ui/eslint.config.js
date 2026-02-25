import rootConfig from "../../eslint.config.js";

export default [
  ...rootConfig,
  {
    name: "repo/ui-local",
    files: ["**/*.{ts,tsx}"],
    rules: {
      // 可以在这里针对 UI 包添加特殊规则
    }
  }
];