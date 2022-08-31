import redis from 'redis';
import dotenv from 'dotenv';
dotenv.config();

export async function startRedisClient() {
    const client = redis.createClient({
        port: process.env.USER_REDIS_PORT
    });
    client.on("connect", (err) => {
        console.log("Client connected to Redis...");
    });
    client.on("ready", (err) => {
        console.log("Redis ready to use");
    });
    client.on("error", (err) => {
        console.error("Redis Client", err);
    });
    client.on("end", () => {
        console.log("Redis disconnected successfully");
    });
    await client.connect();
    return client;
}