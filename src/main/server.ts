/* eslint-disable import/first */
import 'module-alias/register'
import env from '@/main/config/env'
import { MongoHelper } from '@/infra/db'

MongoHelper.connect(env.mongoUrl).then(async () => {
  const app = (await import('./config/app')).default

  app.listen(env.port, () => console.log('Server running'))
}).catch(console.error)
