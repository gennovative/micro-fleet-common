import * as joi from 'joi'

/**
 * Rule to validate BigInt type.
 */
const bigintRule = {
    name: 'bigint',
    setup(this: joi.ExtensionBoundSchema, params: any) {

        this['_flags'].bigint = true // Set a flag for later use
    },
    validate(this: joi.ExtensionBoundSchema, params: any, value: any, state: joi.State, options: joi.ValidationOptions) {
        if (typeof value !== 'bigint') {
            // Generate an error, state and options need to be passed
            return this.createError('genn.bigint', { v: value }, state, options)
        }
        return value // Everything is OK
    },
}


const joiExtension = {
    name: 'genn',
    language: {
        bigint: 'needs to be a bigint', // Used below as 'number.round',
    },
    pre(value: any, state: joi.State, options: joi.ValidationOptions) {

        if (options.convert && this['_flags'].bigint) {
            return BigInt(value) // Change the value
        }

        return value // Keep the value as it was
    },
    rules: [ bigintRule ],
}

export type ExtendedJoi = joi.AnySchema & {
    genn: () => {
        bigint: () => joi.AnySchema,
    },
}

/**
 * @example extJoi.genn().bigint().validate('98765443123456');
 * @example extJoi.genn().bigint().validate(98765443123456n, {convert: false});
 */
export const extJoi: ExtendedJoi = joi.extend(joiExtension)
