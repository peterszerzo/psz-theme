import React, {Component} from 'react';
import marked from 'marked';

import Hero from './../hero/root.jsx';
import greetings from './greetings.json';

export default class AboutContent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      greetingIndex: 0
    };
  }

  render() {
    const {post} = this.props;
    const {markdown, html} = post || {};
    const body = (html || markdown) ? <div
      className='static'
      dangerouslySetInnerHTML={{__html: html || marked(markdown, {sanitize: true})}}
    /> : null;
    return (
      <div>
        <Hero
          text={greetings[this.state.greetingIndex]}
          image={post ? post.image : null}
        />
        {body}
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
