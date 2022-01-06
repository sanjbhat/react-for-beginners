import React from "react";
import { formatPrice } from "../helpers";

class Fish extends React.Component {
  handleClick = () => {
    const fishKey = this.props.index;
    this.props.addToOrder(fishKey);
  };

  render() {
    const fish = this.props.details;
    const isAvailable = fish.status === "available";
    return (
      <li className="menu-fish">
        <img src={fish.image} alt={fish.desc} />
        <h3 className="fish-name">
          {fish.name}
          <span className="price">{formatPrice(fish.price)}</span>
        </h3>
        <p>{fish.desc}</p>
        <button disabled={!isAvailable} onClick={this.handleClick}>
          {isAvailable ? "Add to Cart" : "Sold Out!"}
        </button>
      </li>
    );
  }
}

export default Fish;
