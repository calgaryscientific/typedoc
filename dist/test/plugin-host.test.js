"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const Assert = require("assert");
const mockery = require("mockery");
const path = require("path");
describe("PluginHost", function () {
    before(function () {
        mockery.enable({
            warnOnReplace: false,
            warnOnUnregistered: false,
        });
        mockery.registerMock("typedoc-plugin-1", () => {
            // nop
        });
        mockery.registerMock("typedoc-plugin-2", () => {
            // nop
        });
    });
    after(function () {
        mockery.disable();
    });
    it("parses plugins correctly", function () {
        const app = new __1.Application();
        app.bootstrap({
            plugin: ["typedoc-plugin-1", "typedoc-plugin-2"],
        });
        Assert.deepEqual(app.plugins.plugins, [
            "typedoc-plugin-1",
            "typedoc-plugin-2",
        ]);
    });
    it("loads a plugin with relative path", function () {
        const app = new __1.Application();
        app.bootstrap({
            plugin: ["./dist/test/plugins/relative"],
        });
        Assert.deepEqual(app.plugins.plugins, ["./dist/test/plugins/relative"]);
    });
    it("loads a plugin with absolute path", function () {
        const app = new __1.Application();
        const absolutePath = path.resolve(__dirname, "./plugins/absolute");
        app.bootstrap({
            plugin: [absolutePath],
        });
        Assert.deepEqual(app.plugins.plugins, [absolutePath]);
    });
});
//# sourceMappingURL=plugin-host.test.js.map