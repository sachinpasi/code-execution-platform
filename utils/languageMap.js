// languageMap.js

const languageMap = {
  javascript: {
    extension: "js",
    image: "node:latest",
    command: "node code.js",
  },
  python: {
    extension: "py",
    image: "python:latest",
    command: "python code.py",
  },
  ruby: { extension: "rb", image: "ruby:latest", command: "ruby code.rb" },
};

module.exports = languageMap;
