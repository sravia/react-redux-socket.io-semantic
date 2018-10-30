import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  USER_CONNECTED,
  USER_DISCONNECTED
} from '../../../constants/SocketActionTypes';

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

class Messages extends PureComponent {
  static propTypes = {
    messages: PropTypes.array.isRequired,
    user: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string
    }).isRequired
  };

  constructor() {
    super();
    this.messageRef = React.createRef();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    const { current } = this.messageRef;
    current.scrollTop = current.scrollHeight - current.clientHeight;
  }

  render() {
    const { messages, user } = this.props;

    return (
      <div className="row messages" ref={this.messageRef}>
        {messages.map(m => {
          let template;
          const classNames = ['message'];
          if (user.name === m.user.name) classNames.push('personal');
          else classNames.push('public');

          switch (m.type) {
            case USER_CONNECTED:
              classNames.push('connected');
              template = (
                <>
                  <strong>{`${m.user.name} `}</strong>
                  has connected
                </>
              );
              break;
            case USER_DISCONNECTED:
              classNames.push('disconnected');
              template = (
                <>
                  <strong>{`${m.user.name} `}</strong>
                  has disconnected
                </>
              );
              break;
            default:
              template = (
                <>
                  <span className="name">
                    <strong>{m.user.name}</strong>
                  </span>
                  <span className="date">{formatDate(m.date)}</span>
                  <p>{m.content}</p>
                </>
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

export default Messages;
