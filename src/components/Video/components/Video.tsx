type VideoProps = {
  link: string;
};

export const Video = ({ link }: VideoProps) => {
  return (
    <>
      <video width="700" height="394" controls>
        <source src={link} type="video/mp4" />
      </video>
    </>
  );
};
