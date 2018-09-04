import React, {PureComponent} from 'react'
import {
	TouchableOpacity,
	View,
	Text,
	FlatList,
	Dimensions
} from 'react-native';
import {PropTypes} from 'prop-types';
import {getCommentsByPost} from "../../api/comments";
import {ListAccordion, ListSection, ListItem, FAB, Chip} from 'react-native-paper';

const {height, width} = Dimensions.get('window');

class Post extends PureComponent {

	state = {
		comments: []
	}

	componentDidUpdate(prevProps) {
		if (this.props.selected && !prevProps.selected) {
			this.getComments();
		}
		if (this.props.newComment) {
			this.getComments();
		}
	}

	handleItem = async () => {
		this.props.onPressItem(this.props.id);
	}

	getComments = async () => {
		const comments = await getCommentsByPost(this.props.id)
		this.setState({comments})
	}

	renderItem = () => this.state.comments.map((comment, i) =>
			<View key={i} style={{backgroundColor: '#f2f2f2', margin: 5, justifyContent: 'space-around', borderRadius: 15}}>
				<View><Text style={{color: '#000000', fontSize: 13}}>{comment.name}</Text></View>
				<View><Text style={{color: '#3c589b', fontSize: 11}}>{comment.body}</Text></View>
			</View>)

	deletPost = () => {

	}

	addComment = () => {

	}

	render() {
		const {post, selected, delet, addComment} = this.props
		return (
				<View style={{flex: 1}}>
					<View style={{
						flex: 1,
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center',
						height: height / 11,
						backgroundColor: '#fcfcfc',
						marginTop: 2
					}}>
						<TouchableOpacity
								style={{flex: 2, margin: 5, justifyContent: 'space-around'}}
								onPress={this.handleItem}
						>
							<View><Text style={{color: '#000000', fontSize: 14}}>{post.title}</Text></View>
							<View><Text style={{color: '#3c589b', fontSize: 10}}>{post.user.name}</Text></View>
						</TouchableOpacity>
						{selected &&
						<View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-end'}}>
							<FAB
									small
									icon={'comment'}
									color={'#ffffff'}
									style={{backgroundColor: 'blue'}}
									onPress={addComment}
							/>
							<FAB
									small
									color={'#ffffff'}
									icon={'delete'}
									onPress={delet}
							/>
						</View>}
					</View>
					{selected && <View style={{margin: 5}}>
						<ListItem style={{color: '#3c589b', backgroundColor: '#bff4ff', fontSize: 10, margin: 5, borderRadius: 15}}
											description={post.body}/>
						{this.state.comments.length > 0 && <ListSection title={'Comments'}>{this.renderItem()}</ListSection>}
					</View>}
				</View>
		)
	}
}

Post.propTypes = {
	post: PropTypes.object.isRequired,
	onPressItem: PropTypes.func,
	selected: PropTypes.bool,
	newComment: PropTypes.bool,
	id: PropTypes.number,
	delet: PropTypes.func,
	addComment: PropTypes.func,
};
export default Post