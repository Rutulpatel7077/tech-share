import React from "react";

const Video = ({ slice }) => {
  return (
    <div className="video">
      <section>
        <h3>{slice.primary.video.title}</h3>
        <div dangerouslySetInnerHTML={{ __html: slice.primary.video.html }} />
      </section>



      <style jsx global>
        {`
          .video {
            display: flex;
            justify-content: center;
            align-items: center;
          }

          iframe {
            height: 500px;
            width: 900px;
          }
        `}
      </style>
    </div>
  );
};

export default Video;
