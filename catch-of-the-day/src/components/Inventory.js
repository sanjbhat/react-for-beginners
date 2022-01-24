import React from "react";
import firebase from "firebase";
import AddFishForm from "./AddFishForm";
import EditFishForm from "./EditFishForm";
import PropTypes from "prop-types";
import Login from "./Login";
import base, { fireBaseApp } from "../base";

class Inventory extends React.Component {
  static propTypes = {
    fishes: PropTypes.shape({
      name: PropTypes.string,
      image: PropTypes.string,
      desc: PropTypes.string,
      status: PropTypes.string,
      price: PropTypes.number,
    }),
    updateFish: PropTypes.func,
    deleteFish: PropTypes.func,
    addFish: PropTypes.func,
    loadSampleFishes: PropTypes.func,
    storeId: PropTypes.string.isRequired,
  };

  state = {
    owner: null,
    uid: null,
  };

  //Even when the page is refreshed, we want to retain the authenticated user and data
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.authHandler({ user: user });
      }
    });
  }

  authHandler = async (authData) => {
    //1.lookup the current store in the firebase database

    //this is a promise, hence await
    const store = await base.fetch(this.props.storeId, { context: this });
    console.log(store);
    //2. if there is no owner, claim it
    if (!store.owner) {
      //make an update in firebase
      await base.post(`${this.props.storeId}/owner`, {
        data: authData.user.uid,
      });
    }

    //3.set the state of the inventory component to reflect the current user
    this.setState({
      uid: authData.user.uid,
      owner: store.owner || authData.user.uid,
    });
    console.log(authData);
  };
  authenticate = (provider) => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    fireBaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler)
      .catch((error) => {
        console.log(error);
      });
  };

  logout = async () => {
    console.log("Logging out!");
    await firebase.auth().signOut();
    this.setState({ uid: null });
  };

  render() {
    const logout = <button onClick={this.logout}>Log Out</button>;

    //1. check if the user is logged in
    if (!this.state.uid) {
      return <Login authenticate={this.authenticate} />;
    }

    //2. Check if the owner of the store is the logged in user
    if (this.state.owner !== this.state.uid) {
      return (
        <div>
          <p>Sorry, you are not the owner!</p>
          {logout}
        </div>
      );
    }

    //3. At this point, it mus tbe the owner
    return (
      <div className="Inventory">
        <h2>Inventory</h2>
        {logout}
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
