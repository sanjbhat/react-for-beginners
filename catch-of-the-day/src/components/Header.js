import React from "react";


// function Header(props)
// {
//     return (
//         <header className="top">
//             <h1>Catch
//                 <span className="ofThe">
//                     <span className="of">OF</span>
//                     <span className="the">The</span>
//                 </span>
//                 Day
//             </h1>
//             <h3 className="tagline">
//                 <span>{props.tagline}</span>
//             </h3>
//         </header>
//     );
// }

//or the arrow method
const Header = (props) => (
            <header className="top">
            <h1>Catch
                <span className="ofThe">
                    <span className="of">OF</span>
                    <span className="the">The</span>
                </span>
                Day
            </h1>
            <h3 className="tagline">
                <span>{props.tagline }</span>
            </h3>
        </header>
);
// class Header extends React.Component {
//     render() {
//
//         return (
//             <header className="top">
//                <h1>Catch
//                 <span className="ofThe">
//                     <span className="of">OF</span>
//                     <span className="the">The</span>
//                 </span>
//                 Day
//                </h1>
//                 <h3 className="tagline">
//                     <span>{this.props.tagline}</span>
//                 </h3>
//             </header>
//         );
//     }
//
// }

export default Header;