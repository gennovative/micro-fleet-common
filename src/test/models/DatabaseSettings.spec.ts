import { expect } from 'chai';
import { DbSettingKeys as S, DbClient } from 'back-lib-common-constants';
import { NotImplementedException } from 'back-lib-common-util';

import { SettingItem, SettingItemDataType, DbConnectionSetting, DbConnectionSettingConstructor,
	DatabaseSettings } from '../../app/';


describe('DatabaseSettings', () => {
	describe('constructor', () => {
		it('Should create an instance with one setting', () => {
			// Act
			let target = new DatabaseSettings();

			// Assert
			expect(Number.isInteger(target.total)).to.be.true;
			expect(target.total).to.equal(0);
			expect(target[0].name).to.equal(S.DB_NUM_CONN);
			expect(target[0].value).to.equal('0');
		});

		it('Should create an instance with initial connections', () => {
			// Arrange
			let connOne = new DbConnectionSetting({
					engine: DbClient.POSTGRESQL,
					host: 'localhost',
					username: 'postgre',
					password: 'postgre',
					database: 'postgre'
				}),
				connTwo = new DbConnectionSetting({
					engine: DbClient.SQLITE3,
					filePath: '/var/data/storage.sqlite3'
				}),
				connThree = new DbConnectionSetting({
					engine: DbClient.MYSQL,
					connectionString: 'mysql://user@pass'
				});

			// Act
			let target = new DatabaseSettings(connOne, connTwo, connThree);

			// Assert
			expect(Number.isInteger(target.total)).to.be.true;
			expect(target.total).to.equal(3);
			expect(target[0].name).to.equal(S.DB_NUM_CONN);
			expect(target[0].value).to.equal('3');
			expect(target[1].name).to.equal(S.DB_ENGINE + '0');
			expect(target[1].value).to.equal(DbClient.POSTGRESQL);
			expect(target[6].name).to.equal(S.DB_ENGINE + '1');
			expect(target[6].value).to.equal(DbClient.SQLITE3);
			expect(target[8].name).to.equal(S.DB_ENGINE + '2');
			expect(target[8].value).to.equal(DbClient.MYSQL);
		});
	}); // END describe 'constructor'
});