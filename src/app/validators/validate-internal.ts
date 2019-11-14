import * as joi from '@hapi/joi'
import cloneDeep = require('lodash.clonedeep')

import { JoiModelValidatorConstructorOptions } from './IModelValidator'
import { JoiModelValidator } from './JoiModelValidator'
import { isEmpty } from '../utils/ObjectUtil'


// This file is for internal use, do not export to (lib)user

export type PropValidationMetadata = {
    type?(): joi.AnySchema;
    rules?: Array<(prev: joi.AnySchema) => joi.AnySchema>,
    rawSchema?: joi.SchemaLike,
}

export type ClassValidationMetadata = JoiModelValidatorConstructorOptions & {
    idProps: Set<string | symbol>,
    props: {
        [key: string]: PropValidationMetadata,
    }
}

const VALIDATE_META = Symbol()

function createClassValidationMetadata(): ClassValidationMetadata {
    return {
        schemaMapId: {},
        schemaMapModel: {},
        props: {},
        idProps: new Set(),
    }
}

export function getClassValidationMetadata(Class: Function): ClassValidationMetadata {
    const ownMeta = Reflect.getOwnMetadata(VALIDATE_META, Class)
    if (ownMeta) {
        return ownMeta
    }

    const inheritMeta = Reflect.getMetadata(VALIDATE_META, Class)
    if (inheritMeta) {
        return cloneDeep(inheritMeta)
    }
    return createClassValidationMetadata()
}

export function setClassValidationMetadata(Class: Function, meta: ClassValidationMetadata): void {
    Reflect.defineMetadata(VALIDATE_META, meta, Class)
}

export function deleteClassValidationMetadata(Class: Function): void {
    Reflect.deleteMetadata(VALIDATE_META, Class)
}


// export function getPropValidationMetadata(Class: Function, propName: string | symbol): PropValidationMetadata {
//     return getClassValidationMetadata(Class).props[propName as string] || {
//         type: () => joi.string(),
//         rules: [],
//     }
// }

export function extractPropValidationMetadata(classMeta: ClassValidationMetadata, propName: string | symbol): PropValidationMetadata {
    return classMeta.props[propName as string] || {
        type: () => joi.string(),
        rules: [],
    }
}

/**
 * @param classMeta Must be passed to avoid calling costly function `getClassValidationMetadata`
 */
export function setPropValidationMetadata(
    Class: Function, classMeta: ClassValidationMetadata,
    propName: string | symbol, propMeta: PropValidationMetadata,
): void {
    classMeta = classMeta || getClassValidationMetadata(Class)
    classMeta.props[propName as string] = propMeta
    setClassValidationMetadata(Class, classMeta)
}


export function createJoiValidator<T>(Class: Function): JoiModelValidator<T> {
    const classMeta = getClassValidationMetadata(Class)
    const [schemaMapId, schemaMapModel] = buildSchemaMapModel(classMeta)
    if (isEmpty(schemaMapId) && isEmpty(schemaMapModel)) {
        return null
    }
    const validator = new JoiModelValidator<T>({
        schemaMapModel,
        schemaMapId,
        joiOptions: classMeta.joiOptions,
    })
    // Clean up
    deleteClassValidationMetadata(Class)
    return validator
}

function buildSchemaMapModel(classMeta: ClassValidationMetadata): [joi.SchemaMap, joi.SchemaMap] {
    // Property decorators can override class schema maps

    // tslint:disable-next-line:prefer-const
    for (let [prop, meta] of Object.entries(classMeta.props)) {
        const propSchema = buildPropSchema(meta)
        if (classMeta.idProps.has(prop)) {
            classMeta.schemaMapId[prop] = propSchema
        }
        else {
            classMeta.schemaMapModel[prop] = propSchema
        }
    }
    return [classMeta.schemaMapId, classMeta.schemaMapModel]
}

function buildPropSchema(propMeta: PropValidationMetadata): joi.AnySchema {
    return Boolean(propMeta.rawSchema)
        ? propMeta.rawSchema as joi.AnySchema
        : propMeta.rules.reduce(
            (prev, curRule) => curRule(prev),
            propMeta.type()
    )
}

