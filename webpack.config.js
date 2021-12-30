const path = require("path")

module.exports = {
    mode: "none",
    entry: "./src/main.js",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "public"),
    },
}
