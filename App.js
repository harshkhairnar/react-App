import React from "react";
import ReactDOM from "react-dom/client";

// const heading = React.createElement("h1", {
//     id:"headings"
// }, "this is react javascript! from harshal");

const JsxHeading=()=>(
<h1 id="heading">jsx code </h1>
);

    const HeadingComponent=()=>
    (
        <div id="container">
            <JsxHeading/>
<h1 className="heading">this is heading component </h1>
        </div>
    );

const root = ReactDOM.createRoot(document.getElementById("root"))


root.render(<HeadingComponent/>);