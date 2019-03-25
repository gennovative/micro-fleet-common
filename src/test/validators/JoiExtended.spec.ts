import { expect } from 'chai'

import { extJoi } from '../../app'


describe('JoiExtended', () => {
    describe('bigint', () => {
        it('Should convert then return the value if valid', () => {
            // Arrange
            const targetOne = '12345',
                targetTwo = '9999999999988888888877777'

            // Act
            const schema = extJoi.genn().bigint()
            const { error: errorOne, value: valueOne } = schema.validate(targetOne)
            const { error: errorTwo, value: valueTwo } = schema.validate(targetTwo)

            // Assert
            if (errorOne) {
                console.error(errorOne)
            }
            expect(errorOne).not.to.exist
            expect(typeof valueOne).to.equal('bigint')
            expect(valueOne).to.equal(BigInt(targetOne))

            if (errorTwo) {
                console.error(errorTwo)
            }
            expect(errorTwo).not.to.exist
            expect(typeof valueTwo).to.equal('bigint')
            expect(valueTwo).to.equal(BigInt(targetTwo))
        })

        it('Should return the value without convert if valid', () => {
            // Arrange
            const targetOne = 12345n,
                targetTwo = BigInt(Number.MAX_SAFE_INTEGER) + 999n

            // Act
            const schema = extJoi.genn().bigint()
            const { error: errorOne, value: valueOne } = schema.validate(targetOne, { convert: false })
            const { error: errorTwo, value: valueTwo } = schema.validate(targetTwo, { convert: false })

            // Assert
            if (errorOne) {
                console.error(errorOne)
            }
            expect(errorOne).not.to.exist
            expect(typeof valueOne).to.equal('bigint')
            expect(valueOne).to.equal(targetOne)

            if (errorTwo) {
                console.error(errorTwo)
            }
            expect(errorTwo).not.to.exist
            expect(typeof valueTwo).to.equal('bigint')
            expect(valueTwo).to.equal(targetTwo)
        })

        it('Should return an error object if invalid', () => {
            // Arrange
            const targetOne = '12345',
                targetTwo = Number.MAX_SAFE_INTEGER + 999

            // Act
            const schema = extJoi.genn().bigint()
            const { error: errorOne } = schema.validate(targetOne, { convert: false })
            const { error: errorTwo } = schema.validate(targetTwo, { convert: false })

            // Assert
            expect(errorOne).to.exist
            expect(errorOne.message).to.equal('"value" needs to be a bigint')

            expect(errorTwo).to.exist
            expect(errorTwo.message).to.equal('"value" needs to be a bigint')
        })

    }) // END describe 'bigint'
})
