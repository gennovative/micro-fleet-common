import { expect } from 'chai'
import * as joi from 'joi'

import { decorators as d } from '../../app'


@d.translatable()
export class ModelA {
    public readonly theID: number = undefined // It's IMPORTANT to initialize property with a value.
    public readonly name: string = undefined
    public readonly address: string = undefined
    public readonly age: number = undefined
    public readonly gender: 'male' | 'female' = undefined
}

@d.validateClass({
    schemaMapModel: {
        name: joi.string().regex(/^[\d\w -]+$/u).max(10).min(3).required(),
        address: joi.string().required(),
        age: joi.number().min(15).max(99).integer()
            .allow(null).optional(),
        gender: joi.only('male', 'female').allow(null).optional(),
    },
    schemaMapId: {
        theID: joi.number().min(1).max(Number.MAX_SAFE_INTEGER).required(),
    },
})
@d.translatable()
export class ModelB {
    public readonly theID: number = undefined // It's IMPORTANT to initialize property with a value.
    public readonly name: string = undefined
    public readonly address: string = undefined
    public readonly age: number = undefined
    public readonly gender: 'male' | 'female' = undefined
}

@d.translatable()
@d.validateClass({
    schemaMapModel: {
        name: joi.string().regex(/^[\d\w -]+$/u).max(10).min(3).required(),
        address: joi.string().required(),
        age: joi.number().min(15).max(99).integer()
            .allow(null).optional(),
        gender: joi.only('male', 'female').allow(null).optional(),
    },
    schemaMapId: {
        theID: joi.number().min(1).max(Number.MAX_SAFE_INTEGER).required(),
    },
})
export class ModelC {
    public readonly theID: number = undefined // It's IMPORTANT to initialize property with a value.
    public readonly name: string = undefined
    public readonly address: string = undefined
    public readonly age: number = undefined
    public readonly gender: 'male' | 'female' = undefined
}


@d.translatable()
export class ModelD {
    @d.id()
    @d.required()
    @d.number({ min: 1, max: Number.MAX_SAFE_INTEGER })
    public readonly theID: number = undefined

    @d.required()
    @d.string({ minLength: 3, maxLength: 10, pattern: /^[\d\w -]+$/u })
    public readonly name: string = undefined

    @d.required()
    @d.string()
    public readonly address: string = undefined

    @d.number({ min: 15, max: 99 })
    public readonly age: number = undefined

    @d.only('male', 'female')
    public readonly gender: 'male' | 'female' = undefined
}


