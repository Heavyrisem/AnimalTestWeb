import React from 'react';
import '../css/Message.css';

interface props {
    isBot: boolean,
    context: string
}

class Message extends React.Component<props, any> {
    Comp: HTMLDivElement | null = null;
    componentDidMount() {
        // MountAnimation
        // Focus
        if (this.Comp) {
            this.Comp.scrollIntoView({behavior: "smooth"});
        }
    }

    render() {
        return (
            <div ref={(e)=>{this.Comp=e}} className="Message">
                <div className={(!this.props.isBot? "Black ":"") + "MsgBefore"}></div>
                <div className="Msg">{this.props.context}</div>
            </div>
        )
    }

}

export default Message;