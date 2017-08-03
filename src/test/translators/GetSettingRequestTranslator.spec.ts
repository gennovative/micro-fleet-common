import { expect } from 'chai';
import { NotImplementedException } from 'back-lib-common-util';

import { GetSettingRequest } from '../../app';
import translator from '../../app/translators/GetSettingRequestTranslator';


describe('GetSettingRequestTranslator', () => {
	describe('whole', () => {
		it('Should return an object of type GetSettingRequest if success', () => {
			// Arrange
			let sourceOne = {
					slug: 'SettingSvc',
					ipAddress: '127.0.0.1',
					unknown: 'bla bla'
				},
				sourceTwo = {
					slug: 'setting-svc',
					ipAddress: '192.168.10.23',
					unknown: 'bla bla'
				};
			let errorOne, convertedOne, errorTwo, convertedTwo;

			// Act
			try {
				convertedOne = translator.whole(sourceOne, false);
			} catch (err) {
				errorOne = err;
			}
			
			try {
				convertedTwo = translator.whole(sourceTwo, false);
			} catch (err) {
				errorTwo = err;
			}

			// Assert
			expect(errorOne).not.to.exist;
			expect(convertedOne).to.exist;
			expect(convertedOne).is.instanceOf(GetSettingRequest);
			expect(convertedOne.slug).to.equal(sourceOne.slug);
			expect(convertedOne.ipAddress).to.equal(sourceOne.ipAddress);
			
			// Make sure unknown property is stripped.
			expect(convertedOne.unknown).not.to.exist;
			
			expect(errorTwo).not.to.exist;
			expect(convertedTwo).to.exist;
			expect(convertedTwo).is.instanceOf(GetSettingRequest);
			expect(convertedTwo.slug).to.equal(sourceTwo.slug);
			expect(convertedTwo.ipAddress).to.equal(sourceTwo.ipAddress);
			expect(convertedTwo.unknown).not.to.exist;
		});
	}); // END describe 'whole'
	
	describe('partial', () => {
		it('Should throw NotImplementedException', () => {
			// Act
			let result, exception;
			try {
				result = translator.partial({}, false);
			} catch (err) {
				exception = err;
			}

			// Assert
			expect(result).not.to.exist;
			expect(exception).to.exist;
			expect(exception).to.be.instanceOf(NotImplementedException);
		});
	}); // END describe 'partial'
});