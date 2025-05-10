import express from "express";
import { count, deleteByIncident, fetch, fetchbyid, registration, updatebyIndicate } from "../controllers/control.js"; 

const router = express.Router();

router.post('/register', registration);
router.put('/update/:id', updatebyIndicate);
router.delete('/delete/:id',deleteByIncident)
router.get('/fetchbyid/:id',fetchbyid)
router.get('/fetch',fetch)
router.get('/count',count)

export default router;