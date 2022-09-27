
import dotenv from 'dotenv'
dotenv.config()

const databaseUri = process.env.ENV === 'PROD' ? process.env.DB_CLOUD_URI : process.env.DB_LOCAL_URI

export async function startMongoDatabase (mongoose) {
  mongoose.connect(databaseUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB database successfully!')
  })

  mongoose.connection.on('error', (err) => {
    console.error(err)
    throw new Error('Failed to connect to MongoDB database!')
  })
};
