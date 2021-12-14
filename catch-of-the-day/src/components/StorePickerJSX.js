import React, { Fragment } from "react";
import { getFunName } from "../helpers";

class StorePickerJSX extends React.Component {

    myInput = React.createRef();

    goToStore = (event) => {

        //stop the form from submitting
        event.preventDefault();

        //get the text from that input
        const input = this.myInput.current.value;
        console.log(input);

        //change the page to /store/whatever-they-entered
        this.props.history.push(`/store/${input}`);
    }

    render()  {
        return (
            <form className="store-selector" onSubmit={this.goToStore}>  {/* Note here that we are not making a call using braces after function name. Having the braces means, everytime on rendering of this page, the call is made which is not what we want */}
                <h2> Please enter a store</h2>
                <input type="text" ref={this.myInput} required placeholder="Store Name" defaultValue={getFunName()}/>
                <button type="submit">Visit Store!</button>
            </form>
        )
    }
}
export default StorePickerJSX;