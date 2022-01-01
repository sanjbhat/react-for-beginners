import React from "react";
import { formatPrice } from "../helpers";

class Order extends React.Component {
  getTotal = (orderIds) => {
    return orderIds.reduce((prevTotal, key) => {
      const fish = this.props.fishes[key];
      const count = this.props.order[key];
      const isAvailable = fish && fish.status === "available";

      if (isAvailable) {
        return prevTotal + count * fish.price;
      }
      return prevTotal;
    }, 0);
  };

  renderList = (key) => {
    const count = this.props.order[key];
    const fish = this.props.fishes[key];
    const isAvailable = fish.status === "available";

    if (!isAvailable)
      return (
        <li key={key}>Sorry, {fish ? fish.name : "fish"} not available </li>
      );
    else
      return (
        <li key={key}>
          <span>
            <span className="count"> {count} kg &nbsp;</span>
            {fish.name}
          </span>
          <span className="price">{formatPrice(count * fish.price)}</span>
        </li>
      );
  };
  render() {
    const orderKeys = Object.keys(this.props.order);
    const fishes = this.props.fishes;
    const total = this.getTotal(orderKeys);

    return (
      <div className="order-wrap">
        <h2 className="order-title">Order</h2>
        <ul className="order">{orderKeys.map(this.renderList)}</ul>
        <div className="total">
          Total:<strong>{formatPrice(total)}</strong>
        </div>
      </div>
    );
  }
}

export default Order;
