import * as joi from 'joi';
import { expect } from 'chai';

import { ModelAutoMapper } from '../../app';
import { SampleModel, validator } from '../validators/SampleModel';


let translator: ModelAutoMapper<SampleModel>;

describe('ModelTranslatorBase', () => {
	beforeEach(() => {
		translator = new ModelAutoMapper(SampleModel, validator);
	});

	describe('whole', () => {
		it('Should return an object of target type if success', () => {
			// Arrange
			let sourceOne = {
					name: 'Gennova123',
					address: 'Unlimited length street name',
					age: 18,
					gender: 'male'
				},
				sourceTwo = {
					name: 'gen-no-va',
					address: '^!@'
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
			expect(convertedOne).is.instanceOf(SampleModel);
			expect(convertedOne.name).to.equal(sourceOne.name);
			expect(convertedOne.address).to.equal(sourceOne.address);
			expect(convertedOne.age).to.equal(sourceOne.age);
			expect(convertedOne.gender).to.equal(sourceOne.gender);

			// Make sure unknown property is stripped.
			expect(convertedOne.unknown).not.to.exist;

			expect(errorTwo).not.to.exist;
			expect(convertedTwo).to.exist;
			expect(convertedTwo).is.instanceOf(SampleModel);
			expect(convertedTwo.name).to.equal(sourceTwo.name);
			expect(convertedTwo.address).to.equal(sourceTwo.address);
			expect(convertedTwo.age).not.to.exist;
			expect(convertedTwo.gender).not.to.exist;
		});

		it('Should not map unknown properties', () => {
			// Arrange
			let source = {
					name: 'Gennova123',
					address: 'Unlimited length street name',
					hobbies: ['sport', 'books'],
					loveMovie: false
				};
			let error, converted;

			// Act
			try {
				converted = translator.whole(source, false);
			} catch (err) {
				error = err;
			}

			// Assert
			expect(error).not.to.exist;
			expect(converted).to.exist;
			expect(converted).is.instanceOf(SampleModel);
			expect(converted.name).to.equal(source.name);
			expect(converted.address).to.equal(source.address);
			expect(converted['hobbies']).not.to.exist;
			expect(converted['loveMovie']).not.to.exist;
		});

		it('Should throw an error object if invalid and no error callback is given', () => {
			// Arrange
			let source = {
				};

			// Act
			let error, converted;

			try {
				converted = translator.whole(source, false);
			} catch (err) {
				error = err;
			}

			// Assert
			expect(converted).not.to.exist;
			expect(error).to.exist;
		});

		it('Should pass an error object to callback if invalid', () => {
			// Arrange
			let source = {
				};

			// Act
			let error, converted;

			converted = translator.whole(source, false, (err) => {
				error = err;
			});

			// Assert
			expect(converted).not.to.exist;
			expect(error).to.exist;
		});

		it('Should blindly convert object if validation is disabled', () => {
			// Arrange
			let source = {
					name: 'ab',
					address: '',
					age: '10'
				};

			// Act
			let error, converted;

			translator.enableValidation = false;
			converted = translator.whole(source, false, (err) => {
				error = err;
			});

			// Assert
			expect(error).not.to.exist;
			expect(converted).to.exist;
			expect(converted.name).to.equal(source.name);
			expect(converted.address).to.equal(source.address);
			expect(converted.age).to.equal(source.age);
		});

	}); // END describe 'whole'
	
	describe('partial', () => {
		it('Should copy properties with value', () => {
			// Arrange
			let source = {
					name: 'gen-no-va',
					// address: '^!@' => not specified, although this property is required
				};
			let error, converted;

			// Act
			try {
				converted = translator.partial(source, false);
			} catch (err) {
				error = err;
			}

			// Assert
			expect(error).not.to.exist;
			expect(converted).to.exist;
			expect(converted).is.instanceOf(SampleModel);
			expect(converted.name).to.equal(source.name);
			expect(converted.address).not.to.exist;
			expect(converted.age).not.to.exist;
			expect(converted.gender).not.to.exist;
		});
	}); // END describe 'partial'
});