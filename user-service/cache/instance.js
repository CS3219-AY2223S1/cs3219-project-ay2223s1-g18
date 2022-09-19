import { startRedisClient } from './setup.js'

export default class RedisInstance {
    constructor() {
        this.getRedisClient()
    }

    async getRedisClient() {
        this.redisClient = await startRedisClient()
    }
    async getObject(key) {
        return await this.redisClient.GET(key);
    } 

    async createObject(key, value) {
        return await this.redisClient.SET(key, value);
    } 

    async setExpiryOfObject(key, value) {
        return await this.redisClient.EXPIREAT(key, value);
    } 

}