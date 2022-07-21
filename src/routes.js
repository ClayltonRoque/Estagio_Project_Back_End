import { Router } from "express";
import { selectColoboradores, insertColoborador, updateColoborador, deleteColoborador} from "./controller/coloborator.js";
import { selectColoboradores_Login, insertColoborador_Login, updateColoborador_Login, deleteColoborador_Login, coloborador_Authenticate} from "./controller/coloborator.js";
import { correctJwt } from "./auth.js";

const router = Router();

router.get('/', (req, res)=>{
    res.json({
        "statusCode": 200,
        "msg": "Api Rodando"
    })
})

router.get('/coloboradores', selectColoboradores)
router.post('/coloborador',correctJwt, insertColoborador)
router.put('/coloborador',correctJwt, updateColoborador)
router.delete('/coloborador',correctJwt, deleteColoborador)

router.get('/coloboradores_login', selectColoboradores_Login)
router.post('/coloborador_login', insertColoborador_Login)
router.put('/coloborador_login',correctJwt, updateColoborador_Login)
router.delete('/coloborador_login',correctJwt, deleteColoborador_Login)
router.post('/coloborador_authenticate', coloborador_Authenticate)



export default router;