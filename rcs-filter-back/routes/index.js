import e from "express";
const router = e.Router();
import check from '../controller/index.js';
import {save} from '../service/index.js';

router.post("/check/single", check.single);

router.post("/check/multiple", save.single('file'), check.multiple);

export default router;