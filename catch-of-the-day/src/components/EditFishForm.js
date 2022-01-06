import React from "react";

class EditFishForm extends React.Component {
  handleChange = (event) => {
    //1. read the edited value from event
    const updatedFish = {
      ...this.props.fish,
      [event.currentTarget.name]: event.currentTarget.value,
    };

    //2. call the updateFish method
    this.props.updateFish(this.props.index, updatedFish);
  };
  render() {
    return (
      <div className={"fish-edit"}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={this.handleChange}
          value={this.props.fish.name}
        />
        <input
          type="text"
          name="price"
          placeholder="Price"
          onChange={this.handleChange}
          value={this.props.fish.price}
        />
        <select
          name="status"
          placeholder="Status"
          onChange={this.handleChange}
          value={this.props.fish.status}
        >
          <option value={"available"}>Fresh!</option>
          <option value={"unavailable"}>Sold out</option>
        </select>
        <textarea
          name="desc"
          ref={this.descRef}
          placeholder="Desc"
          onChange={this.handleChange}
          value={this.props.fish.desc}
        />
        <input
          type="text"
          name="image"
          placeholder="Image"
          onChange={this.handleChange}
          value={this.props.fish.image}
        />
        <button onClick={() => this.props.deleteFish(this.props.index)}>
          Remove Fish
        </button>
      </div>
    );
  }
}

export default EditFishForm;
