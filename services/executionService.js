const { executeCodeInDocker } = require("./dockerService");

const executeCode = async (code, language) => {
  try {
    return await executeCodeInDocker(code, language);
  } catch (error) {
    console.error("Error executing code:", error);
    throw new Error("Internal server error");
  }
};

module.exports = {
  executeCode,
};
