import React, { useEffect, useState } from "react";

const Video: React.FC = () => {
    const [hasWindow, setHasWindow] = useState(false);
    useEffect(() => {
        if (typeof window !== "undefined") {
            setHasWindow(true);
        }
    }, [hasWindow]);

    return (
        <>
            {hasWindow && (
                <video
                    controls
                    autoPlay={false}
                    muted={true}
                    loop={true}
                    style={{ width: "100%", height: "100%" }}
                    src={require("../public/images/sw_ir_video.mp4")}
                />
            )}
        </>
    );
};

export default Video;