"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("assert");
const Path = require("path");
const td = require("..");
const utils_1 = require("../lib/utils");
const package_manifest_1 = require("../lib/utils/package-manifest");
describe("Packages support", () => {
    it("handles monorepos", () => {
        const base = Path.join(__dirname, "packages", "ts-monorepo");
        const app = new td.Application();
        app.options.addReader(new td.TypeDocReader());
        app.bootstrap({
            options: Path.join(base, "typedoc.json"),
        });
        const project = app.convert();
        assert_1.ok(project, "Failed to convert");
        const result = app.serializer.projectToObject(project);
        assert_1.ok(result.children !== undefined);
        assert_1.strictEqual(result.children.length, 4, "incorrect number of packages processed");
    });
    it("handles single packages", () => {
        const base = Path.join(__dirname, "packages", "typedoc-single-package-example");
        const app = new td.Application();
        app.options.addReader(new td.TypeDocReader());
        app.bootstrap({
            options: Path.join(base, "typedoc.json"),
        });
        const project = app.convert();
        assert_1.ok(project, "Failed to convert");
        const result = app.serializer.projectToObject(project);
        assert_1.ok(result.children !== undefined);
        assert_1.strictEqual(result.children.length, 1, "incorrect number of packages processed");
    });
    describe("expandPackages", () => {
        it("handles a glob", () => {
            const base = Path.join(__dirname, "packages", "ts-monorepo");
            const expandedPackages = package_manifest_1.expandPackages(new utils_1.Logger(), base, [
                "packages/*",
            ]);
            assert_1.strictEqual(expandedPackages.length, 3, "Found an unexpected number of packages");
        });
    });
});
//# sourceMappingURL=packages.test.js.map