const IframeContainer = ({ iframeState, videoSrc, toggleIframe }) => {
  return (
    <div
      className={
        iframeState ? "iframe-container display-flex" : "iframe-container"
      }
    >
      <iframe
        src={videoSrc}
        className="iframe"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <button className="full-btn" onClick={toggleIframe}>
        close
      </button>
    </div>
  );
};

export default IframeContainer;
