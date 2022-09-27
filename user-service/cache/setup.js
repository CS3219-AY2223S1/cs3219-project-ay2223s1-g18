import redis from 'redis'

export async function startRedisClient () {
  const client = redis.createClient({
    port: process.env.USER_REDIS_PORT
  })

  client.on('connect', () => {
    console.log('Connected to Redis Client successfully!')
  })

  client.on('ready', () => {
    console.log('Redis Client is ready to be used!')
  })

  client.on('error', (err) => {
    console.error('Error in starting Redis Client:', err)
  })

  client.connect()
  return client
}
