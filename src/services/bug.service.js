import Axios from 'axios'

var axios = Axios.create({
    withCredentials: true,
})

export const bugService = {
    query,
    getById,
    save,
    remove,
}
const BASE_URL = '//localhost:3000/api/bug/'


// filterBy = {}
async function query() {
    try {
        var { data: bugs } = await axios.get(BASE_URL)

        // if (filterBy.txt) {
        //     const regExp = new RegExp(filterBy.txt, 'i')
        //     cars = cars.filter(car => regExp.test(car.vendor))
        // }

        // if (filterBy.minSpeed) {
        //     cars = cars.filter(car => car.speed >= filterBy.minSpeed)
        // }
        return bugs
    } catch (err) {
        console.log(err)
        throw err
    }
}

async function getById(bugId) {
    try {
        const { data: bug } = await axios.get(BASE_URL + bugId)
        return bug
    } catch (err) {
        console.log(err)
        throw err
    }
}

function remove(bugId) {
    try {
        return axios.get(BASE_URL + bugId + '/remove')
    } catch (err) {
        console.log(err)
        throw err
    }
}

async function save(bug) {
    try {
        const { _id, title, severity, description} = bug
        const createdAt= Date.now()
        const queryStrParams = `save?_id=${_id || ''}&title=${title}&description=${description}&severity=${severity}&createdAt=${createdAt}`

        var { data: savedBug } = await axios.get(BASE_URL + queryStrParams)
        console.log(savedBug)
        return savedBug
    } catch (err) {
        console.log(err)
        throw err
    }
}

