import * as joi from 'joi'
import { expect } from 'chai'

import { ModelAutoMapper, JoiModelValidator, ValidationError } from '../../app'
import { SampleModel } from '../validators/SampleModel'
import { ICreateMapFluentFunctions } from '../../app/translators/automapper-interfaces'


const itemValidator = JoiModelValidator.create({ name: joi.string().required() }, false, false)


/**
 * Validates and translates item array.
 * Should be traditional function, should not be arrow function.
 * See: https://github.com/loedeman/AutoMapper/issues/33
 */
function transformation(opts: AutoMapperJs.ISourceMemberConfigurationOptions) {
    const output = opts.sourceObject.items.map((it: any) => {
        const [err, val] = itemValidator.whole(it)
        if (err) { throw err }
        return val
    })
    return output
}

class NestingTranslator extends ModelAutoMapper<SampleModel> {
    /**
     * @override
     */
    protected createMap(): ICreateMapFluentFunctions {
        return automapper.createMap('any', this.ModelClass)
            .forSourceMember('items', transformation)
    }
}

let globalTranslator: ModelAutoMapper<SampleModel>

describe('ModelAutoMapper', () => {
    beforeEach(() => {
        globalTranslator = new ModelAutoMapper(SampleModel, SampleModel.validator)
    })

    describe('merge', () => {
        it('Should copy properties from one source then validate', () => {
            // Arrange
            const origin: Partial<SampleModel> = {
                    name: 'Gennova123',
                    age: 18,
                    gender: 'male',
                },
                source = {
                    theID: 1,
                    name: 'gen-no-va',
                    address: '^!@',
                    unknown: 'I am a spy!',
                }
            let copied: any,
                error: any

            // Act
            try {
                copied = globalTranslator.merge(origin, [source])
            } catch (err) {
                error = err
            }

            // Assert
            error && console.error(error)

            expect(error).not.to.exist
            expect(copied).to.exist
            expect(copied).is.instanceOf(SampleModel)
            expect(copied.name).to.equal(source.name)
            expect(copied.address).to.equal(source.address)
            expect(copied.age).to.equal(origin.age)
            expect(copied.gender).to.equal(origin.gender)

            // Assert: Unknown property is stripped.
            expect(copied.unknown).not.to.exist
        })

        it('Should copy properties from multiple sources then validate', () => {
            // Arrange
            const origin: Partial<SampleModel> = {
                    name: 'Gennova123',
                    age: 18,
                    gender: 'male',
                },
                sourceOne = {
                    name: 'gen-no-va',
                    address: '^!@',
                    unknown: 'I am a spy!',
                },
                sourceTwo = {
                    theID: 1,
                    address: 'Earth',
                    age: 99,
                }
            let copied: any,
                error: any

            // Act
            try {
                copied = globalTranslator.merge(origin, [sourceOne, sourceTwo])
            } catch (err) {
                error = err
            }

            // Assert
            error && console.error(error)

            expect(error).not.to.exist
            expect(copied).to.exist
            expect(copied).is.instanceOf(SampleModel)
            expect(copied.name).to.equal(sourceOne.name)
            expect(copied.address).to.equal(sourceTwo.address)
            expect(copied.age).to.equal(sourceTwo.age)
            expect(copied.gender).to.equal(origin.gender)

            // Assert: Unknown property is stripped.
            expect(copied.unknown).not.to.exist
        })

        it('Should throw an error object if VALIDATION fails', () => {
            // Arrange
            const origin: Partial<SampleModel> = {
                    name: 'Gennova123',
                    age: 18,
                    gender: 'male',
                },
                source = {
                    theID: 1,
                    name: 'A name that is unacceptably too long and lengthy',
                    age: NaN,
                }

            // Act
            let error, converted

            try {
                converted = globalTranslator.merge(origin, source)
            } catch (err) {
                error = err
            }

            // Assert
            expect(converted).not.to.exist
            expect(error).to.exist
            expect(error.details.length).to.equal(2)
            expect(error.details[0].message).to.equal('"name" length must be less than or equal to 10 characters long')
            expect(error.details[1].message).to.equal('"age" must be a number')
        })

        it('Should return the input if it is not an object', () => {
            // Act
            const input: any = 'not-an-object { }'
            let error, converted

            try {
                converted = globalTranslator.merge(input, {})
            } catch (err) {
                error = err
            }

            // Assert
            expect(converted).to.equal(input)
            expect(error).not.to.exist
        })
    })

    describe('whole', () => {
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
            try {
                convertedOne = globalTranslator.whole(sourceOne) as SampleModel
            } catch (err) {
                errorOne = err
            }

            try {
                convertedTwo = globalTranslator.whole(sourceTwo) as SampleModel
            } catch (err) {
                errorTwo = err
            }

            // Assert
            errorOne && console.error(errorOne)

            expect(errorOne).not.to.exist
            expect(convertedOne).to.exist
            expect(convertedOne).is.instanceOf(SampleModel)
            expect(convertedOne.name).to.equal(sourceOne.name)
            expect(convertedOne.address).to.equal(sourceOne.address)
            expect(convertedOne.age).to.equal(sourceOne.age)
            expect(convertedOne.gender).to.equal(sourceOne.gender)

            errorTwo && console.error(errorTwo)

            expect(errorTwo).not.to.exist
            expect(convertedTwo).to.exist
            expect(convertedTwo).is.instanceOf(SampleModel)
            expect(convertedTwo.name).to.equal(sourceTwo.name)
            expect(convertedTwo.address).to.equal(sourceTwo.address)
            expect(convertedTwo.age).not.to.exist
            expect(convertedTwo.gender).not.to.exist
        })

        it('Should return an array if success', () => {
            // Arrange
            const sourceArray = [
                {
                    theID: 1,
                    name: 'Gennova123',
                    address: 'Unlimited length street name',
                    age: 18,
                    gender: 'male',
                },
                {
                    theID: 1,
                    name: 'gen-no-va',
                    address: '^!@',
                },
            ]
            let error, convertedArr

            // Act
            try {
                convertedArr = globalTranslator.whole(sourceArray) as SampleModel[]
            } catch (err) {
                error = err
            }

            // Assert
            error && console.error(error)

            expect(error).not.to.exist
            expect(convertedArr).to.exist
            expect(convertedArr).to.be.instanceOf(Array)
            expect(convertedArr.length).to.equal(2)

            convertedArr.forEach((model, i) => {
                expect(model, `Assert model[${i}]`).is.instanceOf(SampleModel)
                expect(model.name, `Assert model[${i}].name`).to.equal(sourceArray[i].name)
                expect(model.address, `Assert model[${i}].address`).to.equal(sourceArray[i].address)
                expect(model.age, `Assert model[${i}].age`).to.equal(sourceArray[i]['age'])
                expect(model.gender, `Assert model[${i}].gender`).to.equal(sourceArray[i]['gender'])
            })
        })

        it('Should do nested map with derived translator class', () => {
            // Arrange
            const source = {
                    theID: 1,
                    name: 'Gennova123',
                    address: 'Unlimited length street name',
                    items: [
                        { name: 'Item 1' },
                        { name: 'Item 2' },
                    ],
                }

            // Add 'items' key to model schema map, otherwise it will stripped.
            SampleModel.validator.schemaMap['items'] = joi.array().length(2)
            SampleModel.validator.compile()

            const translator = new NestingTranslator(SampleModel, SampleModel.validator)

            // Act
            let error: ValidationError, converted: any

            try {
                converted = translator.whole(source)
            } catch (err) {
                error = err
            }

            // Assert
            error && console.error(error)

            expect(error).not.to.exist
            expect(converted).to.exist
            expect(converted).to.exist
            expect(converted.theID).to.equal(source.theID)
            expect(converted.name).to.equal(source.name)
            expect(converted.address).to.equal(source.address)
            expect(converted.items.length).to.equal(2)
            expect(converted.items[0].name).to.equal(source.items[0].name)
            expect(converted.items[1].name).to.equal(source.items[1].name)
        })

        it('Should do nested map by configuring internal mapper', () => {
            // Arrange
            const source = {
                    theID: 1,
                    name: 'Gennova123',
                    address: 'Unlimited length street name',
                    items: [
                        { name: 'Item 1' },
                        { name: 'Item 2' },
                    ],
                }

            // Add 'items' key to model schema map, otherwise it will stripped.
            SampleModel.validator.schemaMap['items'] = joi.array().length(2)
            SampleModel.validator.compile()

            const translator = new ModelAutoMapper(SampleModel, SampleModel.validator)
            translator.internalMapper.forSourceMember('items', transformation)

            // Act
            let error: ValidationError, converted: any

            try {
                converted = translator.whole(source)
            } catch (err) {
                error = err
            }

            // Assert
            error && console.error(error)

            expect(error).not.to.exist
            expect(converted).to.exist
            expect(converted).to.exist
            expect(converted.theID).to.equal(source.theID)
            expect(converted.name).to.equal(source.name)
            expect(converted.address).to.equal(source.address)
            expect(converted.items.length).to.equal(2)
            expect(converted.items[0].name).to.equal(source.items[0].name)
            expect(converted.items[1].name).to.equal(source.items[1].name)
        })

        it('Should return the input if it is not an object', () => {
            // Arrange
            const inputOne: any = null,
                inputTwo: any = undefined,
                inputThree = 'abc',
                inputFour = 999
            let error, converted

            // Act 1
            try {
                converted = globalTranslator.whole(inputOne)
            } catch (err) {
                error = err
            }

            // Assert
            expect(error).not.to.exist
            expect(converted).to.equal(inputOne)


            // Act 2
            try {
                converted = globalTranslator.whole(inputTwo)
            } catch (err) {
                error = err
            }

            // Assert
            expect(error).not.to.exist
            expect(converted).to.equal(inputTwo)


            // Act 3
            try {
                converted = globalTranslator.whole(inputThree)
            } catch (err) {
                error = err
            }

            // Assert
            expect(error).not.to.exist
            expect(converted).to.equal(inputThree)


            // Act 4
            try {
                converted = globalTranslator.whole(inputFour)
            } catch (err) {
                error = err
            }

            // Assert
            expect(error).not.to.exist
            expect(converted).to.equal(inputFour)
        })

        it('Should not map unknown properties', () => {
            // Arrange
            const source = {
                    theID: 1,
                    name: 'Gennova123',
                    address: 'Unlimited length street name',
                    hobbies: ['sport', 'books'],
                    loveMovie: false,
                }
            let error, converted

            // Act
            try {
                converted = globalTranslator.whole(source) as SampleModel
            } catch (err) {
                error = err
            }

            // Assert
            expect(error).not.to.exist
            expect(converted).to.exist
            expect(converted).is.instanceOf(SampleModel)
            expect(converted.name).to.equal(source.name)
            expect(converted.address).to.equal(source.address)
            expect(converted['hobbies']).not.to.exist
            expect(converted['loveMovie']).not.to.exist
        })

        it('Should throw an error object if VALIDATION fails and no error callback is given', () => {
            // Arrange
            const source = {
                }

            // Act
            let error, converted

            try {
                converted = globalTranslator.whole(source)
            } catch (err) {
                error = err
            }

            // Assert
            expect(converted).not.to.exist
            expect(error).to.exist
        })

        it('Should pass an error object to callback if VALIDATION fails', () => {
            // Arrange
            const source = {
                }

            // Act
            let error: ValidationError

            const converted = globalTranslator.whole(source, {
                errorCallback: (err) => {
                    error = err
                },
            })

            // Assert
            expect(converted).not.to.exist
            expect(error).to.exist
            error && expect(error.name).to.equal('ValidationError')
        })

        it('Should throw an error object if TRANSLATION fails and no error callback is given', () => {
            // Arrange
            const source = {
                    theID: 1,
                    name: 'Gennova123',
                    address: 'Unlimited length street name',
                    items: [
                        { name: 'Item 1' },
                        { name: '' }, // not allowed to be empty
                    ],
                }

            // Add 'items' key to model schema map, otherwise it will stripped.
            SampleModel.validator.schemaMap['items'] = joi.array().length(2)
            SampleModel.validator.compile()

            const translator = new NestingTranslator(SampleModel, SampleModel.validator)

            // Act
            let error: ValidationError, converted

            try {
                converted = translator.whole(source)
            } catch (err) {
                error = err
            }

            // Assert
            expect(converted).not.to.exist
            expect(error).to.exist
            expect(error.details[0].path.length).to.equal(1)
            expect(error.details[0].path[0]).to.equal('name')
            expect(error.details[0].message).to.equal('"name" is not allowed to be empty')
        })

        it('Should pass an error object to callback if TRANSLATION fails', () => {
            // Arrange
            const source = {
                    theID: 1,
                    name: 'Gennova123',
                    address: 'Unlimited length street name',
                    items: [
                        { name: 'Item 1' },
                        { name: '' }, // not allowed to be empty
                    ],
                }

            // Add 'items' key to model schema map, otherwise it will stripped.
            SampleModel.validator.schemaMap['items'] = joi.array().length(2)
            SampleModel.validator.compile()

            const translator = new NestingTranslator(SampleModel, SampleModel.validator)

            // Act
            let error: ValidationError, converted
            converted = translator.whole(source, {
                errorCallback: (err) => {
                    error = err
                },
            })

            // Assert
            expect(converted).not.to.exist
            expect(error).to.exist
            expect(error.details[0].path.length).to.equal(1)
            expect(error.details[0].path[0]).to.equal('name')
            expect(error.details[0].message).to.equal('"name" is not allowed to be empty')
        })

        it('Should blindly convert object if validation is disabled', () => {
            // Arrange
            const source = {
                    name: 'ab',
                    address: '',
                    age: '10',
                }

            // Act
            let error, converted

            globalTranslator.enableValidation = false
            converted = globalTranslator.whole(source, {
                errorCallback: (err) => {
                    error = err
                },
            }) as SampleModel

            // Assert
            expect(error).not.to.exist
            expect(converted).to.exist
            expect(converted.name).to.equal(source.name)
            expect(converted.address).to.equal(source.address)
            expect(converted.age).to.equal(source.age)
        })

        it('Should blindly convert object if validation is temporarily disabled in mapping options', () => {
            // Arrange
            const source = {
                    name: 'ab',
                    address: '',
                    age: '10',
                }
            globalTranslator.enableValidation = true // Enable to whole class

            // Act
            let error, converted
            converted = globalTranslator.whole(source, {
                enableValidation: false, // Temporarily disable
                errorCallback: (err) => {
                    error = err
                },
            }) as SampleModel

            // Assert
            expect(error).not.to.exist
            expect(converted).to.exist
            expect(converted.name).to.equal(source.name)
            expect(converted.address).to.equal(source.address)
            expect(converted.age).to.equal(source.age)
        })

    }) // END describe 'whole'

    describe('partial', () => {
        it('Should copy properties with value', () => {
            // Arrange
            const source = {
                    theID: 1,
                    name: 'gen-no-va',
                    // address: '^!@' => not specified, although this property is required
                }
            let error, converted

            // Act
            try {
                converted = globalTranslator.partial(source) as SampleModel
            } catch (err) {
                error = err
            }

            // Assert
            expect(error).not.to.exist
            expect(converted).to.exist
            expect(converted).is.instanceOf(SampleModel)
            expect(converted.name).to.equal(source.name)
            expect(converted.address).not.to.exist
            expect(converted.age).not.to.exist
            expect(converted.gender).not.to.exist
        })
    }) // END describe 'partial'
})
