const axios = require('axios');
// Service to use gitlab custom route in server
const _submit = (input) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url: "/api/code",
            headers: { "Content-Type": "application/json"},
            data: input
        }).then(results => {
            results.data.length === 0 ? resolve(null) : resolve(results.data)
        }).catch(err => {
            reject(err)
        })
    })
}


const _submitFeedBack = (input) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url: "/api/feedBack",
            headers: { "Content-Type": "application/json"},
            data: input
        }).then(results => {
            results.data.length === 0 ? resolve(null) : resolve(results.data)
        }).catch(err => {
            reject(err)
        })
    })
}



const _getCategories = () => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url: "/api/getCategories",
        }).then(results => {
            results.data.length === 0 ? resolve(null) : resolve(results)
        }).catch(err => {
            reject(err)
        })
    })
}

const _getQuestions= () => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url: "/api/getQuestions",
        }).then(results => {
            results.data.length === 0 ? resolve(null) : resolve(results)
        }).catch(err => {
            reject(err)
        })
    })
}




const api = {_submit, _getCategories, _getQuestions, _submitFeedBack}

export default api