import { Router } from "express";
import { selectColoborador ,selectColoboradores, insertColoborador, updateColoborador, deleteColoborador } from "./controller/coloborator.js";

const router = Router();

router.get('/', (req, res)=>{
    res.json({
        "statusCode": 200,
        "msg": "Api Rodando"
    })
})

router.get('/coloborador', selectColoborador)
router.get('/coloboradores', selectColoboradores)
router.post('/coloborador', insertColoborador)
router.put('/coloborador', updateColoborador)
router.delete('/coloborador', deleteColoborador)

export default router;