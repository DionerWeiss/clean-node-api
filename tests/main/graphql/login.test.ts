import { makeApolloServer } from '@/tests/main/graphql/helpers'
import { MongoHelper } from '@/infra/db'

import { createTestClient } from 'apollo-server-integration-testing'
import { ApolloServer, gql } from 'apollo-server-express'
import { Collection } from 'mongodb'
import { hash } from 'bcrypt'

let accountCollection: Collection
let apolloServer: ApolloServer

describe('Login GraphQL', () => {
  beforeAll(async () => {
    apolloServer = makeApolloServer()
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('Login Query', () => {
    const loginQuery = gql`
      query login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          accessToken
          name
        }
      }
    `

    test('Should return an Account on valid credentials', async () => {
      const password = await hash('123', 12)

      await accountCollection.insertOne({
        name: 'Dioner',
        email: 'dioner@gmail.com',
        password
      })

      const { query } = createTestClient({ apolloServer })
      const res: any = await query(loginQuery, {
        variables: {
          email: 'dioner@gmail.com',
          password: '123'
        }
      })

      expect(res.data.login.accessToken).toBeTruthy()
      expect(res.data.login.name).toBe('Dioner')
    })

    test('Should return an UnauhtorizedError on invalid credentials', async () => {
      const { query } = createTestClient({ apolloServer })
      const res: any = await query(loginQuery, {
        variables: {
          email: 'dioner@gmail.com',
          password: '123'
        }
      })

      expect(res.data).toBeFalsy()
      expect(res.errors[0].message).toBe('Unauthorized')
    })
  })

  describe('SignUp Mutation', () => {
    const signUpMutation = gql`
      mutation signUp($name: String!, $email: String!, $password: String!, $passwordConfirmation: String!) {
        signUp(name: $name, email: $email, password: $password, passwordConfirmation: $passwordConfirmation) {
          accessToken
          name
        }
      }
    `

    test('Should return an Account on valid data', async () => {
      const { mutate } = createTestClient({ apolloServer })
      const res: any = await mutate(signUpMutation, {
        variables: {
          name: 'Dioner',
          email: 'dioner@gmail.com',
          password: '123',
          passwordConfirmation: '123'
        }
      })

      expect(res.data.signUp.accessToken).toBeTruthy()
      expect(res.data.signUp.name).toBe('Dioner')
    })
  })
})
