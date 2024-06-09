const { exec } = require("child_process");
const fs = require("fs");
const { promisify } = require("util");
const languageMap = require("../utils/languageMap");

const executeCodeInDocker = async (code, language) => {
  const languageConfig = languageMap[language.toLowerCase()];

  if (!languageConfig) {
    throw new Error(`Language ${language} not supported`);
  }

  const { extension, image, command } = languageConfig;
  const writeFileAsync = promisify(fs.writeFile);
  const mkdirAsync = promisify(fs.mkdir);
  const execAsync = promisify(exec);
  const tempDir = `./temp/${Date.now()}`;
  const filePath = `${tempDir}/code.${extension}`;

  try {
    await mkdirAsync(tempDir, { recursive: true });

    await writeFileAsync(filePath, code);

    const containerName = `code-executor-${Date.now()}`;
    const { stdout, stderr } = await execAsync(`
      docker run --rm --name ${containerName} --network none --cap-drop all --read-only -v ${process.cwd()}/${tempDir}:/usr/src/app -w /usr/src/app ${image} ${command}
    `);

    await execAsync(`rm -rf ${tempDir}`);

    return stdout.trim();
  } catch (error) {
    await execAsync(`rm -rf ${tempDir}`);
    if (error.stderr) {
      return { error: error.stderr };
    } else {
      return { error: error.message };
    }
  }
};

module.exports = {
  executeCodeInDocker,
};
