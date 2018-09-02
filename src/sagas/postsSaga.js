import {
	FETCHING_POSTS,
	FETCHING_POSTS_SUCCESS,
	FETCHING_POSTS_FAILURE,
	SELECTED_POSTS,
	CREATE_POSTS
} from '../constants'
import {put, call, takeEvery, select} from 'redux-saga/effects'


function* fetchPosts() {
	try {


	} catch (e) {

	}
}

function* createPosts(action) {
	try {


	} catch (e) {
	}
}

function* postsSaga() {
	yield takeEvery(CREATE_POSTS, createPosts)
}

export default postsSaga
