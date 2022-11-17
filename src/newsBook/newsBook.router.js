import express from 'express';
import { getNews, getExposedNews, getArchivateNews, modificateNewStatusById } from './newsBook.controller.js';

const router = express.Router();

router.route("/").get(getNews)
router.route("/exposed").get(getExposedNews);
router.route("/archivated").get(getArchivateNews);
router.route("/modificate/:id").patch(modificateNewStatusById)

export default router;