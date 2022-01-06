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
    const { params } = this.props.match;

    const localStorageRef = localStorage.getItem(params.storeId);
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) });
    }

    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: "fishes",
    });

    //since we are storing the order state to local browser, in the next method.
    // We need to also load that data back, when the app is mounting.
  }

  componentDidUpdate() {
    //console.log(this.state.order); //logging this will display the object contents.But simply alerting this.state.orderwill display [object Object]
    //we will need to stringify that in order to display it in string form

    //we want to store this to our local storage. (aka browser cache!)
    //key is our store name.

    localStorage.setItem(
      this.props.match.params.storeId,
      JSON.stringify(this.state.order)
    );
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

  updateFish = (key, updatedFish) => {
    //1. take a copy of current state.
    const fishes = { ...this.state.fishes };

    //2. update the copy with the provided fish
    fishes[key] = updatedFish;

    //3. set this back to state
    this.setState({ fishes });
  };

  deleteFish = (key) => {
    //1. take a copy of current state
    const fishes = { ...this.state.fishes };

    //2. delete fish from the copy
    fishes[key] = null; //we can also use delete keyword here, but if we want firebase also to delete it, we need to set it to null.

    //3. update the state
    this.setState({ fishes });
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

  deleteFromOrder = (key) => {
    //1. take a copy of the order
    const order = { ...this.state.order };

    //2. delete the fish from order
    delete order[key];

    //3. set this back to state
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
        <Order
          deleteFromOrder={this.deleteFromOrder}
          fishes={this.state.fishes}
          order={this.state.order}
        ></Order>
        <Inventory
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
        ></Inventory>
      </div>
    );
  }
}

export default App;
