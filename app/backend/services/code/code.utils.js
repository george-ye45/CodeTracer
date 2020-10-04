const axios = require('axios')

const _compile = (input) => {
    return new Promise((resolve, reject) => {
        console.log(input.script)
        axios({
            method: 'post',
            falseAuthorization: false,
            url: `https://api.jdoodle.com/v1/execute`,
            headers: { "Content-Type": "application/json",},
            data: input
        }).then(results => {
            if (results.data.output.includes(', in <module>') || results.data.output.includes('File "jdoodle.py",')) {
                let index = results.data.output.lastIndexOf("\n", results.data.output.length - 2)
                results.data.output = results.data.output.substring(index)
            }
            results.data.length === 0 ? resolve(null) : resolve(results.data)
        }).catch(err => {
            console.log(err.data)
            reject(err)
        })

    })
}

module.exports = {_compile}