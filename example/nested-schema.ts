import { Elysia, t } from '../src'

new Elysia()
	.guard(
		{
			schema: {
				query: t.Object({
					name: t.String()
				})
			}
		},
		(app) =>
			app
				.get('/', ({ query }) => 'A', {
					beforeHandle: ({ query }) => {},
					schema: {
						query: t.Object({
							a: t.String()
						})
					}
				})
				.guard(
					{
						schema: {
							headers: t.Object({
								a: t.String()
							})
						}
					},
					(app) =>
						app.get('/a', () => 'A', {
							beforeHandle: ({ query }) => {},
							schema: {
								body: t.Object({
									username: t.String()
								})
							}
						})
				)
	)
	.get('*', () => 'Star now work')
	.listen(8080)
