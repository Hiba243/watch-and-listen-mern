import React, { Fragment, useContext, useEffect } from 'react';
import VideoItem from './VideoItem';
import Spinner from '../layout/Spinner';
import VideoContext from '../../context/video/videoContext';

const Videos = () => {
  const videoContext = useContext(VideoContext);

  const { videos, filtered, getVideos, loading } = videoContext;

  useEffect(() => {
    getVideos();
    // eslint-disable-next-line
  }, []);

  if (videos !== null && videos.length === 0 && !loading) {
    return <h4>Please add a video</h4>;
  }

  return (
    <Fragment>
      {videos !== null && !loading ? (
          filtered !== null
            ? filtered.map(video => (
                
                  <VideoItem video={video}  key={video._id} />
                
              ))
            : videos.map(video => (
                
                  <VideoItem video={video}  key={video._id}/>
                
              ))
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Videos;