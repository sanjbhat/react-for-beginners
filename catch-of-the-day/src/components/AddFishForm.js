import React from "react";

class AddFishForm extends React.Component {

    nameRef = React.createRef();
    priceRef = React.createRef();
    statusRef = React.createRef();
    descRef = React.createRef();
    imageRef = React.createRef();

   createFish = (event) => {
       event.preventDefault();

       const fish = {
           name: this.nameRef.current.value,
           price: parseFloat(this.priceRef.current.value),
           status: this.statusRef.current.value,
           desc: this.descRef.current.value,
           image: this.imageRef.current.value
       }
       console.log(fish);
   }


    render() {

        return (
         <form className={"fish-edit"} onSubmit={this.createFish}>
             <input type="text" name="name" ref={this.nameRef} placeholder="Name"/>
             <input type="text" name="price" ref={this.priceRef} placeholder="Price"/>
             <select name="status" ref={this.statusRef} placeholder="Status">
                <option value={"available"}>Fresh!</option>
                 <option value={"unavailable"}>Sold out</option>
             </select>
             <textarea name="desc" ref={this.descRef} placeholder="Desc"/>
             <input type="text" name="image" ref={this.imageRef} placeholder="Image"/>

             <button type="submit"> + Add Fish </button>

         </form>
        );
    }
}

export default AddFishForm;