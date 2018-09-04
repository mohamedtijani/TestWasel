import { post, get, put, del } from './request'
import {extractData, Error} from './functions'
import conf from './../config'

export async function getUser(id) {
	try{
		const response = await get(`${conf.BASE_URL_USERS}/${id}`)
		const data = await extractData(response)
		return data
	} catch (e) {
		Error(e.message)
	}
}