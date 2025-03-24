type VideoProps = {
  link: string;
  selectNextVideo: () => void;
};

export const Video = ({ link, selectNextVideo }: VideoProps) => {
  const handleVideoEnd = () => {
    console.log(link);
    selectNextVideo();
  };

  return (
    <>
      <video width="700" height="394" controls muted={false} autoPlay src={link} onEnded={handleVideoEnd}></video>
    </>
  );
};
