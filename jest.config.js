module.exports = {
  roots: [
    "test/",
    "src/"
  ],
  setupFiles: [
    "<rootDir>/test/enzymeSetup.js"
  ],
  moduleDirectories: [
    "node_modules",
    "src",
    "test"
  ],
  moduleNameMapper: {
    // mock image and style imports
    "\\.(jpe?g|png)$": "<rootDir>/test/client/fixtures/assetMock.js",
    "\\.(css|less)$": "<rootDir>/test/client/fixtures/assetMock.js",
    "^App(.*)$": "<rootDir>/src/client/app$1",
    "^Assets(.*)$": "<rootDir>/src/client/public$1"
  }
}