describe('@translatable()', () => {
    describe('No validation', () => {
        it('Should return an object of target type after translation', () => {
            // Arrange
            const source = {
                    theID: 1,
                    name: 'Gennova123',
                    address: 'Unlimited length street name',
                    age: 18,
                    gender: 'male',
                }
            let errorOne, convertedOne

            // Act
            const translator = ModelA['getTranslator']()
            try {
                convertedOne = translator.whole(source)
            } catch (err) {
                errorOne = err
            }

            // Assert
            errorOne && console.error(errorOne)

            expect(errorOne).not.to.exist
            expect(convertedOne).to.exist
            expect(convertedOne).is.instanceOf(ModelA)
            expect(convertedOne.name).to.equal(source.name)
            expect(convertedOne.address).to.equal(source.address)
            expect(convertedOne.age).to.equal(source.age)
            expect(convertedOne.gender).to.equal(source.gender)
        })
    }) // describe 'validateClass'

    describe('validateClass', () => {
        it('Should return an object of target type if success', () => {
            // Arrange
            const sourceOne = {
                    theID: 1,
                    name: 'Gennova123',
                    address: 'Unlimited length street name',
                    age: 18,
                    gender: 'male',
                },
                sourceTwo = {
                    theID: 123,
                    name: 'gen-no-va',
                    address: '^!@',
                }
            let errorOne, convertedOne, errorTwo, convertedTwo

            // Act
            const translator = ModelB['getTranslator']()
            try {
                convertedOne = translator.whole(sourceOne)
            } catch (err) {
                errorOne = err
            }

            try {
                convertedTwo = translator.whole(sourceTwo)
            } catch (err) {
                errorTwo = err
            }

            // Assert
            errorOne && console.error(errorOne)

            expect(errorOne).not.to.exist
            expect(convertedOne).to.exist
            expect(convertedOne).is.instanceOf(ModelB)
            expect(convertedOne.name).to.equal(sourceOne.name)
            expect(convertedOne.address).to.equal(sourceOne.address)
            expect(convertedOne.age).to.equal(sourceOne.age)
            expect(convertedOne.gender).to.equal(sourceOne.gender)

            errorTwo && console.error(errorTwo)

            expect(errorTwo).not.to.exist
            expect(convertedTwo).to.exist
            expect(convertedTwo).is.instanceOf(ModelB)
            expect(convertedTwo.name).to.equal(sourceTwo.name)
            expect(convertedTwo.address).to.equal(sourceTwo.address)
            expect(convertedTwo.age).not.to.exist
            expect(convertedTwo.gender).not.to.exist
        })

        it('Should return error details if invalid', () => {
            // Arrange
            const targetOne = {
                },
                targetTwo = {
                    name: <any>null,
                    address: '',
                    age: '10',
                },
                targetThree = {
                    name: 'too long name w!th inv@lid ch@racters',
                    address: <any>null,
                    age: 10,
                    gender: 'homo',
                }

            // Act
            const validator = ModelC['getValidator']()
            const [errorOne, validatedOne] = validator.whole(targetOne),
                [errorTwo, validatedTwo] = validator.whole(targetTwo),
                [errorThree, validatedThree] = validator.whole(targetThree)

            // Assert
            expect(validatedOne).not.to.exist
            expect(errorOne).to.exist
            expect(errorOne.details).to.have.length(2)
            expect(errorOne.details[0].path.length).to.equal(1)
            expect(errorOne.details[0].path[0]).to.equal('name')
            expect(errorOne.details[0].message).to.equal('"name" is required')
            expect(errorOne.details[1].path.length).to.equal(1)
            expect(errorOne.details[1].path[0]).to.equal('address')
            expect(errorOne.details[1].message).to.equal('"address" is required')

            expect(validatedTwo).not.to.exist
            expect(errorTwo).to.exist
            expect(errorTwo.details).to.have.length(3)
            expect(errorTwo.details[0].path.length).to.equal(1)
            expect(errorTwo.details[0].path[0]).to.equal('name')
            expect(errorTwo.details[0].message).to.equal('"name" must be a string')
            expect(errorTwo.details[1].path.length).to.equal(1)
            expect(errorTwo.details[1].path[0]).to.equal('address')
            expect(errorTwo.details[1].message).to.equal('"address" is not allowed to be empty')
            expect(errorTwo.details[2].path.length).to.equal(1)
            expect(errorTwo.details[2].path[0]).to.equal('age')
            expect(errorTwo.details[2].message).to.equal('"age" must be larger than or equal to 15')

            expect(validatedThree).not.to.exist
            expect(errorThree).to.exist
            expect(errorThree.details).to.have.length(5)
            expect(errorThree.details[0].path.length).to.equal(1)
            expect(errorThree.details[0].path[0]).to.equal('name')
            expect(errorThree.details[0].message).to.contain('fails to match the required pattern')
            expect(errorThree.details[1].path.length).to.equal(1)
            expect(errorThree.details[1].path[0]).to.equal('name')
            expect(errorThree.details[1].message).to.equal('"name" length must be less than or equal to 10 characters long')
            expect(errorThree.details[2].path.length).to.equal(1)
            expect(errorThree.details[2].path[0]).to.equal('address')
            expect(errorThree.details[2].message).to.equal('"address" must be a string')
            expect(errorThree.details[3].path.length).to.equal(1)
            expect(errorThree.details[3].path[0]).to.equal('age')
            expect(errorThree.details[3].message).to.equal('"age" must be larger than or equal to 15')
            expect(errorThree.details[4].path.length).to.equal(1)
            expect(errorThree.details[4].path[0]).to.equal('gender')
            expect(errorThree.details[4].message).to.equal('"gender" must be one of [male, female, null]')
        })
    }) // describe 'validateClass'

    describe('Property decorators', () => {
        it('Should return an object of target type if success', () => {
            // Arrange
            const sourceOne = {
                    theID: 1,
                    name: 'Gennova123',
                    address: 'Unlimited length street name',
                    age: 18,
                    gender: 'male',
                },
                sourceTwo = {
                    theID: 123,
                    name: 'gen-no-va',
                    address: '^!@',
                }
            let errorOne, convertedOne, errorTwo, convertedTwo

            // Act
            const translator = ModelD['getTranslator']()
            try {
                convertedOne = translator.whole(sourceOne)
            } catch (err) {
                errorOne = err
            }

            try {
                convertedTwo = translator.whole(sourceTwo)
            } catch (err) {
                errorTwo = err
            }

            // Assert
            errorOne && console.error(errorOne)

            expect(errorOne).not.to.exist
            expect(convertedOne).to.exist
            expect(convertedOne).is.instanceOf(ModelD)
            expect(convertedOne.name).to.equal(sourceOne.name)
            expect(convertedOne.address).to.equal(sourceOne.address)
            expect(convertedOne.age).to.equal(sourceOne.age)
            expect(convertedOne.gender).to.equal(sourceOne.gender)

            errorTwo && console.error(errorTwo)

            expect(errorTwo).not.to.exist
            expect(convertedTwo).to.exist
            expect(convertedTwo).is.instanceOf(ModelD)
            expect(convertedTwo.name).to.equal(sourceTwo.name)
            expect(convertedTwo.address).to.equal(sourceTwo.address)
            expect(convertedTwo.age).not.to.exist
            expect(convertedTwo.gender).not.to.exist
        })

        it('Should ignore `required` validation (except ID), but not allow `null` value, on partial translation', () => {
            // Arrange
            const targetOne = {
                    theID: 1,
                },
                targetTwo = {
                    theID: 2,
                    name: <any>null,
                    age: <any>null,
                }

            // Act
            const validator = ModelD['getValidator']()
            const [errorOne, validatedOne] = validator.partial(targetOne),
                [errorTwo, validatedTwo] = validator.partial(targetTwo)

            // Assert: `required` validation is ignored.
            errorOne && console.error(errorOne)
            expect(validatedOne).to.exist
            expect(errorOne).not.to.exist

            // Assert: `required` properties don't allow `null`.
            expect(validatedTwo).not.to.exist
            expect(errorTwo).to.exist
            expect(errorTwo.details).to.have.length(2)
            expect(errorTwo.details[0].path.length).to.equal(1)
            expect(errorTwo.details[0].path[0]).to.equal('name')
            expect(errorTwo.details[0].message).to.equal('"name" must be a string')
            expect(errorTwo.details[1].path.length).to.equal(1)
            expect(errorTwo.details[1].path[0]).to.equal('age')
            expect(errorTwo.details[1].message).to.equal('"age" must be a number')
        })
    }) // describe 'decorators'
})
