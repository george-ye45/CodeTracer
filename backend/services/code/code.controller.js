const axios = require('axios')
const code_utils = require('./code.utils')
require('dotenv').config()

const version = 3
const clientId = process.env.CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET

const getTester = (number, language, category) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url: `http://localhost:${process.env.PORT || 5000}/api/getQuestions`
        }).then((results) => {
            let tester = results.data.filter(item => {
                return item.number === number && item.language === language && item.category == category
            })
            resolve(tester[0].tester)
        })
    })

}


const submission = (code, language) => {
    let obj = {}
    obj.clientId = clientId
    obj.clientSecret = clientSecret
    obj.script = code
    if (language === 'python') {
        obj.language = 'python3'
    } else if (language === 'javascript'){
        obj.language = 'nodejs'
    } else {
        obj.language = language
    }
    obj.versionIndex = version
    return new Promise((resolve, reject) => {
        code_utils.compile(obj).then((data) => {
            resolve(data)
        }).catch((err) => {
            reject(err)
        })
    })
}




const getSol = (number) => {
    return new Promise((resolve, reject) => {
        code_utils.compileSol(number).then((data) => {
            resolve(data)
        }).catch(err => {
            reject(err)
        })
    })
}

const api = {submission, getSol, getTester}

module.exports = api