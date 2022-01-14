import React from "react";
import PropTypes from "prop-types";

//or the arrow method
const Header = (props) => (
  <header className="top">
    <h1>
      Catch
      <span className="ofThe">
        <span className="of">OF</span>
        <span className="the">The</span>
      </span>
      Day
    </h1>
    <h3 className="tagline">
      <span>{props.tagline}</span>
    </h3>
  </header>
);

//this is a stateless component and not a React component,
// hence we define the propTypes, after the component definition
Header.propTypes = {
  tagline: PropTypes.string.isRequired,
};
export default Header;
