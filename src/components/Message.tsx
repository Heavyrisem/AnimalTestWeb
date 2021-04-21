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
                <div className="MsgBefore" style={this.props.isBot? {backgroundColor: "rgb(100, 100, 100)"}:{}}></div>
                <div className="Msg">{this.props.context}</div>
            </div>
        )
    }

}

export default Message;