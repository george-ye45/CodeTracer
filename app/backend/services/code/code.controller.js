const axios = require('axios')
const python_utils = require('./code.utils')
require('dotenv').config()

const version = 3
const clientId = process.env.CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET

const _getTester = (number, language) => {
    console.log(language)
    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url: `http://localhost:${process.env.PORT || 5000}/api/getQuestions`
        }).then((results) => {
            let tester = results.data.filter(item => {
                return item.number === number && item.language === language
            })
            resolve(tester[0].tester)
        })
    })

}


const _submission = (code, language) => {
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
    console.log(code)
    return new Promise((resolve, reject) => {
        python_utils._compile(obj).then((data) => {
            resolve(data)
        }).catch((err) => {
            reject(err)
        })
    })
}




const _getSol = (number) => {
    return new Promise((resolve, reject) => {
        python_utils._compileSol(number).then((data) => {
            resolve(data)
        }).catch(err => {
            reject(err)
        })
    })
}

const api = {_submission, _getSol, _getTester}

module.exports = api