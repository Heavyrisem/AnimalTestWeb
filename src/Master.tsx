import React from 'react';
import DarkMode from './components/DarkMode';
import Message from './components/Message';
import UserInput from './components/UserInput';

import Data from './Data.json';
import Config from './Config.json';

interface state {
    UserAnswerTurn: boolean,
    CurrentStep: number,
    MaxStep: number,
    Messages: Array<MessageT>,
    AnswerList: Array<string>,
    Scores: Array<string>
}

interface MessageT {
    content: string,
    isBot: boolean
}

class Master extends React.Component<any, state> {

    constructor(props: any) {
        super(props);
        this.state = {
            UserAnswerTurn: false,
            CurrentStep: 0,
            MaxStep: 0,
            Messages: [],
            AnswerList: [],
            Scores: []
        }
    }

    async componentDidMount() {
        const ServerResponse = await fetch(`${Config.Endpoint}/GetTestInfo`, {
            method: "POST"
        });
        const TestInfo: {Name: string, Questions: number, Ment: Array<string>} = await ServerResponse.json();
        let Messages: Array<MessageT> = [];

        for (const Msg of TestInfo.Ment) {
            Messages.push({
                content: Msg,
                isBot: true
            })
        }

        this.setState({
            Messages: this.state.Messages.concat(Messages),
            MaxStep: TestInfo.Questions-1,
            UserAnswerTurn: true
        }, () => {
            this.GetQuestion();
        })
    }

    async GetQuestion() {
        const ServerResponse = await fetch(`${Config.Endpoint}/GetQuestion`, {
            method: "POST",
            body: JSON.stringify({
                QuestionNo: this.state.CurrentStep
            }),
            headers: {'content-type':'application/json'}
        })
        const Question: {question?: string, answer?: Array<string>, err?: string} = await ServerResponse.json();
        if (Question.question && Question.answer) {
            this.setState({
                UserAnswerTurn: true,
                Messages: this.state.Messages.concat({content: Question.question, isBot: true}),
                AnswerList: Question.answer
            }, );
        }
        console.log(Question);
    }

    async UserAnswer(answer: string) {
        if (answer != "") {
            this.setState({
                UserAnswerTurn: false,
                Messages: this.state.Messages.concat({content: answer, isBot: false})
            });
            const ServerResponse = await fetch(`${Config.Endpoint}/Answer`, {
                method: "POST",
                body: JSON.stringify({
                    QuestionNo: this.state.CurrentStep,
                    UserAnswer: answer
                }),
                headers: {'content-type':'application/json'}
            })
            const Result: {answerResult?: Array<string>, err?: string} = await ServerResponse.json();
            if (Result.answerResult) {
                this.setState({
                    CurrentStep: this.state.CurrentStep+1,
                    Scores: this.state.Scores.concat(Result.answerResult)
                }, () => {
                    if (this.state.MaxStep < this.state.CurrentStep)
                        this.Finish();
                    else
                        this.GetQuestion();
                })
            }
        }
    }

    async Finish() {
        const ServerResponse = await fetch(`${Config.Endpoint}/GetResult`, {
            method: "POST",
            body: JSON.stringify({
                Scores: this.state.Scores
            }),
            headers: {'content-type': 'application/json'}
        });
        const AnimalResult: {Name: string, Desc: string} = await ServerResponse.json();

        const ResultMessage: Array<MessageT> = [
            {
                content: `축하합니다! 결과는 다음과 같습니다. ${AnimalResult.Name}!`,
                isBot: true
            },
            {
                content: AnimalResult.Desc,
                isBot: true
            }
            // ,{
            //     content: `${AnimalResult.Name}은 `,
            //     isBot: true
            // }
        ]
        
        this.setState({
            Messages: this.state.Messages.concat(ResultMessage)
        })
    }
    
    render() {
        return (
            <div style={{height: "100%"}}>
                <header>
                    <span className="Title">Swift</span>
                    <span></span>
                    <span><DarkMode /></span>
                </header>
                <div className="ChatBox">
                    {
                        this.state.Messages.map((question, idx) => {
                            return <Message key={idx} isBot={question.isBot} context={question.content} />
                        })
                    }
                    {this.state.UserAnswerTurn&& <UserInput OnAnswer={this.UserAnswer.bind(this)} AnswerList={this.state.AnswerList} />}
                </div>

            </div>
        )
    }

}

export default Master;