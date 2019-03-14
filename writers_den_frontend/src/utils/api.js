const api = "http://localhost:8000"
// const api = "https://damp-sierra-69821.herokuapp.com"

const headers = {
	'Content-Type': 'application/json'
}

export const checkLogin = (email, password) =>
	fetch(`${api}/access-tokens/`, {
		method: 'POST',
		headers: headers,
		body: JSON.stringify({"email": email, "password": password})
	}).then(res => res.json())
	.then(data => data)


export const getUserDetails = (access_token) =>
	fetch(`${api}/me`, {
		method: 'GET',
		headers: {
			...headers,
			Authorization: `JWT ${access_token}`
		}
	})
	.then(res => res.json())
	.then(data => data)


export const createUser = (name, email, password) =>
	fetch(`${api}/users/`, {
		method: 'POST',
		headers: headers,
		body: JSON.stringify({"name": name,"email": email, "password": password})
	})
	.then(res => res.json())
	.then(data => data)


export const refreshToken = (refresh_token) =>
	fetch(`${api}/access-tokens/refresh/`, {
		method: 'POST',
		headers: headers,
		body: JSON.stringify({"refresh": refresh_token})
	})
	.then(res => res.json())
	.then(data => data)


export const getStories = (access_token) =>
	fetch(`${api}/story`, {
		method: 'GET',
		headers: {
			...headers,
			Authorization: `JWT ${access_token}`
		}
	})
	.then(res => res.json())
	.then(data => data)


export const createStory = (access_token, content, impact, ease, confidence ) =>
	fetch(`${api}/story/`, {
		method: 'POST',
		headers: {
			...headers,
			Authorization: `JWT ${access_token}`
		},
		body: JSON.stringify({"impact": impact, "ease": ease,"content": content, "confidence": confidence})
	})
	.then(res => res.json())
	.then(data => data)


export const deleteStory = (access_token, id) =>
	fetch(`${api}/story/${id}`, {
		method: 'DELETE',
		headers: {
			...headers,
			Authorization: `JWT ${access_token}`
		}
	})
	.then(res => res)
	.then(data => data)


export const updateStory = (access_token, story, id) =>
	fetch(`${api}/story/${id}/`, {
		method: 'PUT',
		headers: {
			...headers,
			Authorization: `JWT ${access_token}`
		},
		body: JSON.stringify(story)
	})
	.then(res => res.json())
	.then(data => data)