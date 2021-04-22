import React from 'react';
import '../css/DarkMode.css';

interface state {
    Dark: boolean
}

class DarkMode extends React.Component<any, state> {
    Switch: HTMLInputElement | null = null;

    constructor(props: any) {
        super(props);
        this.state = {
            Dark: window.matchMedia('(prefers-color-scheme: dark)').matches
        }
    }

    componentDidMount() {
        this.ChangeMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            this.ChangeMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
        })
    }

    ChangeMode(to: boolean) {
        if (to) {
            document.documentElement.setAttribute("data-theme", "dark");
        } else {
            document.documentElement.setAttribute("data-theme", "light");
        }
        this.setState({
            Dark: to
        })
    }

    render() {
        return (
            <label className="DarkModSwitch">
                <input ref={(e)=>{this.Switch = e}} type="checkbox" checked={this.state.Dark} onClick={() => {this.ChangeMode(!this.state.Dark)}} readOnly/>
                <span className="Slider round"></span>
            </label>
        )
    }

}

export default DarkMode;