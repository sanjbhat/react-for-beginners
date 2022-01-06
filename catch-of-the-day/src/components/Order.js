import React from "react";
import { formatPrice } from "../helpers";
import { TransitionGroup, CSSTransition } from "react-transition-group";

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

  handleDelete = (key) => {
    this.props.deleteFromOrder(key);
    return null;
  };

  renderList = (key) => {
    const count = this.props.order[key];
    const fish = this.props.fishes[key];
    const transitionOptions = {
      key: key,
      classNames: "order",
      timeout: { enter: 500, exit: 500 },
    };
    if (!fish) return null;

    const isAvailable = fish && fish.status === "available";

    if (!isAvailable)
      return (
        <CSSTransition {...transitionOptions}>
          <li key={key}>Sorry, {fish ? fish.name : "fish"} not available </li>
        </CSSTransition>
      );
    else
      return (
        <CSSTransition {...transitionOptions}>
          <li key={key} index={key}>
            <span className="item">
              <TransitionGroup component="span" className="count">
                {/* Here the key is not fishId but count because we want  */}
                {/* the timeout property has double curly braces. First brace is to indicate it's javascript */}
                <CSSTransition
                  classNames="count"
                  key={count}
                  timeout={{ enter: 500, exit: 500 }}
                >
                  <span className="count">{count}</span>
                </CSSTransition>
              </TransitionGroup>
              kg {fish.name}
              <button onClick={() => this.handleDelete(key)}>x</button>
              <span className="price">
                {formatPrice(
                  this.props.order[key] * this.props.fishes[key].price
                )}
              </span>
            </span>
          </li>
        </CSSTransition>
      );
  };
  render() {
    const orderKeys = Object.keys(this.props.order);
    const fishes = this.props.fishes;
    const total = this.getTotal(orderKeys);

    return (
      <div className="order-wrap">
        <h2 className="order-title">Order</h2>
        <TransitionGroup component="ul" className="order">
          {orderKeys.map(this.renderList)}
        </TransitionGroup>
        <div className="total">
          Total:<strong>{formatPrice(total)}</strong>
        </div>
      </div>
    );
  }
}

export default Order;
