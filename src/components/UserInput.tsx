import React from 'react';
import '../css/Message.css';

interface props {
}

class UserInput extends React.Component<props, any> {

    render() {
        return (
            <div className="Message">
                <div className="MsgBefore" style={{backgroundColor: "rgb(100, 100, 100)"}}></div>
                <div className="Msg">
                    <select>
                        <option value="">asdlkfjal;skdj</option>
                    </select>
                    <span className="UserSubmit">제출</span>
                </div>
            </div>
        )
    }

}

export default UserInput;