const fs = require("fs");
const handlebars = require("handlebars");

async function HandlebarsMailTemplateProvider({ file, variables }) {
  const templateFileContent = await fs.promises.readFile(file, {
    encoding: "utf-8"
  });

  return {
    parse: () => {
      const parseTemplate = handlebars.compile(templateFileContent);
      return parseTemplate(variables);
    }
  };
}

module.exports = HandlebarsMailTemplateProvider;
