import React from "react";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";
import base from "../base";

class App extends React.Component {
  state = {
    fishes: {},
    order: {},
  };

  //this is a lifecycle method something like window.onLoad, etc
  componentDidMount() {
    const params = this.props.match.params;
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: "fishes",
    });
  }

  componentWillUnmount() {
    base.remove(this.ref);
  }

  addFish = (fish) => {
    //take a copy of the current state
    const fishes = { ...this.state.fishes };

    //add our new fish to this copy
    fishes[`fish${Date.now()}`] = fish;

    //set this new copy to the state
    this.setState({ fishes: fishes });
  };

  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes });
  };

  addToOrder = (key) => {
    //1. take a copy of the order
    const order = { ...this.state.order };

    //2. add current fish to order
    order[key] = order[key] + 1 || 1; //increment if exists or add new

    //3. set this back to the state
    this.setState({ order });
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market"></Header>{" "}
          {/* tagline is a prop of this component. when it is being accessed somewhere else, then we can use props object to access what is being set here   */}
          <ul className={"fishes"}>
            {Object.keys(this.state.fishes).map((key) => (
              <Fish
                key={key}
                index={key}
                addToOrder={this.addToOrder}
                details={this.state.fishes[key]}
              ></Fish>
            ))}
          </ul>
        </div>
        <Order fishes={this.state.fishes} order={this.state.order}></Order>
        <Inventory
          addFish={this.addFish}
          loadSampleFishes={this.loadSampleFishes}
        ></Inventory>
      </div>
    );
  }
}

export default App;
