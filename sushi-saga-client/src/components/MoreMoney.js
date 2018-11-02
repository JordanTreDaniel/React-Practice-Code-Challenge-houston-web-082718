import React, {Fragment} from 'react';
import Quarter from './Quarter';
const headsTailsImgs = ["https://www.usmint.gov/wordpress/wp-content/uploads/2017/09/2018-america-the-beautiful-quarters-coin-uncirculated-obverse-san-francisco.jpg","https://www.nps.gov/articles/images/2017-america-the-beautiful-quarters-coin-ellis-island-new-jersey-proof-reverse-Small.jpg?maxwidth=650&autorotate=false"]
const flippingGif = "https://media.giphy.com/media/3xz2BX56wNPiHb8Y00/giphy.gif";
const headsTails = ["heads", "tails"];
class MoreMoney extends React.Component {
    constructor() {
        super();
        this.state = {
            winner: "",
            bet: null,
            betAmount: 0,
            inPlay: false,
            played: false,
            image: headsTailsImgs[this.random()],
            status: null
        }
    }

    random = () => {
        const n = Math.floor(Math.random() * 2);
        return n;
    }
    betMoney = () => {
        this.setState({
            inPlay: true,
            image: flippingGif,
            winner: headsTails[this.random()],
        })
        setTimeout(() => {
            this.props.cashOut(this.state.betAmount, this.state.winner == this.state.bet);
            this.setState({
                played: true,
                image: this.state.winner == "heads" ? headsTailsImgs[0] : headsTailsImgs[1]
            })
        }, 2000)
            //quarter sets interval to change every 400 milliseconds, 3 times
            //final value of quarter determines win
    }
    playAgain = () => {
        this.setState({
            winner: "",
            bet: null,
            betAmount: 0,
            inPlay: false,
            played: false,
            image: headsTailsImgs[this.random()],
            status: null
        });
    }
    selectBet = (e) => {
        // e.preventDefault();
        this.setState({
            bet: e.target.value
        })
    }
    handleChange = (e) => {
        e.preventDefault();
        if (e.target.value < this.props.balance){
            this.setState({
                betAmount: e.target.value
            })
        }
    }
    render() {
        if (this.state.inPlay) {
            return (
                <Fragment>
                    <Quarter random={this.random} image={this.state.image}/>
                    {this.state.played ? 
                        <h1>{this.state.winner} wins!</h1>
                        :
                        null
                    }
                    <button onClick={this.playAgain}>Play Again</button>
                </Fragment>
            )
        } else {
            return (
                <Fragment>
                    <h1>Heads or Tails?</h1>
                    <form>
                        <input 
                            type={"number"} 
                            onChange={e => this.handleChange(e)} 
                            value={this.state.betAmount}
                        />
                        <fieldset>
                            <legend>Place Your Bet</legend>

                            <div>
                                <input type="radio" id="heads"
                                    name="drone" value="heads" onChange={e => this.selectBet(e)}
                                    checked={this.state.bet === "heads"}/>
                                <label for="heads">Heads</label>
                            </div>

                            <div>
                                <input type="radio" id="tails"
                                    name="drone" value="tails" onChange={e => this.selectBet(e)}
                                    checked={this.state.bet === "tails"}/>
                                <label for="tails">Tails</label>
                            </div>

                        </fieldset>
                    </form>
                    <button onClick={this.betMoney} value="Bet My Lunch Money"/>
                </Fragment>
            )
        }
        
    }
}

export default MoreMoney;