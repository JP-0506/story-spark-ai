import { Router } from "express";
import { subscribe, verify, unsubscribe } from "./newsletter.controller";

const router = Router();

router.post("/subscribe", subscribe);
router.get("/verify/:token", verify);
router.post("/unsubscribe", unsubscribe);

export const NewsletterRouter = router; 