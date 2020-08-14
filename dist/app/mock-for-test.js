"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Maybe_1 = require("./models/Maybe");
/**
 * Creates a mock implementation of IConfigurationProvider, using the specified config data.
 * @param configs The data to use.
 */
function createMockConfigProvider(configs) {
    return new MockConfigurationProvider(configs);
}
exports.createMockConfigProvider = createMockConfigProvider;
class MockConfigurationProvider {
    constructor(_config) {
        this._config = _config;
        this.name = 'MockConfigurationProvider';
        this.enableRemote = false;
        this.enableCors = false;
        this.init = () => Promise.resolve();
        this.deadLetter = () => Promise.resolve();
        this.dispose = () => Promise.resolve();
        this.onUpdate = (listener) => { };
        this.fetch = () => Promise.resolve(true);
        // Empty
    }
    get(key) {
        return this._config.hasOwnProperty(key) ? Maybe_1.Maybe.Just(this._config[key]) : Maybe_1.Maybe.Nothing();
    }
}
//# sourceMappingURL=mock-for-test.js.map