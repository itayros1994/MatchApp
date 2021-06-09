import { Component } from 'react';
import { EventPostPreview } from '../cmps/EventPostPreview';
import { connect } from 'react-redux';
import { utilService } from '../services/utilService';
import { SendIcon } from '../cmps/icon-cmps/sendIcon';

class _EventPostList extends Component {
  state = {
    post: {
      txt: '',
      author: {
        fullname: this.props.loggedInUser.fullname,
        imgUrl: this.props.loggedInUser.imgUrl,
      },
    },
  };

  handleChange = (ev) => {
    const field = ev.target.name;
    const value = ev.target.value;
    this.setState({ post: { ...this.state.post, [field]: value } });
  };

  onAddPost = async () => {
    const post = this.state.post;
    post.createdAt = Date.now();
    post.id = utilService.makeId();
    await this.props.addMsg(post);
    this.setState({ post: { ...this.state.post, txt: '' } });
  };

  onRemovePost = (postId) => {
    this.props.removePost(postId);
    this.setState({ post: { ...this.state.post, txt: '' } });
  };

  render() {
    const { posts } = this.props;
    const { post } = this.state;

    return (
      <section className="posts-main-container flex column">
        <article className="posts-container">
          <div className="send-post-conatiner">
            <input
              type="text"
              className="posts-input"
              placeholder="Whats On Your Mind"
              name="txt"
              value={post.txt}
              onChange={this.handleChange}
            />
            <button className="send-post-btn" onClick={this.onAddPost}>
              <SendIcon />
            </button>
          </div>
          {posts.map((post) => {
            return (
              <EventPostPreview
                onRemovePost={this.onRemovePost}
                post={post}
                key={post.postId}
              />
            );
          })}
        </article>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    loggedInUser: state.userModule.loggedInUser,
  };
}

const mapDispatchToProps = {};

export const EventPostList = connect(
  mapStateToProps,
  mapDispatchToProps
)(_EventPostList);
