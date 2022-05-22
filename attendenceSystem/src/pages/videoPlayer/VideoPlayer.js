import video1 from "../video/vd1.mp4";

import React from 'react'

function VideoPlayer() {
    return (
        <div >
            <video src={video1} controls="controls" autoplay="true"/>
        </div>
    );
}

export default VideoPlayer