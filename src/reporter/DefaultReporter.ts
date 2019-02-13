import { Reporter } from "./Reporter";
import { TestGroup } from "../test/TestGroup";
import { TestResult } from "../test/TestResult";
import { TestSuite } from "../test/TestSuite";
import chalk from "chalk";
export class DefaultReporter extends Reporter {
  onStart(suite: TestSuite): void {
    console.log("");
    console.log(chalk`[Log] Running: ${suite.filename}`);
    console.log("");
  }
  onGroupStart(group: TestGroup): void {
    console.log(chalk`[Describe]: ${group.name}`);
    console.log("");
  }
  onGroupFinish(group: TestGroup): void {
    const result = group.pass
      ? chalk`{green ✔ PASS}`
      : chalk`{red ✖ FAIL}`;

    console.log("");
    console.log(chalk`  [Result]: ${result}`);
    console.log(chalk`   [Tests]: ${group.success.toString()} pass, ${group.fail.toString()} fail, ${group.total.toString()} total`);
    console.log(chalk`    [Time]: ${group.time.toString()}ms`);
  }
  onTestStart(_group: TestGroup, _test: TestResult): void {}
  onTestFinish(_group: TestGroup, test: TestResult): void {
    if (test.pass) {
      console.log(chalk`  {green [Success] ✔} ${test.description}`);
    } else {
      console.log("");
      console.log(chalk`     {red [Fail] ✖} ${test.description}`);
      console.log("");
      console.log(chalk`   [Actual]: {red ${test.actual}}`);
      console.log(chalk` [Expected]: {green ${test.expected}}`)
    }
  }
  onFinish(suite: TestSuite): void {
    const result = suite.passed
      ? chalk`{green ✔ Pass} `
      : chalk`{red ✖ Fail}`;

    console.log("");
    console.log(chalk`    [File]: ${suite.filename}`);
    console.log(chalk`  [Result]: ${result}`);
    console.log(chalk` [Summary]: ${suite.success.toString()} pass, ${suite.fail.toString()} fail, ${suite.total.toString()} total`);
    console.log(chalk`    [Time]: ${suite.time.toString()}ms`);
    console.log("");
  }
}