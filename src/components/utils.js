const BASE_URL = 'https://bunny-todo.herokuapp.com/v1/'


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
    return await fetch(BASE_URL + 'task/' + user_id.toString() + '/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': 'Bearer ' + token
        }
    })
}

export function getUserProfile() {
    let userDetails = localStorage.getItem('userDetails')
    if (userDetails) {
        return userDetails
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
export function setUserProfile(userDetails) {
    if (userDetails.id) {
        localStorage.setItem('userDetails', JSON.stringify(userDetails))
    }

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

export async function updateUser(user_id, form_data) {
    let token = getUserToken()
    return await fetch(BASE_URL + 'user/' + user_id.toString(), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Authorization': 'Bearer ' + token
        },
        body: form_data

    })
}

export async function updateTask(task_id, form_data) {
    let token = getUserToken()
    return await fetch(BASE_URL + 'tasks/' + task_id.toString(), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Authorization': 'Bearer ' + token
        },
        body: form_data
    })
}

export async function registerUser(data) {
    return await fetch(BASE_URL + 'user/create/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(data)
    })
}

export async function createNewtask(user_id, data) {
    let token = getUserToken()
    return await fetch(BASE_URL + 'task/' + user_id.toString() + '/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Authorization': 'Bearer ' + token
        },
        body: data
    })
}