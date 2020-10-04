const axios = require('axios');

const submitCode = (input) => {
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


const submitFeedBack = (input) => {
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



const getCategories = () => {
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

const getQuestions= () => {
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




const api = {submitCode, getCategories, getQuestions, submitFeedBack}

export default api