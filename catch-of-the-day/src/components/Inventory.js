import React from "react";
import AddFishForm from "./AddFishForm";
import EditFishForm from "./EditFishForm";

class Inventory extends React.Component {
  render() {
    return (
      <div className="Inventory">
        <h2>Inventory</h2>
        {Object.keys(this.props.fishes).map((key) => (
          <EditFishForm
            key={key}
            index={key}
            updateFish={this.props.updateFish}
            deleteFish={this.props.deleteFish}
            fish={this.props.fishes[key]}
            fishes={this.props.fishes}
          />
        ))}
        <AddFishForm
          addFish={this.props.addFish}
          loadSampleFishes={this.props.loadSampleFishes}
        />
      </div>
    );
  }
}

export default Inventory;
