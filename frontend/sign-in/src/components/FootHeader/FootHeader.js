// This is the bottom header for our application to show the name of the our application
/*
    Missing: Privacy Policy, Terms of Use 
*/
import React from 'react';
function FootHeader() {
    return(
        <nav class="navbar navbar-expand-lg fixed-bottom navbar-light bg-light">
            <div className="row col-1.5 d-flex justify-content-center text-blue">
            <span className="h5">@2021 BruinTutors.com</span>
            </div>
        </nav>
    )
}
export default FootHeader;