import React from 'react';
import VideoPlayer from 'react-native-video-player';
import { secondaryColor } from '../../../globals/colors';

const PromoVideo = ({ togglePlay }) => (
  <VideoPlayer
    thumbnail={require('../../../../assets/videos/promo_video_thumbnail.png')}
    video={require('../../../../assets/videos/promo_video.mp4')}
    onPlayPress={togglePlay}
    onStart={togglePlay}
    // styles are c & p from original props and only the colors are adjusted
    customStyles={{
      seekBarProgress: {
        height: 5,
        backgroundColor: secondaryColor,
      },
      seekBarKnob: {
        width: 20,
        height: 20,
        marginHorizontal: -8,
        marginVertical: -10,
        borderRadius: 10,
        backgroundColor: secondaryColor,
        transform: [{ scale: 0.8 }],
        zIndex: 1,
      },
    }}
  />
);

export default PromoVideo;
