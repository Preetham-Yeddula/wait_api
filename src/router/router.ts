import express, { Router } from 'express';
import * as Control from '../controller/controller'
export let router = express.Router();


router.get("/get_test_0",Control.get_test_0)

router.get("/get_test_1",Control.get_test_1)

router.get("/get_test_2",Control.get_test_2)

router.post("/post_test_0",Control.post_test_0)

router.post("/post_test_1",Control.post_test_1)

router.post("/post_test_2",Control.post_test_2)

