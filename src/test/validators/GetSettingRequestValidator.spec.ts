import { expect } from 'chai';

import validator from '../../app/validators/GetSettingRequestValidator';


describe('GetSettingRequestValidator', () => {
	describe('forNew', () => {
		it('Should return a valid object if valid', () => {
			// Arrange
			let targetOne = {
					slug: 'SettingSvc',
					ipAddress: '127.0.0.1'
				},
				targetTwo = {
					slug: 'setting-svc',
					ipAddress: '192.168.10.23'
				};

			// Act
			let [errorOne, validatedOne] = validator.forNew(targetOne),
				[errorTwo, validatedTwo] = validator.forNew(targetTwo);

			// Assert
			expect(errorOne).not.to.exist;
			expect(validatedOne).to.exist;
			expect(validatedOne.slug).to.equal(targetOne.slug);
			expect(validatedOne.ipAddress).to.equal(targetOne.ipAddress);
			
			expect(errorTwo).not.to.exist;
			expect(validatedTwo).to.exist;
			expect(validatedTwo.slug).to.equal(targetTwo.slug);
			expect(validatedTwo.ipAddress).to.equal(targetTwo.ipAddress);
		});
		
		it('Should return an err object if invalid', () => {
			// Arrange
			let targetOne = {
				},
				targetTwo = {
					slug: '',
					ipAddress: ''
				},
				targetThree = {
					slug: 'setting svc', // with a space character
					ipAddress: '192-168-10-23' // malformed IP address
				};

			// Act
			let [errorOne, validatedOne] = validator.forNew(targetOne),
				[errorTwo, validatedTwo] = validator.forNew(targetTwo),
				[errorThree, validatedThree] = validator.forNew(targetThree);

			// Assert
			expect(errorOne).to.exist;
			expect(validatedOne).not.to.exist;
			
			expect(errorTwo).to.exist;
			expect(validatedTwo).not.to.exist;
			
			expect(errorThree).to.exist;
			expect(validatedThree).not.to.exist;
		});
	});
});