// The Service file runs the helper function
import Helper from './helper.js'
import MatchingModel from './matching.model.js'

export default class MatchingService {
    static async createPendingMatch(name, difficulty, socketId) {
        return new Promise((resolve, reject) => {
            Helper
                .save(MatchingModel, {
                    name,
                    difficulty,
                    socketId,
                })
                .then((res) => {
                    resolve(res);
                })
                .catch((e) => reject(e));
        });
    }

    // Get the first pending match in the queue with the same difficulty
    static async getPendingMatches(difficulty) {
        return new Promise((resolve, reject) => {
            Helper
                .list(MatchingModel, {difficulty: difficulty})
                .then((res) => {
                    if(res.length ===0) {
                        resolve(res); // Return an empty array if no results
                    } else {
                        resolve([res[0].name, res[0].socketId])
                    }
                })
                .catch((e) => reject(e));
        });
    }

    static async deletePendingMatch(name) {
        return new Promise((resolve, reject) => {
            Helper
                .deleteOne(MatchingModel, {
                    name: name
                })
                .then((res) => {
                    resolve(res);
                })
                .catch((e) => reject(e));
        });
    }
}