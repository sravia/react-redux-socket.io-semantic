import React, { Component } from 'react';
import { USER_CONNECTED,USER_DISCONNECTED } from '../constants/SocketActionTypes';
import PropTypes from 'prop-types';

class Messages extends Component {
    componentDidUpdate(){
        this.scrollToBottom();
    }
    
    scrollToBottom() {
        const { messages } = this.refs;
        messages.scrollTop = messages.scrollHeight - messages.clientHeight;
    }

    render(){
        const {messages,name} = this.props;

        return (
            <div className='row messages' ref={`messages`}>
            {messages.map(m => {
                let template;
                const classNames = ['message']

                if(m.type === USER_CONNECTED) classNames.push('connected')
                if(m.type === USER_DISCONNECTED) classNames.push('disconnected')
                name === m.name ? classNames.push('personal') : classNames.push('public')

                switch(m.type){
                    case USER_CONNECTED:
                        template = (
                            <span><strong>{m.name}</strong> has connected</span>
                        )
                    break;
                    case USER_DISCONNECTED:
                        template = (
                            <span><strong>{m.name}</strong> has disconnected</span>
                        )
                    break;
                    default:
                        const date = new Intl.DateTimeFormat('en-GB', { 
                            year: 'numeric', month: 'numeric', day: 'numeric',
                            hour: 'numeric', minute: 'numeric', second: 'numeric',
                            hour12: false
                        }).format(m.date)
                            
                        template = (
                            <div>
                                <span className='name'><strong>{m.name}</strong></span>
                                <span className='date'>{date}</span>
                                <p>{m.content}</p>
                            </div>
                        )
                    break;
                }

                return (
                    <div  className={classNames.join(' ')} key={m.id}>
                        {template}
                    </div>
                )
            }
            )}
            </div>
        )
    }
}

Messages.propTypes = {
    messages: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired
}

export default Messages;