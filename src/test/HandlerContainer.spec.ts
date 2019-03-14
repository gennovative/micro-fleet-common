import * as chai from 'chai'
import * as spies from 'chai-spies'

import { injectable, IDependencyContainer, DependencyContainer,
    HandlerContainer, CriticalException, serviceContext } from '../app'

chai.use(spies)
const expect = chai.expect


const NAME = 'gennova',
    AGE = 18,
    IDENTIFIER = 'abcXYZ'

interface IDummy {
    echoName(name: string): string
    doubleName(name: string): string
    echoAge(age: number): number
}

@injectable()
class Dummy implements IDummy {

    public echoName(name: string): string {
        return name
    }

    public doubleName(name: string): string {
        return name + name
    }

    public echoAge(age: number): number {
        return age
    }
}

describe('HandlerContainer', () => {
    let container: IDependencyContainer

    beforeEach(() => {
        container = new DependencyContainer()
        serviceContext.setDependencyContainer(container)
        container.bind<IDummy>(IDENTIFIER, Dummy).asSingleton()
    })

    afterEach(() => {
        HandlerContainer.instance.clear()
        serviceContext.setDependencyContainer(null)
        container.dispose()
        container = null
    })

    describe('register', () => {
        it('Should handle one action', () => {
            // Arrage
            const dummy = container.resolve<IDummy>(IDENTIFIER),
                echoSpy = chai.spy.on(dummy, 'echoName')

            // Act
            const proxyFn = HandlerContainer.instance.register('echoName', IDENTIFIER) as Function

            // Assert
            const result = proxyFn(NAME)
            expect(result).to.equal(NAME)
            expect(echoSpy).to.be.called.once
        })

        it('Should handle multiple actions', () => {
            // Arrage
            const dummy = container.resolve<IDummy>(IDENTIFIER),
                nameSpy = chai.spy.on(dummy, 'echoName'),
                ageSpy = chai.spy.on(dummy, 'echoAge')

            // Act
            const [proxyNameFn, proxyAgeFn] = HandlerContainer.instance.register(['echoName', 'echoAge'], IDENTIFIER) as Function[]

            // Assert
            const name = proxyNameFn(NAME),
                age = proxyAgeFn(AGE)
            expect(name).to.equal(NAME)
            expect(age).to.equal(AGE)
            expect(nameSpy).to.be.called.once
            expect(ageSpy).to.be.called.once
        })
    }) // END describe 'register'

    describe('resolve', () => {
        it('Should look up a registered action', () => {
            // Arrage
            HandlerContainer.instance.register('echoName', IDENTIFIER)

            // Act
            const func = HandlerContainer.instance.resolve('echoName', IDENTIFIER)

            // Assert
            const result = func(NAME)
            expect(result).to.equal(NAME)
        })

        it('Should produce a handler with factory', () => {
            // Arrage
            HandlerContainer.instance.register('callMyName', IDENTIFIER,
                obj => obj.doubleName)

            // Act
            const func = HandlerContainer.instance.resolve('callMyName', IDENTIFIER)

            // Assert
            const result = func(NAME)
            expect(result).to.equal(NAME + NAME)
        })

        it('Should throw exception if attempting to resolve an unregistered action', () => {
            // Act
            try {
                const func: Function = HandlerContainer.instance.resolve('echoName', IDENTIFIER)
                expect(func).not.to.exist
            } catch (err) {
                console.error(err)
                expect(err).to.exist
                expect(err).to.be.instanceOf(CriticalException)
                expect(err.message).to.contain('was not registered')
            }
        })

        it('Should throw exception if resolved function does not exist', () => {
            // Arrage
            HandlerContainer.instance.register('nonexistFunc', IDENTIFIER)

            // Act
            try {
                const func: Function = HandlerContainer.instance.resolve('nonexistFunc', IDENTIFIER)
                expect(func).not.to.exist
            } catch (err) {
                console.error(err)
                expect(err).to.exist
                expect(err).to.be.instanceOf(CriticalException)
                expect(err.message).to.contain('does not exist')
            }
        })
    }) // END describe 'register'
})
