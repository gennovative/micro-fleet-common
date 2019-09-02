import { expect } from 'chai'
import { GetSettingRequest } from '../../app'


describe('GetSettingRequest\'s validator', () => {
    describe('whole', () => {
        it('Should return the validated object if valid', () => {
            // Arrange
            const targetOne = {
                    slug: 'SettingSvc',
                    ipAddress: '127.0.0.1',
                },
                targetTwo: any = new GetSettingRequest()

            targetTwo.slug = 'setting-svc'
            targetTwo.ipAddress = '192.168.10.23'

            // Act
            const validator = GetSettingRequest.getValidator(),
                [errorOne, validatedOne] = validator.whole(targetOne),
                [errorTwo, validatedTwo] = validator.whole(targetTwo)

            // Assert
            expect(errorOne).not.to.exist
            expect(validatedOne).to.exist
            expect(validatedOne.slug).to.equal(targetOne.slug)
            expect(validatedOne.ipAddress).to.equal(targetOne.ipAddress)

            expect(errorTwo).not.to.exist
            expect(validatedTwo).to.exist
            expect(validatedTwo.slug).to.equal(targetTwo.slug)
            expect(validatedTwo.ipAddress).to.equal(targetTwo.ipAddress)
        })

        it('Should return an err object if invalid', () => {
            // Arrange
            const targetOne = {
                },
                targetTwo = {
                    slug: '',
                    ipAddress: '',
                },
                targetThree = {
                    slug: 'setting svc', // with a space character
                    ipAddress: '192-168-10-23', // malformed IP address
                }

            // Act
            const validator = GetSettingRequest.getValidator(),
                [errorOne, validatedOne] = validator.whole(targetOne),
                [errorTwo, validatedTwo] = validator.whole(targetTwo),
                [errorThree, validatedThree] = validator.whole(targetThree)

            // Assert
            expect(errorOne).to.exist
            expect(validatedOne).not.to.exist

            expect(errorTwo).to.exist
            expect(validatedTwo).not.to.exist

            expect(errorThree).to.exist
            expect(validatedThree).not.to.exist
        })
    }) // END describe 'whole'
})
