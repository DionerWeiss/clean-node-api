import request from 'supertest'
import { noCache } from '@/main/middlewares'
import { setupApp } from '@/main/config/app'
import { Express } from 'express'

describe('NoCache Middleware', () => {
  let app: Express

  beforeAll(async () => {
    app = await setupApp()
  })

  test('Should disable cache', async () => {
    app.get('/test_no_cahce', noCache, (req, res) => {
      res.send()
    })
    await request(app)
      .get('/test_no_cahce')
      .expect('cache-control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
      .expect('pragma', 'no-cache')
      .expect('expires', '0')
      .expect('surrogate-control', 'no-store')
  })
})
