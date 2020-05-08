import React from 'react';
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { withRouter } from 'react-router-dom';
import ReactTooltip from 'react-tooltip'

const TopNavBookmark = (props) => {
    let bm = <FaRegBookmark onClick={() => {ReactTooltip.hide();}}/>;
    if(props.location.pathname === "/favourites"){
        bm = <FaBookmark onClick={() => {ReactTooltip.hide();}}/>
    }
    return bm;
}

export default withRouter(TopNavBookmark);