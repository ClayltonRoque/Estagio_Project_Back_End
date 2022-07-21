import { Router } from "express";
import { selectColoborador ,selectColoboradores, insertColoborador, updateColoborador, deleteColoborador, insertColoborador_Login, selectColoboradores_Login} from "./controller/coloborator.js";

const router = Router();

router.get('/', (req, res)=>{
    res.json({
        "statusCode": 200,
        "msg": "Api Rodando"
    })
})

router.get('/coloborador', selectColoborador)
router.get('/coloboradores', selectColoboradores)
router.get('/coloboradores_login', selectColoboradores_Login)
router.post('/coloborador', insertColoborador)
router.post('/coloborador_login', insertColoborador_Login)
router.put('/coloborador', updateColoborador)
router.delete('/coloborador', deleteColoborador)

export default router;