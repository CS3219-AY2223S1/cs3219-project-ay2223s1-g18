// The controller file runs the service function and returns the status codes.
import MatchingService from './matching.service.js';

export { createPendingMatch, getPendingMatches };

const createPendingMatch = (req, res) => {
    const { name, difficulty } = req.body;
    MatchingService
        .createPendingMatch(name, difficulty)
        .then((response) => {
            return res.status(201).json({
                status: true,
                response,
            });
        })
        .catch((err) => {
            console.log(err)
            return res.status(500).json({ status: false, err });
        });
};

const getPendingMatches = (req, res) => {
    MatchingService
        .getPendingMatches()
        .then((response) => {
            return res.status(201).json({
                status: true,
                response,
            });
        })
        .catch((err) => {
            console.log(err)
            return res.status(500).json({ status: false, err });
        });
};