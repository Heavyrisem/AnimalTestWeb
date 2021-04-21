import React from 'react';
import Message from './components/Message';
import UserInput from './components/UserInput';

import Data from './Data.json';

interface state {
    UserAnswerTurn: boolean
}

class Master extends React.Component<any, state> {

    constructor(props: any) {
        super(props);
        this.state = {
            UserAnswerTurn: true
        }
        this.setState({
            UserAnswerTurn: true
        })
    }
    
    
    render() {
        return (
            <div>
                
                <div className="ChatBox">
                    {
                        Data.questions.map((question, idx) => {
                            return <Message isBot={Boolean(idx%2)} context={question} />
                        })
                    }
                    {this.state.UserAnswerTurn&& <UserInput />}
                </div>

            </div>
        )
    }

}

export default Master;