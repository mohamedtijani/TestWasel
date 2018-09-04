import {get, del, post} from './request'
import {getUser} from "./users";
import {extractData, Error} from './functions'
import conf from './../config'

export async function getPosts() {
	try {
		const response = await get(conf.BASE_URL_POSTS)
		const data = await extractData(response)
		for (let i = 0; i < data.length; i++) {
			let user = await getUser(data[i].userId)
			data[i].user = user
		}
		return data
	} catch (e) {
		Error(e.message)
	}
}

export async function addPost(title, body) {
	try {
		const b = {
			title,
			body,
			userId: 1
		}
		const response = await post(conf.BASE_URL_POSTS, b)
		console.log("response =>", response)
		const data = await extractData(response)
		let user = await getUser(1)
		data.user = user
		return data
	} catch (e) {
		Error(e.message)
	}
}

export async function deletPost(postId) {
	try {
		const res = await del(`${conf.BASE_URL_POSTS}/${postId}`)
		console.log("response delete item : ", res)
	} catch (e) {
		Error(e.message)
	}
}