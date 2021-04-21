import React from 'react';
import '../css/Message.css';

interface props {
}

class UserInput extends React.Component<props, any> {

    render() {
        return (
            <div className="Message">
                <div className="MsgBefore Black"></div>
                <div className="Msg">
                    <select>
                        <option value="">Selection</option>
                        <option value="">Selection</option>
                        <option value="">Selection</option>
                        <option value="">Selection</option>
                        <option value="">Selection</option>
                    </select>
                    <span className="UserSubmit">제출</span>
                </div>
            </div>
        )
    }

}

export default UserInput;