import { expect } from 'chai'
import * as moment from 'moment'

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

    describe('dateString', () => {
        it('Should convert date time WITH timezone if input is valid', () => {
            // Arrange
            const targetOne = '2019-05-15T09:06:02+07:00',
                targetTwo = '2019-05-15T09:06:02-05:00'

            // Act
            const schema = extJoi.genn().dateString()
            const { error: errorOne, value: valueOne } = schema.validate(targetOne)
            const { error: errorTwo, value: valueTwo } = schema.validate(targetTwo)

            // Assert
            errorOne && console.error(errorOne)

            expect(errorOne).not.to.exist
            expect(valueOne).is.instanceOf(Date)
            const dateOne = new Date(targetOne)
            expect((<Date><any>valueOne).getTime()).to.equal(dateOne.getTime())

            errorTwo && console.error(errorTwo)

            expect(errorTwo).not.to.exist
            expect(valueTwo).is.instanceOf(Date)
            const dateTwo = new Date(targetTwo)
            expect((<Date><any>valueTwo).getTime()).to.equal(dateTwo.getTime())
        })

        it('Should convert UTC date time WITHOUT timezone if input is valid', () => {
            // Arrange
            const targetOne = '2019-05-15T09:06:02Z',
                targetTwo = '2019-02-28T22:30:02Z'

            // Act
            const schema = extJoi.genn().dateString({ isUTC: true })
            const { error: errorOne, value: valueOne } = schema.validate(targetOne)
            const { error: errorTwo, value: valueTwo } = schema.validate(targetTwo)

            // Assert
            errorOne && console.error(errorOne)

            expect(errorOne).not.to.exist
            expect(valueOne).is.instanceOf(Date)
            const dateOne = new Date(targetOne)
            expect((<Date><any>valueOne).getTime()).to.equal(dateOne.getTime())

            errorTwo && console.error(errorTwo)

            expect(errorTwo).not.to.exist
            expect(valueTwo).is.instanceOf(Date)
            const dateTwo = new Date(targetTwo)
            expect((<Date><any>valueTwo).getTime()).to.equal(dateTwo.getTime())
        })

        it('Should convert date time using custom translator if input is valid', () => {
            // Arrange
            const targetOne = '2019-05-15T09:06:02+06:00',
                targetTwo = '2019-02-28T22:30:02Z'

            // Act
            const schemaOne = extJoi.genn().dateString({ translator: moment })
            const { error: errorOne, value: valueOne } = schemaOne.validate(targetOne)

            const schemaTwo = extJoi.genn().dateString({
                isUTC: true,
                translator: (input: string) => moment.utc(input),
            })
            const { error: errorTwo, value: valueTwo } = schemaTwo.validate(targetTwo)

            // Assert
            errorOne && console.error(errorOne)

            expect(errorOne).not.to.exist
            expect((<moment.Moment><any>valueOne).isValid()).to.be.true
            const momentOne = moment(targetOne)
            expect((<moment.Moment><any>valueOne).isSame(momentOne)).to.be.true

            errorTwo && console.error(errorTwo)

            expect(errorTwo).not.to.exist
            expect((<moment.Moment><any>valueTwo).isValid()).to.be.true
            expect((<moment.Moment><any>valueTwo).isUTC()).to.be.true
            const momentTwo = moment.utc(targetTwo)
            expect((<moment.Moment><any>valueTwo).isSame(momentTwo)).to.be.true
            expect((<moment.Moment><any>valueTwo).format()).to.equal(momentTwo.format())
        })

        it('Should return the value if convert option is false', () => {
            // Arrange
            const targetOne = '2019-05-15T09:06:02+07:00',
                targetTwo = '2019-05-15T09:06:02-05:00'

            // Act
            const schema = extJoi.genn().dateString()
            const validationOptions = { convert: false }
            const { error: errorOne, value: valueOne } = schema.validate(targetOne, validationOptions)
            const { error: errorTwo, value: valueTwo } = schema.validate(targetTwo, validationOptions)

            // Assert
            errorOne && console.error(errorOne)

            expect(errorOne).not.to.exist
            expect(valueOne).to.equal(targetOne)

            errorTwo && console.error(errorTwo)

            expect(errorTwo).not.to.exist
            expect(valueTwo).to.equal(targetTwo)
        })

        it('Should convert ONLY date if input is valid', () => {
            // Arrange
            const target = '2019-05-15'

            // Act
            const schema = extJoi.genn().dateString()
            const { error, value } = schema.validate(target)

            // Assert
            error && console.error(error)

            expect(error).not.to.exist
            expect(value).is.instanceOf(Date)
            const dateOne = new Date(target)
            expect((<Date><any>value).getTime()).to.equal(dateOne.getTime())
        })

        it('Should convert ONLY date using custom translator if input is valid', () => {
            // Arrange
            const target = '2019-05-15'

            // Act
            const schemaOne = extJoi.genn().dateString({ translator: moment })
            const { error, value } = schemaOne.validate(target)

            // Assert
            error && console.error(error)

            expect(error).not.to.exist
            expect((<moment.Moment><any>value).isValid()).to.be.true
            const momentOne = moment(target)
            expect((<moment.Moment><any>value).isSame(momentOne)).to.be.true
        })

        it('Should return an error object if invalid', () => {
            // Arrange
                // Invalid date separator /
            const targetOne = '2019/05/15T09:06:02+07:00',
                // Invalid month
                targetTwo = '2019-13-30T09:06:02-05:00'

            // Act
            const schema = extJoi.genn().dateString()
            const { error: errorOne } = schema.validate(targetOne, { convert: false })
            const { error: errorTwo } = schema.validate(targetTwo, { convert: false })

            // Assert
            expect(errorOne).to.exist
            expect(errorOne.message).to.equal('"value" needs to be a date string compliant' +
                ' with W3C Date and Time Formats (YYYY-MM-DDThh:mm+hh:mm or -hh:mm)')

            expect(errorTwo).to.exist
            expect(errorTwo.message).to.equal('"value" needs all components to have valid values')
        })

    }) // END describe 'dateString'
})
