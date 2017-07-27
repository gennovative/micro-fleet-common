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

### 1.0.0

* `PagedArray<T>`: A derived Array class that supports pagination.
* `IRepository`: Provides common methods for repositories.