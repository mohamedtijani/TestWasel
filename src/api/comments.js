import {get, post} from './request'
import {extractData, Error} from './functions'
import conf from './../config'

export async function getCommentsByPost(postId) {
	try {
		const response = await get(`${conf.BASE_URL_POSTS}/${postId}/comments`)
		const data = await extractData(response)
		return data
	} catch (e) {
		Error(e.message)
	}
}

export async function addComment(postId, name, body) {
	try {
		const data = {
			postId,
			name,
			body,
			email: 'aa@aa.aa'
		}
		const response = await post(conf.BASE_URL_COMMENT, data)
	} catch (e) {
		Error(e.message)
	}
}
