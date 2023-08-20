
import React from "react";
import ReactLoading from "react-loading";
import './loadingstyle.css';
 
export default function Loading(props) {
    return (
        <div className="loadingstyle" style={{
                    width: "100%",
                    height: "100",
                   display: "flex",
                   justifyContent: "center",
                    alignItems: "center",
      }}>
            {/* <ReactLoading type="balls" color="#ff0000"
                height={100} width={50} />
            <ReactLoading type="bars" color="#ff0000"
                height={100} width={50} />
            <ReactLoading type="bubbles" color="#ff0000"
                height={100} width={50} />
            <ReactLoading type="cubes" color="#ff0000"
                height={100} width={50} />
            <ReactLoading type="cylon" color="#ff0000"
                height={100} width={50} /> 
            <ReactLoading type="spin" color="#ff0000"
                height={100} width={50} />
            <ReactLoading type="spokes" color="#ff0000"
                height={100} width={50} />*/}
            <ReactLoading type="spinningBubbles" color="#ff0000" height={100} width={50}/>
        </div>
    );
}