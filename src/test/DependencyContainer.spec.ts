import { expect } from 'chai'
import { Container } from 'inversify'

import { IDependencyContainer, DependencyContainer, MinorException,
    decorators as d } from '../app'

const NAME = 'gennova',
    IDENTIFIER = Symbol('abc')

interface IDummy {
    getName(): string
}

@d.injectable()
class Dummy implements IDummy {
    public getName(): string {
        return NAME
    }
}

describe('DependencyContainer', () => {
    describe('bindConstant', () => {
        it('Should return same value everytime', () => {
            // Arrange
            const VALUE = 'abc'
            const container: IDependencyContainer = new DependencyContainer(),
                internalContainer: Container = container['_container']

            // Act
            container.bindConstant<string>(IDENTIFIER, VALUE)

            // Assert
            const instance_1st = internalContainer.get<string>(IDENTIFIER),
                instance_2nd = internalContainer.get<string>(IDENTIFIER),
                instance_3rd = internalContainer.get<string>(IDENTIFIER)

            expect(instance_1st).to.be.a('string')
            expect(instance_2nd).to.be.a('string')
            expect(instance_3rd).to.be.a('string')

            expect(instance_1st).to.equal(VALUE)
            expect(instance_1st).to.equal(instance_2nd) // instance_1st === instance_2nd
            expect(instance_1st).to.equal(instance_3rd) // instance_1st === instance_3rd
            expect(instance_2nd).to.equal(instance_3rd) // instance_2nd === instance_3rd
        })

        it('Should override previous binding with same identifier', () => {
            // Arrange
            const VALUE_OLD = 'abc',
                VALUE_NEW = 'xyz'
            const container: IDependencyContainer = new DependencyContainer(),
                internalContainer: Container = container['_container']

            // Act
            container.bindConstant<string>(IDENTIFIER, VALUE_OLD)
            container.bindConstant<string>(IDENTIFIER, VALUE_NEW)

            // Assert
            const instance_1st = internalContainer.get<string>(IDENTIFIER),
                instance_2nd = internalContainer.get<string>(IDENTIFIER),
                instance_3rd = internalContainer.get<string>(IDENTIFIER)

            expect(instance_1st).to.be.a('string')
            expect(instance_2nd).to.be.a('string')
            expect(instance_3rd).to.be.a('string')

            expect(instance_1st).to.equal(VALUE_NEW)
            expect(instance_1st).to.equal(instance_2nd) // instance_1st === instance_2nd
            expect(instance_1st).to.equal(instance_3rd) // instance_1st === instance_3rd
            expect(instance_2nd).to.equal(instance_3rd) // instance_2nd === instance_3rd
        })
    }) // describe 'bindConstant'

    describe('bind', () => {
        it('Should register dependency to internal container, with string identifier', () => {
            // Arrange
            const container: IDependencyContainer = new DependencyContainer(),
                internalContainer: Container = container['_container']
            let resolveInstance: IDummy

            // Act
            container.bindConstructor<IDummy>('abc', Dummy) // String identifier

            // Assert
            resolveInstance = internalContainer.get<IDummy>('abc')
            expect(resolveInstance).to.be.not.null
            expect(resolveInstance.getName()).to.equal(NAME)
        })

        it('Should register dependency to internal container, with symbol identifier', () => {
            // Arrange
            const container: IDependencyContainer = new DependencyContainer(),
                internalContainer: Container = container['_container']
            let resolveInstance: IDummy

            // Act
            container.bindConstructor<IDummy>(IDENTIFIER, Dummy) // Symbol identifier

            // Assert
            resolveInstance = internalContainer.get<IDummy>(IDENTIFIER)
            expect(resolveInstance).to.be.not.null
            expect(resolveInstance.getName()).to.equal(NAME)
        })

        it('Should return same instance everytime, when registering as singleton', () => {
            // Arrange
            const container: IDependencyContainer = new DependencyContainer(),
                internalContainer: Container = container['_container']

            // Act
            container.bindConstructor<IDummy>(IDENTIFIER, Dummy).asSingleton()

            // Assert
            const instance_1st = internalContainer.get<IDummy>(IDENTIFIER),
                instance_2nd = internalContainer.get<IDummy>(IDENTIFIER),
                instance_3rd = internalContainer.get<IDummy>(IDENTIFIER)

            expect(instance_1st).to.be.not.null
            expect(instance_2nd).to.be.not.null
            expect(instance_3rd).to.be.not.null

            expect(instance_1st).to.equal(instance_2nd) // instance_1st === instance_2nd
            expect(instance_1st).to.equal(instance_3rd) // instance_1st === instance_3rd
            expect(instance_2nd).to.equal(instance_3rd) // instance_2nd === instance_3rd

            expect(instance_1st.getName()).to.equal(NAME)
            expect(instance_2nd.getName()).to.equal(NAME)
            expect(instance_3rd.getName()).to.equal(NAME)
        })

        it('Should create new instance everytime, when registering as transient', () => {
            // Arrange
            const container: IDependencyContainer = new DependencyContainer(),
                internalContainer: Container = container['_container']

            // Act
            container.bindConstructor<IDummy>(IDENTIFIER, Dummy).asTransient() // Default behavior

            // Assert
            const instance_1st = internalContainer.get<IDummy>(IDENTIFIER),
                instance_2nd = internalContainer.get<IDummy>(IDENTIFIER),
                instance_3rd = internalContainer.get<IDummy>(IDENTIFIER)

            expect(instance_1st).to.be.not.null
            expect(instance_2nd).to.be.not.null
            expect(instance_3rd).to.be.not.null

            expect(instance_1st).to.not.equal(instance_2nd) // instance_1st !== instance_2nd
            expect(instance_1st).to.not.equal(instance_3rd) // instance_1st !== instance_3rd
            expect(instance_2nd).to.not.equal(instance_3rd) // instance_2nd !== instance_3rd

            expect(instance_1st.getName()).to.equal(NAME)
            expect(instance_2nd.getName()).to.equal(NAME)
            expect(instance_3rd.getName()).to.equal(NAME)
        })
    }) // describe 'bind'

    describe('dispose', () => {
        it('Should throw exception if called after disposal', () => {
            // Arrange
            const container: IDependencyContainer = new DependencyContainer()
            container.bindConstructor<IDummy>(IDENTIFIER, Dummy)

            // Act
            container.dispose()

            // Assert
            let exception = null
            try {
                container.resolve<IDummy>(IDENTIFIER)
            } catch (ex) {
                exception = ex
            }

            expect(exception).to.be.instanceOf(MinorException)
            expect(exception.message).to.equal('Container has been disposed!')
        })
    }) // describe 'dispose'

    describe('resolve', () => {
        it('Should get dependency from internal container', () => {
            // Arrange
            const container: IDependencyContainer = new DependencyContainer(),
                internalContainer: Container = container['_container']
            let resolveInstance: IDummy

            // Act
            internalContainer.bind<IDummy>(IDENTIFIER).to(Dummy)

            // Assert
            resolveInstance = container.resolve<IDummy>(IDENTIFIER)
            expect(resolveInstance).to.be.not.null
            expect(resolveInstance.getName()).to.equal(NAME)
        })

        it('Should return null if no dependency is found', () => {
            // Arrange
            const container: IDependencyContainer = new DependencyContainer()
            let resolveInstance: IDummy

            // Act
            resolveInstance = container.resolve<IDummy>(IDENTIFIER)

            // Assert
            expect(resolveInstance).to.be.null
        })
    }) // describe 'resolve'

    describe('isBound', () => {
        it('Should check if a dependency is bound or not.', () => {
            // Arrange
            const container: IDependencyContainer = new DependencyContainer(),
                internalContainer: Container = container['_container']

            // Act
            internalContainer.bind<IDummy>(IDENTIFIER).to(Dummy)
            // Assert
            expect(container.isBound(IDENTIFIER)).to.be.true

            // Act
            internalContainer.unbind(IDENTIFIER)
            // Assert
            expect(container.isBound(IDENTIFIER)).to.be.false
        })
    }) // describe 'isBound'

    describe('unbind', () => {
        it('Should not resolve unbound dependency anymore.', () => {
            // Arrange
            const container: IDependencyContainer = new DependencyContainer(),
                internalContainer: Container = container['_container']

            internalContainer.bind<IDummy>(IDENTIFIER).to(Dummy)
            expect(internalContainer.isBound(IDENTIFIER)).to.be.true

            // Act
            container.unbind(IDENTIFIER)

            // Assert
            let resolved
            try {
                resolved = internalContainer.get<IDummy>(IDENTIFIER)
                expect(resolved).not.to.exist
            } catch (err) {
                expect(err.message).to.contain('No matching bindings')
            }
            expect(internalContainer.isBound(IDENTIFIER)).to.be.false
        })
    }) // describe 'isBound'
})
