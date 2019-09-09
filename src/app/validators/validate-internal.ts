import * as joi from '@hapi/joi'

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

export function getClassValidationMetadata(Class: Function): ClassValidationMetadata {
    return Reflect.getMetadata(VALIDATE_META, Class) || { schemaMapModel: {}, props: {}, idProps: new Set() }
}


export function setClassValidationMetadata(Class: Function, meta: ClassValidationMetadata): void {
    Reflect.defineMetadata(VALIDATE_META, meta, Class)
}


export function deleteClassValidationMetadata(Class: Function): void {
    Reflect.deleteMetadata(VALIDATE_META, Class)
}


export function getPropValidationMetadata(Class: Function, propName: string | symbol): PropValidationMetadata {
    return getClassValidationMetadata(Class).props[propName as string] || {
        type: () => joi.string(),
        rules: [],
    }
}

export function setPropValidationMetadata(Class: Function, propName: string | symbol, meta: PropValidationMetadata): void {
    const classMeta = getClassValidationMetadata(Class)
    classMeta.props[propName as string] = meta
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
    const schemaMapId: joi.SchemaMap = {}
    const schemaMapModel: joi.SchemaMap = {}
    const hasMapId = !isEmpty(classMeta.schemaMapId)
    const hasMapModel = !isEmpty(classMeta.schemaMapModel)

    // Decorator @validateClass() overrides all property decorators
    if (hasMapId && hasMapModel) {
        return [classMeta.schemaMapId, classMeta.schemaMapModel]
    }

    // Build schema maps from property decorators

    // tslint:disable-next-line:prefer-const
    for (let [prop, meta] of Object.entries(classMeta.props)) {
        const propSchema = buildPropSchema(meta)
        if (classMeta.idProps.has(prop)) {
            schemaMapId[prop] = propSchema
        }
        else {
            schemaMapModel[prop] = propSchema
        }
    }

    return [
        hasMapId ? classMeta.schemaMapId : schemaMapId,
        hasMapModel ? classMeta.schemaMapModel : schemaMapModel,
    ]
}

function buildPropSchema(propMeta: PropValidationMetadata): joi.AnySchema {
    return Boolean(propMeta.rawSchema)
        ? propMeta.rawSchema as joi.AnySchema
        : propMeta.rules.reduce(
            (prev, curRule) => curRule(prev),
            propMeta.type()
    )
}

