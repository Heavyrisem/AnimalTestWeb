import React from 'react';
import DarkMode from './components/DarkMode';
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
            UserAnswerTurn: false
        }
    }
    
    
    render() {
        return (
            <div>
                <header>
                    <span className="Title">Title</span>
                    <span></span>
                    <DarkMode />
                </header>
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