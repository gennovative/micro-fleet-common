"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const joi = require("@hapi/joi");
const JoiModelValidator_1 = require("./JoiModelValidator");
const ObjectUtil_1 = require("../utils/ObjectUtil");
const VALIDATE_META = Symbol();
function createClassValidationMetadata() {
    return {
        schemaMapId: {},
        schemaMapModel: {},
        props: {},
        idProps: new Set(),
    };
}
function getClassValidationMetadata(Class) {
    return Reflect.getMetadata(VALIDATE_META, Class) || createClassValidationMetadata();
}
exports.getClassValidationMetadata = getClassValidationMetadata;
function setClassValidationMetadata(Class, meta) {
    Reflect.defineMetadata(VALIDATE_META, meta, Class);
}
exports.setClassValidationMetadata = setClassValidationMetadata;
function deleteClassValidationMetadata(Class) {
    Reflect.deleteMetadata(VALIDATE_META, Class);
}
exports.deleteClassValidationMetadata = deleteClassValidationMetadata;
function getPropValidationMetadata(Class, propName) {
    return getClassValidationMetadata(Class).props[propName] || {
        type: () => joi.string(),
        rules: [],
    };
}
exports.getPropValidationMetadata = getPropValidationMetadata;
function setPropValidationMetadata(Class, propName, meta) {
    const classMeta = getClassValidationMetadata(Class);
    classMeta.props[propName] = meta;
    setClassValidationMetadata(Class, classMeta);
}
exports.setPropValidationMetadata = setPropValidationMetadata;
function createJoiValidator(Class) {
    const classMeta = getClassValidationMetadata(Class);
    const [schemaMapId, schemaMapModel] = buildSchemaMapModel(classMeta);
    if (ObjectUtil_1.isEmpty(schemaMapId) && ObjectUtil_1.isEmpty(schemaMapModel)) {
        return null;
    }
    const validator = new JoiModelValidator_1.JoiModelValidator({
        schemaMapModel,
        schemaMapId,
        joiOptions: classMeta.joiOptions,
    });
    // Clean up
    deleteClassValidationMetadata(Class);
    return validator;
}
exports.createJoiValidator = createJoiValidator;
function buildSchemaMapModel(classMeta) {
    // Property decorators can override class schema maps
    // tslint:disable-next-line:prefer-const
    for (let [prop, meta] of Object.entries(classMeta.props)) {
        const propSchema = buildPropSchema(meta);
        if (classMeta.idProps.has(prop)) {
            classMeta.schemaMapId[prop] = propSchema;
        }
        else {
            classMeta.schemaMapModel[prop] = propSchema;
        }
    }
    return [classMeta.schemaMapId, classMeta.schemaMapModel];
}
function buildPropSchema(propMeta) {
    return Boolean(propMeta.rawSchema)
        ? propMeta.rawSchema
        : propMeta.rules.reduce((prev, curRule) => curRule(prev), propMeta.type());
}
//# sourceMappingURL=validate-internal.js.map