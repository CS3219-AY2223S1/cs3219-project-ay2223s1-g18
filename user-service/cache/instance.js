import { startRedisClient } from './setup.js'

export default class RedisInstance {
    constructor() {
        this.redisClient = startRedisClient()
    }

    async getObject(key) {
        return await redisClient.GET(key);
    } 

    async createObject(key, value) {
        return await redisClient.SET(key, value);
    } 

    async setExpiryOfObject(key, value) {
        return await redisClient.EXPIREAT(key, value);
    } 

}