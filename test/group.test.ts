import { describe, it, expect } from 'bun:test'
import { Elysia } from '../src'
import { req } from './utils'

describe('group', () => {
	it('delegate onRequest', async () => {
		const app = new Elysia()
			.get('/', () => 'A')
			.group('/counter', (app) =>
				app
					.state('counter', 0)
					.onRequest(({ store }) => {
						store.counter++
					})
					.get('', ({ store: { counter } }) => counter)
			)

		await app.handle(req('/'))
		const res = await app.handle(req('/counter')).then((r) => r.text())

		expect(res).toBe('2')
	})

	it('decorate group', async () => {
		const app = new Elysia().group('/v1', (app) =>
			app.decorate('a', 'b').get('/', ({ a }) => a)
		)

		const res = await app.handle(req('/v1')).then((x) => x.text())

		expect(res).toBe('b')
	})
})
