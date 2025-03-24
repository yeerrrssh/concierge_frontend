type VideoProps = {
  link: string;
  selectNextVideo: () => void;
};

export const Video = ({ link, selectNextVideo }: VideoProps) => {
  const handleVideoEnd = () => {
    selectNextVideo();
  };

  return (
    <>
      <video width="700" height="394" controls muted={false} autoPlay src={link} onEnded={handleVideoEnd}></video>
    </>
  );
};
