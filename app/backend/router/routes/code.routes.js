const api = '/api'
const python_handler = require('../../services/code/code.controller')
let fs = require('fs')
const questions_db = require('./../../models/question.model')
const categories_db = require('../../models/category.model')
const feedback_db = require('./../../models/feedback.model')

module.exports.set = (app) => {

    app.post(`${api}/feedBack`, (req, res) => {
        let feedback = new feedback_db({...req.body})
        feedback.save().then(result => {
            res.send(result)
        }).catch(err => { res.status(404).send({ error: err }) })

    })

    app.get(`${api}/getQuestions`, (req, res) => {
        let questions = questions_db.find().then(results => {
            res.send(results)
        }).catch(err => {
            res.status(404).send({error: err})
        })
    })

    app.get(`${api}/getCategories`, (req, res) => {
        let categories = categories_db.find().then(results => {
            res.send(results)
        }).catch(err => {
            res.status(404).send({error: err})
        })
    })

    app.post(`${api}/code`, (req, res) => {
        let code = req.body.code
        let question_number = req.body.question_number
        let language = req.body.language
        let result = {}
        if (question_number !== null) {

            python_handler._getTester(question_number, language).then((data) => {
                if (language === 'java') {
                    header = `public class Tester{
                        ${code}

                        ${data}
                    }`
                } else {
                    code = code + "\n\n" + data
                }
                python_handler._submission(code, language).then((result) => {
                    res.send(result)
                })
            }).catch(err => {
                res.send(err)
            })
        } else {
            python_handler._submission(code, language).then((data) => {
                result.user = data
                res.send(result)
            }).catch(err => {
                res.send(err)
            })
            

        }
    })


}