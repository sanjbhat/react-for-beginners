import React from "react";
import PropTypes from "prop-types";

class AddFishForm extends React.Component {
  static propTypes = {
    loadSampleFishes: PropTypes.func.isRequired,
    addFish: PropTypes.func.isRequired,
  };
  nameRef = React.createRef();
  priceRef = React.createRef();
  statusRef = React.createRef();
  descRef = React.createRef();
  imageRef = React.createRef();

  createFish = (event) => {
    //1. stop form from submitting
    event.preventDefault();

    //2. make a fish
    const fish = {
      name: this.nameRef.current.value,
      price: parseFloat(this.priceRef.current.value),
      status: this.statusRef.current.value,
      desc: this.descRef.current.value,
      image: this.imageRef.current.value,
    };
    console.log(fish);

    this.props.addFish(fish);

    event.currentTarget.reset();
  };

  render() {
    return (
      <div>
        <form className={"fish-edit"} onSubmit={this.createFish}>
          <input
            type="text"
            name="name"
            ref={this.nameRef}
            placeholder="Name"
          />
          <input
            type="text"
            name="price"
            ref={this.priceRef}
            placeholder="Price"
          />
          <select name="status" ref={this.statusRef} placeholder="Status">
            <option value={"available"}>Fresh!</option>
            <option value={"unavailable"}>Sold out</option>
          </select>
          <textarea name="desc" ref={this.descRef} placeholder="Desc" />
          <input
            type="text"
            name="image"
            ref={this.imageRef}
            placeholder="Image"
          />

          <button type="submit"> + Add Fish </button>
        </form>
        <button onClick={this.props.loadSampleFishes}>
          Load Sample Fishes
        </button>
      </div>
    );
  }
}

export default AddFishForm;
