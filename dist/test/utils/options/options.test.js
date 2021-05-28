"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../lib/utils");
const assert_1 = require("assert");
describe("Options", () => {
    const logger = new utils_1.Logger();
    const options = new utils_1.Options(logger);
    options.addDefaultDeclarations();
    options.addDeclaration({
        name: "mapped",
        type: utils_1.ParameterType.Map,
        map: { a: 1 },
        defaultValue: 2,
        help: "",
    });
    it("Errors on duplicate declarations", () => {
        logger.resetErrors();
        options.addDeclaration({
            name: "help",
            help: "",
            type: utils_1.ParameterType.Boolean,
        });
        assert_1.deepStrictEqual(logger.hasErrors(), true);
    });
    it("Does not throw if number declaration has no min and max values", () => {
        const declaration = {
            name: "test-number-declaration",
            help: "",
            type: utils_1.ParameterType.Number,
            defaultValue: 1,
        };
        options.addDeclaration(declaration);
        options.removeDeclarationByName(declaration.name);
    });
    it("Does not throw if default value is out of range for number declaration", () => {
        const declaration = {
            name: "test-number-declaration",
            help: "",
            type: utils_1.ParameterType.Number,
            minValue: 1,
            maxValue: 10,
            defaultValue: 0,
        };
        options.addDeclaration(declaration);
        options.removeDeclarationByName(declaration.name);
    });
    it("Does not throw if a map declaration has a default value that is not part of the map of possible values", () => {
        const declaration = {
            name: "testMapDeclarationWithForeignDefaultValue",
            help: "",
            type: utils_1.ParameterType.Map,
            map: new Map([
                ["a", 1],
                ["b", 2],
            ]),
            defaultValue: 0,
        };
        options.addDeclaration(declaration);
        options.removeDeclarationByName(declaration.name);
    });
    it("Supports removing a declaration by name", () => {
        options.addDeclaration({ name: "not-an-option", help: "" });
        options.removeDeclarationByName("not-an-option");
        assert_1.deepStrictEqual(options.getDeclaration("not-an-option"), undefined);
    });
    it("Ignores removal of non-existent declarations", () => {
        options.removeDeclarationByName("not-an-option");
        assert_1.deepStrictEqual(options.getDeclaration("not-an-option"), undefined);
    });
    it("Throws on attempt to get an undeclared option", () => {
        assert_1.throws(() => options.getValue("does-not-exist"));
    });
    it("Does not allow fetching compiler options through getValue", () => {
        assert_1.throws(() => options.getValue("target"));
    });
    it("Errors if converting a set value errors", () => {
        assert_1.throws(() => options.setValue("mapped", "nonsense"));
    });
    it("Supports directly getting values", () => {
        assert_1.deepStrictEqual(options.getRawValues().toc, []);
    });
    it("[Deprecated] Supports checking if a value is default", () => {
        options.setValue("excludePrivate", true);
        assert_1.deepStrictEqual(options.isDefault("excludePrivate"), false);
        assert_1.deepStrictEqual(options.isDefault("excludeProtected"), true);
    });
    it("Supports checking if an option is set", () => {
        const options = new utils_1.Options(new utils_1.Logger());
        options.addDefaultDeclarations();
        assert_1.deepStrictEqual(options.isSet("excludePrivate"), false);
        options.setValue("excludePrivate", false);
        assert_1.deepStrictEqual(options.isSet("excludePrivate"), true);
        options.reset();
        assert_1.deepStrictEqual(options.isSet("excludePrivate"), false);
        assert_1.throws(() => options.isSet("does not exist"));
    });
});
//# sourceMappingURL=options.test.js.map