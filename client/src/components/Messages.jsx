import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  USER_CONNECTED,
  USER_DISCONNECTED
} from '../constants/SocketActionTypes';

const formatDate = d =>
  new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false
  }).format(d);

class Messages extends Component {
  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    const { messages } = this.refs;
    messages.scrollTop = messages.scrollHeight - messages.clientHeight;
  }

  render() {
    const { messages, name } = this.props;

    return (
      <div className="row messages" ref={messages}>
        {messages.map(m => {
          let template;
          const classNames = ['message'];
          if (name === m.name) classNames.push('personal');
          else classNames.push('public');

          switch (m.type) {
            case USER_CONNECTED:
              classNames.push('connected');
              template = (
                <span>
                  <strong>{m.name}</strong>
                  has connected
                </span>
              );
              break;
            case USER_DISCONNECTED:
              classNames.push('disconnected');
              template = (
                <span>
                  <strong>{m.name}</strong>
                  has disconnected
                </span>
              );
              break;
            default:
              template = (
                <div>
                  <span className="name">
                    <strong>{m.name}</strong>
                  </span>
                  <span className="date">{formatDate(m.date)}</span>
                  <p>{m.content}</p>
                </div>
              );
              break;
          }

          return (
            <div className={classNames.join(' ')} key={m.id}>
              {template}
            </div>
          );
        })}
      </div>
    );
  }
}

Messages.propTypes = {
  messages: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired
};

export default Messages;
