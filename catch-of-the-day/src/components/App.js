import React from "react";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";

class App extends React.Component {

    render() {

        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market"></Header> {/* tagline is a prop of this component. when it is being accessed somewhere else, then we can use props object to access what is being set here   */}
                </div>
                <Order></Order>
                <Inventory></Inventory>

            </div>

        );
    }

}

export default App;