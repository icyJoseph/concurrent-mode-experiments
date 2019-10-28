import React, { Component } from "react";
import { fetchUser, fetchPosts, getNextId } from "./fakeApi";

class ProfilePage extends Component {
  state = {
    user: null
  };

  componentDidMount() {
    this.fetchData(this.props.id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      this.fetchData(this.props.id);
    }
  }

  async fetchData(id) {
    const user = await fetchUser(id)
      .then(res => res)
      .catch(() => null);

    return this.setState({ user });
  }

  render() {
    const { id } = this.props;
    const { user } = this.state;
    if (user === null) {
      return <h1 className="lead">Loading Profile...</h1>;
    }
    return (
      <>
        <h1>{user.name}</h1>
        <ProfileTimeLine id={id} />
      </>
    );
  }
}

class ProfileTimeLine extends Component {
  state = {
    posts: null
  };

  componentDidMount() {
    this.fetchData(this.props.id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      this.fetchData(this.props.id);
    }
  }

  async fetchData(id) {
    const posts = await fetchPosts(id)
      .then(res => res)
      .catch(() => null);

    return this.setState({ posts });
  }

  render() {
    const { posts } = this.state;

    if (posts === null) {
      return <h1 className="lead">Loading Posts...</h1>;
    }
    return (
      <ul>
        {posts.map(({ id, text }) => (
          <li key={id}>{text}</li>
        ))}
      </ul>
    );
  }
}

class App extends Component {
  state = {
    id: 0
  };

  handleClick = () => {
    const next = getNextId(this.state.id);
    return this.setState({ id: next });
  };

  render() {
    return (
      <>
        <div className="container">
          <h1 className="display-2">Experimental</h1>
          <ProfilePage id={this.state.id} />
        </div>
        <div className="fab-bottom">
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.handleClick}
          >
            Next
          </button>
        </div>
      </>
    );
  }
}

export default App;
