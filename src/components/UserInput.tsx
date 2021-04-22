import React from 'react';
import '../css/Message.css';

interface props {
    AnswerList: Array<string>,
    OnAnswer: Function
}

interface state {
    Selected: string
}

class UserInput extends React.Component<props, state> {

    Selector: HTMLSelectElement|null = null;

    constructor(props: props) {
        super(props);
        this.state = {
            Selected: ""
        }
    }

    render() {
        return (
            <div className="Message">
                <div className="MsgBefore Black"></div>
                <div className="Msg">
                    <select defaultValue="" ref={(e)=>{this.Selector=e}} onChange={()=>{this.setState({ Selected: (this.Selector as HTMLSelectElement).value })}} >
                        <option value="" disabled>선택</option>
                        {
                            this.props.AnswerList.map((Answer, idx) => {
                                return <option key={idx} value={Answer}>{Answer}</option>
                            })
                        }
                    </select>
                    <span className="UserSubmit" onClick={()=>{this.props.OnAnswer(this.state.Selected);}}>제출</span>
                </div>
            </div>
        )
    }

}

export default UserInput;