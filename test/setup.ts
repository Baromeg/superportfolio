import mongoose from 'mongoose'

beforeAll(async () => {
  const mongoUri: string = 'mongodb://localhost/portfolioDB-test'

  mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
})

afterAll(async () => {
  await mongoose.disconnect()
  await mongoose.connection.close()
})
