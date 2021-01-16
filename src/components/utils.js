const BASE_URL = 'http://localhost:8000/v1/'

export default function getUserToken() {
    try {
        const jwtString = localStorage.getItem('token')
        const userToken = JSON.parse(jwtString)
        return userToken?.access
    } catch (e) {
        return null
    }
}

export function setUserToken(userToken) {
    localStorage.setItem('token', JSON.stringify(userToken))
}

export function clearUserToken() {
    try {
        localStorage.clear();
    } catch (e) {
        return null;
    }
}

export async function logInUser(userData) {
    return fetch(BASE_URL + 'auth/login/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(userData)
    })
        .then(data => data.json())
        .then(data => data)
}

export async function getUserToDO(user_id) {
    let token = getUserToken()
    return await fetch(BASE_URL + 'task/' + user_id.toString(), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': 'Bearer ' + token
        }
    })
}

export function getUserProfile() {
    let user_details = localStorage.getItem('user_details')
    if (user_details) {
        return user_details
    }
    let token = getUserToken()
    return fetch(BASE_URL + 'user/profile', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': 'Bearer ' + token
        }
    }).then(data => data.json())
        .then(data => {
            setUserProfile(data)
            return data
        })
}
export function setUserProfile(user_details) {
    localStorage.setItem('user_details', JSON.stringify(user_details))
}

export async function getAllUsers() {
    let token = getUserToken()
    return await fetch(BASE_URL + 'users/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': 'Bearer ' + token
        }
    })
}

export async function deleteUser(user_id) {
    let token = getUserToken()
    return await fetch(BASE_URL + 'user/' + user_id.toString(), {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': 'Bearer ' + token
        }
    })
}

export async function deleteTask(task_id) {
    let token = getUserToken()
    return await fetch(BASE_URL + 'tasks/' + task_id.toString(), {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': 'Bearer ' + token
        }
    })
}