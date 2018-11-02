import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';
import MoreMoney from './components/MoreMoney';

// Endpoint!
const API = "http://localhost:3000/sushis"

class App extends Component {
  constructor() {
    super();
    this.state = {
      sushi: [],
      eaten: [],
      currentIdx: 0,
      balance: 200
    }
  }
  componentDidMount() {
    fetch(API)
      .then(res => res.json())
      .then(res => {
        this.setState({
          sushi: res
        })
      }) 
      .catch(err => {
        throw err;
      })
  }
  eatASushi(sushiObj) {
    if (this.state.balance - sushiObj.price >= 0) {
      const eaten = this.state.eaten.slice();
      eaten.push(sushiObj);
      this.setState({
        eaten: eaten,
        balance: this.state.balance - sushiObj.price
      })
    } else {
      alert("This ain't a soup kitchen! Take your broke ass home.")
    }
    
  }
  isEaten(sushiObj) {
    return this.state.eaten.includes(sushiObj);
  }
  findASushi(id) {
    return this.state.sushi.find(sushi => {
      return sushi.id === id;
    })
  }
  moreSushi() {
    let i = 0;
    if (this.noMoreSushi()) {
      i = 0;
    } else {
      i = this.state.currentIdx + 4
    }
    this.setState({
      currentIdx: i
    })
  }
  noMoreSushi() {
    return (this.state.currentIdx >= this.state.sushi.length - 1);
  }
  cashOut(amount, won) {
    let balance = this.state.balance;
    amount = parseInt(amount);
    if (won) {
      balance += amount;
    } else {
      balance -= amount;
    }
    this.setState({
      balance: balance
    })
  }
  render() {
    return (
      <div className="app">
        <MoreMoney
          balance={this.state.balance}
          cashOut={(a, w) => this.cashOut(a, w)}
        />
        <SushiContainer  
          sushi={this.state.sushi.slice(this.state.currentIdx, this.state.currentIdx + 4)}
          eatASushi={sushiObj => this.eatASushi(sushiObj)}
          isEaten={sushiObj => this.isEaten(sushiObj)}
          moreSushi={() => this.moreSushi()}
        />
        <Table 
          eaten={this.state.eaten}
          balance={this.state.balance}
        />
      </div>
    );
  }
}

export default App;