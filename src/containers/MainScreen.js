import React, {PureComponent} from 'react'
import {
	View,
	Text,
	FlatList,
	ActivityIndicator,
	Dimensions,
} from 'react-native'
import {
	Modal,
	Dialog,
	DialogContent,
	DialogActions,
	Paragraph,
	Button,
	FAB,
	TextInput,
	HelperText
} from 'react-native-paper';
import {getPosts, deletPost, addPost} from './../api/posts'
import {addComment} from "../api/comments";
import Post from './../components/posts/Post'

const {height, width} = Dimensions.get('window');

class MainScreen extends PureComponent {

	state = {
		posts: [],
		selected: null,
		newCommet: null,
		visibleDialogDelete: false,
		visibleDialogComment: false,
		visibleDialogPost: false,
		name: '',
		massage: '',
		title: '',
		body: ''
	}

	async componentWillMount() {
		const posts = await getPosts()
		this.setState({
			posts
		})
	}

	_keyExtractor = (item, index) => item.id.toString();

	_onPressItem = (id: number) => {
		this.setState({selected: id});
	};

	_handleDeletItem = () => {
		this.setState(prevState => ({visibleDialogDelete: !prevState.visibleDialogDelete}))
	}

	_handleAddComment = () => {
		this.setState(prevState => ({visibleDialogComment: !prevState.visibleDialogComment}))
	}

	_handleAddPost = () => {
		this.setState(prevState => ({visibleDialogPost: !prevState.visibleDialogPost}))
	}

	_deleteItem = async () => {
		await deletPost(this.state.selected)
		const index = this.state.posts.findIndex(post => post.id == this.state.selected)
		this.setState(prevState => ({
			posts: [
				...prevState.posts.slice(0, index),
				...prevState.posts.slice(index + 1)
			],
			visibleDialogDelete: false
		}))
	}

	_addComment = async (item, index) => {
		const {selected, title, body} = this.state
		await addComment(selected, title, body)
		this.setState({newComment: selected, visibleDialogComment: false})
	}

	_addPost = async () => {
		const {title, body} = this.state
		const post = await addPost(title, body)
		this.setState(prevState => ({
			posts: [
					...prevState.posts,
					post,
			],
			visibleDialogPost: false
		}))
	}

	_renderItem = ({item, index}) => (
			<Post
					id={item.id}
					onPressItem={this._onPressItem}
					selected={this.state.selected == item.id}
					delet={this._handleDeletItem}
					addComment={this._handleAddComment}
					newComment={this.state.newComment == item.id}
					post={item}
			/>
	);

	render() {
		return (
				<View>
					<FlatList
							data={this.state.posts}
							extraData={this.state.selected}
							keyExtractor={this._keyExtractor}
							renderItem={this._renderItem}
							ListEmptyComponent={
								<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
									<ActivityIndicator style={{marginTop: height / 2}} size="small" color="#0000ff"/>
								</View>}
							ListHeaderComponent={
								<View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 5}}>
									<Text>Posts</Text>
									<FAB image={"plus"}
											 small
											 style={{backgroundColor: 'green'}}
											 icon="add"
											 onPress={this._handleAddPost}/>
								</View>
							}
					/>
					<Dialog
							visible={this.state.visibleDialogDelete}>
						<DialogContent>
							<Paragraph>You are sure to delete this post</Paragraph>
						</DialogContent>
						<DialogActions>
							<Button color={'blue'} onPress={this._handleDeletItem}>CANCEL</Button>
							<Button color={'blue'} onPress={this._deleteItem}>DELETE</Button>
						</DialogActions>
					</Dialog>
					<Dialog
							visible={this.state.visibleDialogComment}>
						<DialogContent>
							<TextInput label='Title'
												 value={this.state.name}
												 onChangeText={name => this.setState({name})}/>
							<HelperText
									type="error"
									visible={this.state.name === ''}
							>
								the name should not be empty
							</HelperText>
							<TextInput label='Message'
												 value={this.state.message}
												 onChangeText={message => this.setState({message})}/>
							<HelperText
									type="error"
									visible={this.state.message === ''}
							>
								the message should not be empty
							</HelperText>
						</DialogContent>
						<DialogActions>
							<Button color={'blue'} onPress={this._handleAddComment}>CANCEL</Button>
							<Button color={'blue'} onPress={this._addComment}
											disabled={(this.state.body == '' && this.state.title == '')}>ADD</Button>
						</DialogActions>
					</Dialog>
					<Dialog
							visible={this.state.visibleDialogPost}>
						<DialogContent>
							<TextInput label='Title'
												 value={this.state.title}
												 onChangeText={title => this.setState({title})}/>
							<HelperText
									type="error"
									visible={this.state.title === ''}
							>
								the title should not be empty
							</HelperText>
							<TextInput label='Message'
												 value={this.state.body}
												 onChangeText={body => this.setState({body})}/>
							<HelperText
									type="error"
									visible={this.state.body === ''}
							>
								the description should not be empty
							</HelperText>
						</DialogContent>
						<DialogActions>
							<Button color={'blue'} onPress={this._handleAddPost}>CANCEL</Button>
							<Button color={'blue'} onPress={this._addPost}
											disabled={(this.state.body == '' && this.state.title == '')}>ADD</Button>
						</DialogActions>
					</Dialog>
				</View>
		)
	}
}

export default MainScreen