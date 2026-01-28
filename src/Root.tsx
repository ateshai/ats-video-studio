import React from 'react';
import { Composition } from 'remotion';
import { CinematicText, CinematicTextSchema } from './TextEffects/CinematicText';
import { LikeSubscribe } from './LikeSubscribe';
import './style.css';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="CinematicText"
        component={CinematicText}
        schema={CinematicTextSchema}
        defaultProps={{
          "Title": "KASKTAN\nSESLER\nKOROSU",
          "Line Height": 0.9,
          "Start Spacing": 150,
          "End Spacing": -20,
          "Duration Frames": 90,
          "Delay Frames": 30,
          "Use Green Screen": false,
          "Background Color": "#00ff00",
          "Background Video": "legacy_background.mp4"
        }}
        durationInFrames={300} // 10 seconds
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="LikeSubscribe"
        component={LikeSubscribe}
        durationInFrames={150} // 5 seconds
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
