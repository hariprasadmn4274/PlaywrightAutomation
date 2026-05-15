module.exports = {
  default: {
    require: ['features/step_definations/*.ts'],//path of steps that need to be given here
    requireModule: ["ts-node/register"],
    format: ["@cucumber/pretty-formatter"],
    paths: ['features/*.feature'],//path of features
    publishQuiet: true
  }
};
