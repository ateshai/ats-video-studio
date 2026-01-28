import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig, Video } from 'remotion';
import { staticFile } from 'remotion';
import { z } from 'zod';
import { zColor } from '@remotion/zod-types';
import '../style.css';

export const CinematicTextSchema = z.object({
  "Title": z.string().describe("The text to display"),
  "Line Height": z.number().step(0.01).describe("Relative to font size"),
  "Start Spacing": z.number().describe("Initial letter spacing (px)"),
  "End Spacing": z.number().describe("Final letter spacing (px)"),
  "Duration Frames": z.number().int().describe("Animation duration (frames)"),
  "Delay Frames": z.number().int().describe("Start delay (frames)"),
  "Use Green Screen": z.boolean().describe("Replace video with solid color"),
  "Background Color": zColor().describe("Solid background color"),
  "Background Video": z.string().describe("Filename in public/ or URL"),
});

export const CinematicText: React.FC<z.infer<typeof CinematicTextSchema>> = ({
  "Title": title = "",
  "Line Height": lineHeight = 0.9,
  "Start Spacing": startLetterSpacing = 150,
  "End Spacing": endLetterSpacing = -20,
  "Duration Frames": durationFrames = 90,
  "Delay Frames": delayFrames = 30,
  "Use Green Screen": useGreenScreen = false,
  "Background Color": backgroundColor = "#00ff00",
  "Background Video": backgroundVideo = "legacy_background.mp4",
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Cinematic Reveal Animation
  // Delay: 1s (approx 30 frames)
  // Duration: 4s (approx 90 frames)
  // Props used: delayFrames, durationFrames

  const opacity = interpolate(
    frame - delayFrames,
    [0, durationFrames],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const letterSpacing = interpolate(
    frame - delayFrames,
    [0, durationFrames],
    [startLetterSpacing, endLetterSpacing],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const scale = interpolate(
    frame - delayFrames,
    [0, durationFrames],
    [0.95, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const blur = interpolate(
    frame - delayFrames,
    [0, durationFrames],
    [10, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Sub Text Animation
  // Delay: 1.5s (45 frames)
  // Duration: 3s (90 frames)
  const subDelayFrame = 45;
  const subDurationFrames = 90;

  const subOpacity = interpolate(
    frame - subDelayFrame,
    [0, subDurationFrames],
    [0, 0.8],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const subTranslateY = interpolate(
    frame - subDelayFrame,
    [0, subDurationFrames],
    [20, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <div style={{ flex: 1, position: 'relative' }}>
      {useGreenScreen ? (
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            backgroundColor: backgroundColor,
            zIndex: -1,
          }}
        />
      ) : (
        <Video
          src={backgroundVideo.match(/^https?:\/\//) ? backgroundVideo : staticFile(backgroundVideo)}
          className="bg-video"
          style={{
            width: "100%",
            height: "100%",
          }}
          muted
          loop
        />
      )}
      <div className="overlay-container">
        <div
          className="cinematic-text"
          style={{
            opacity,
            letterSpacing: `${letterSpacing}px`,
            transform: `scale(${scale})`,
            filter: `blur(${blur}px)`,
            lineHeight,
          }}
        >
          {title.split(/\\n|\n/).map((t, i) => (
            <React.Fragment key={i}>
              {t}
              {i < title.split(/\\n|\n/).length - 1 && <br />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
