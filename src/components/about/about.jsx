import React, {Component} from 'react';

import Static from '../static/static.jsx';
import Hero from '../hero/hero.jsx';
import greetings from './greetings.json';
import PostContainer from '../../containers/post_container.jsx';

class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      greetingIndex: 0
    };
  }

  render() {
    const {post} = this.props;
    const {markdown, html} = post || {};
    return (
      <div>
        <Hero
          text={greetings[this.state.greetingIndex]}
          image={post ? post.image : null}
        />
        <Static markdown={markdown} html={html}/>
      </div>
    );
  }

  componentDidMount() {
    this.greetingChangeInterval = setInterval(() => {
      if (this.state.greetingIndex === (greetings.length - 1)) {
        return this.setState({greetingIndex: 0});
      }
      this.setState({greetingIndex: this.state.greetingIndex + 1});
    }, 2000);
  }

  componentWillUnmount() {
    if (this.greetingChangeInterval) {
      clearInterval(this.greetingChangeInterval);
    }
  }
}

export default function(props) {
  return (
    <PostContainer slug='about'>
      <About/>
    </PostContainer>
  );
}
