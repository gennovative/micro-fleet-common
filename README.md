# Gennova backend common contracts

Contains interfaces and models which are shared between data services and REST/web services.

---

## INSTALLATION

`npm i`: To install dependencies.
`gulp` to transpile TypeScript.

## DEVELOPMENT

`gulp watch`: To transpile and watch for edit.

## RELEASE

`gulp release`: To transpile and create `app.d.ts` definition file.

## VERSIONS

### 1.2.0
- Added **CacheSettings** and **ICacheConnectionDetail**.

### 1.1.0

* **IRepository**: 
	- Added generic param for id data type, to support composite primary key.
	- Supports write operations (update, path, delete) on multiple items.
	- Differentiates read operations between active and soft-deleted records.
* **TenantPk**: Primary key data type that support multi-tenancy.
* **IHardDelRepository**: Extends from `IRepository`, supports hard deletion.
* **JoiModelValidator**: Added support for composite primary key.
* **SettingItemDataType**: Added 2 types StringArray and NumberArray.
* **DatabaseSettings**: Wraps an array of database settings.
* **DbConnectionSetting**: Wraps an array of database connection settings.
* **Types**: Dependency identifier for `IConfigurationProvider` and `IDependencyContainer` (moved from `back-lib-foundation`).

### 1.0.0

* **PagedArray<T>**: A derived Array class that supports pagination.
* **IRepository**: Provides common methods for repositories.
* Use **BigSInt** (alias of `string`) as data type of model ID.
* **ModelValidatorBase**: Base class that provides methods to validate models.
* **ModelTranslatorBase**: Base class that provides methods to convert arbitrary objects to models.
* **GetSettingRequest**, **GetSettingRequestValidator**, **GetSettingRequestTranslator**: Request model to fetch service settings, comes with its validators and translators.
* **AtomicSession** (use with **AtomicSessionFactory** and **AtomicSessionFlow**): supports transactional queries.
* Test coverage: **100%**