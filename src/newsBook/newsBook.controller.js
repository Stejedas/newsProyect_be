import { retrieveAllNews, changeNewStatusById, retrieveStatusById } from "./newsBook.model.js";

const { JWT_SECRET } = process.env

export const getNews = async (req, res) => {
    try {
        let user = await retrieveAllNews();
        res.json(user); // deveulvo la info del usuario
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}
export const getExposedNews = async (req, res) => {
    try {
        let user = await retrieveAllNews();
            user = user.filter(element => element.status === 'exposed');
        res.json(user); // deveulvo la info del usuario
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

export const getArchivateNews = async (req, res) => {
    try {
        let user = await retrieveAllNews();
        user = user.filter(e=> e.status === 'archivate');
        res.json(user); // deveulvo la info del usuario
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

export const modificateNewStatusById = async (req, res) => {
    try {
        const id = req.params.id
        const status = await retrieveStatusById(id)
        if(status === 'exposed'){
            changeNewStatusById(id, 'archivate')
        } else if(status === 'archivate'){
            changeNewStatusById(id, 'delete')
        }
        res.json('Change made')
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}
