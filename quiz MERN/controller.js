//controller/controller.js

import Questions from "../models/questionSchema.js";
import Results from "../models/resultSchema.js";
import questions, { answers } from '../database/data.js'

/** get all questions */
export async function getQuestions(req, res) {
    try {
        let q = await Questions.find();
        if (q.length === 0) {
            await Questions.insertMany({ questions, answers });
            q = await Questions.find();
        }
        res.json(q);
    } catch (error) {
        res.json({ error });
    }
}

/** insert all questinos */
export async function insertQuestions(req, res) {
    try {
        Questions.insertMany({ questions: questions, answers: answers })
    } catch (error) {
        res.json({ error })
    }
}

/** Delete all Questions */
export async function dropQuestions(req, res) {
    try {
        await Questions.deleteMany();
        res.json({ msg: "Questions Deleted Successfully...!" });
    } catch (error) {
        res.json({ error })
    }
}

/** get all result */
export async function getResult(req, res) {
    try {
        const r = await Results.find();
        res.json(r)
    } catch (error) {
        res.json({ error })
    }
}

/** post all result */
export async function storeResult(req, res) {
    try {
        const { username, result, attempts, points, achived } = req.body;
        if (!username && !result) throw new Error('Data Not Provided...!');

        const newResult = await Results.create({ username, result, attempts, points, achived });
        res.json({ msg: "Result Saved Successfully...!", result: newResult });

    } catch (error) {
        res.json({ error });
    }
}

/** delete all result */
export async function dropResult(req, res) {
    try {
        await Results.deleteMany();
        res.json({ msg: "Result Deleted Successfully...!" })
    } catch (error) {
        res.json({ error })
    }
}