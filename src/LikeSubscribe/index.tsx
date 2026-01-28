import React from 'react';
import { spring, useCurrentFrame, useVideoConfig } from 'remotion';

export const LikeSubscribe: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame,
    fps,
    config: {
      damping: 200,
    },
  });

  return (
    <div
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'white',
      }}
    >
      <div
        style={{
          fontSize: 100,
          fontWeight: 'bold',
          transform: `scale(${scale})`,
          color: '#ff0000',
        }}
      >
        SUBSCRIBE
      </div>
      <div
        style={{
          fontSize: 50,
          marginTop: 20,
          opacity: Math.min(1, frame / 30),
        }}
      >
        Like & Share
      </div>
    </div>
  );
};
