import React from 'react';
import '../css/Message.css';

interface props {
    isBot: boolean,
    context: string
}

class Message extends React.Component<props, any> {

    render() {
        return (
            <div className="Message">
                <div className={(this.props.isBot? "Black ":"") + "MsgBefore"}></div>
                <div className="Msg">{this.props.context}</div>
            </div>
        )
    }

}

export default Message;