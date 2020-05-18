import { IProcessConfiguration } from "./IProcessConfiguration";
import { tryResolveCompiler } from "./tasks/tryResolveCompiler";
import { tryResolveConfig } from "./tasks/tryResolveConfig";
import { AspectRunContext } from "./AspectRunContext";
import { assertCompiler } from "./tasks/assertCompiler";
import { parseArgv } from "./tasks/parseArgv";
import { assertNoUnknown } from "./tasks/assertNoUnkown";
import { exit } from "./tasks/exit";
import { unexpectedError } from "./tasks/unexpectedError";
import { tryValidateConfig } from "./tasks/tryValidateConfig";
import { help } from "assemblyscript/cli/util/options";

export function asp(argv: string[], config: IProcessConfiguration): void {
  const context: AspectRunContext = {
    argv,
    process: config,
    files: [],
    exitCode: 0,
  };

  config.stdout.write(
    "as-pect cli v" + require("../package.json").version + "\n\n",
  );

  tryResolveCompiler(context)
    .then(tryResolveConfig)
    .then(tryValidateConfig)
    .then(assertCompiler)
    .then(parseArgv)
    .then(assertNoUnknown)
    .then((context) => {
      // parseArgv sets the parseResult property
      const result = context.parseResult!;
      const process = context.process;
      const options = result.options;

      if (options.help) {
        const helpText = help(require("./options").options);
        process.stdout.write(helpText + "\n");
      }
    })
    .catch((reason) => unexpectedError(reason, context))
    .finally(() => exit(context));
}
