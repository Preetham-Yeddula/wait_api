import express, { Router } from 'express';
import * as Control from '../controller/controller'
export let router = express.Router();



router.post("/postTest",Control.postPos)


router.get("/getAll",Control.getTest)

router.get("/test",Control.full_test)
router.get('/monitor', Control.elastic_test)