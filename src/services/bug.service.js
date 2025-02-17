import Axios from 'axios'

var axios = Axios.create({
    withCredentials: true,
})

export const bugService = {
    query,
    getById,
    save,
    remove,
    getPdf,
    getDefaultFilter,
    getBugsForUser
}
const BASE_URL = '//localhost:3000/api/bug/'


async function query(filterBy = {}) {
    try {
        const { data: bugs } = await axios.get(BASE_URL, { params: filterBy })
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
    // } catch (err) {
    //     console.log(err)
    //     throw err
    // }
    } catch (err) {

        if (err.response && err.response.status === 429) {
            throw new Error("You're being rate-limited. Please wait before trying again.");
        }
        throw err; 
}
}



async function remove(bugId) {
    try {
        const { data } = await axios.delete(BASE_URL + bugId)
        return data

    } catch (err) {
        console.log(err)
        throw err
    }
}

async function save(bugToSave) {
    try {
        if (bugToSave._id) {
            const { data: savedBug } = await axios.put(BASE_URL + bugToSave._id, bugToSave)
            return savedBug
        } else {
            const { data: savedBug } = await axios.post(BASE_URL, bugToSave)
            return savedBug

        }
    } catch (err) {
        console.log(err)
        throw err
    }
}

async function getBugsForUser(userId) {
    try {
        const { data: userBugs } = await axios.get(BASE_URL + 'userbugs/'+userId)
        return userBugs
    } catch (err) {
        console.log(err)
        throw err
    }
}



function getPdf() {
    axios.get('//localhost:3000/generate-pdf', { responseType: 'blob' })
        .then(res => {
            const link = Object.assign(document.createElement('a'), {
                href: URL.createObjectURL(res.data),
                download: 'bugs_report.pdf'
            });
            link.click();
        })
        .catch(console.error);
}

function getDefaultFilter() {
    
    return { title: '', minSeverity: '', sortBy: '', sortDirection: 1}
}