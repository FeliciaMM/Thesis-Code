import "../pages/CSS/PageNotFound.css"
import React from "react";
import {Link} from "react-router-dom";

function PageNotFound(){
    return(
        <div id="divNotFound">
            <h1>Page Not Found</h1>
            <h3>You can return home by pressing here: 
            <Link to="/">Home Page</Link>
            </h3>
        </div>
    )
}

export default PageNotFound;
