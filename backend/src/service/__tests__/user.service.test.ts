import {
  createUser,
  deleteAllUsers,
  findUser,
  validatePassword
} from '../user.service'
jest.setTimeout(10000) // 1 second
describe('user service', () => {
  afterAll(async () => {
    await deleteAllUsers()
  })

  afterEach(async () => {
    await deleteAllUsers()
  })

  const userPayload = {
    firstName: 'James',
    lastName: 'Smith',
    password: 'SomePassword234',
    email: 'james@smith.com'
  }

  describe('create user', () => {
    describe('given the input is valid', () => {
      it('should create a new user', async () => {
        const user = await createUser(userPayload)

        expect(user.password).toHaveLength(60)

        expect(user.firstName).toBe(userPayload.firstName)

        expect(user.email).toBe(userPayload.email)
      })
    })
  })

  // describe('log user in', () => {
  //   describe('given the password is correct', () => {
  //     it('should return true', async () => {})
  //   })
  // })
})
