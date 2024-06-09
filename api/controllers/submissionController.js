const { executeCode } = require("../../services/executionService");

exports.submitCode = async (req, res) => {
  try {
    const { code, language } = req.body;
    const result = await executeCode(code, language);
    res.json({ result });
  } catch (error) {
    console.error("Error executing code:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
