// The Route file is used to set up the HTTP request on the endpoints.
import Router from 'express';
const router = Router();

import {createPendingMatch, getPendingMatches} from './matching.controller.js';

router.route("/").post(createPendingMatch);
router.route("/").get(getPendingMatches);

export default router;