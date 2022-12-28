import { Router } from "express";
import {
  selectColoboradores,
  insertColoborador,
  updateColoborador,
  deleteColoborador,
  coloborador_Authenticate,
} from "./controller/coloborator.js";
import {
  insertService,
  deleteService,
  finalizeService,
  attendenceService,
  selectServices,
} from "./controller/services.js";
import { correctJwt } from "./auth.js";

const router = Router();

router.get("/", (req, res) => {
  res.json({
    statusCode: 200,
    msg: "Api Rodando",
  });
});

router.get("/coloboradores", correctJwt, selectColoboradores);
router.post("/coloborador", insertColoborador);
router.put("/coloborador", correctJwt, updateColoborador);
router.delete("/coloborador", correctJwt, deleteColoborador);

router.get("/services", selectServices);
router.post("/services", correctJwt, insertService);
router.delete("/services", correctJwt, deleteService);

// Authenticate
router.post("/coloborador_authenticate", coloborador_Authenticate);

// Finalize service and send email
router.post("/finalize_service", correctJwt, finalizeService);
router.post("/attendence_service", attendenceService);

export default router;
