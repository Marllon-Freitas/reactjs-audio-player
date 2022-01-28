import React, { useState, useRef, useEffect } from "react";
import {
  BsFillPlayFill,
  BsPauseFill,
  BsSpeedometer2,
  BsVolumeUpFill,
  BsFillVolumeMuteFill,
} from "react-icons/bs";

// Estilos
import { Wrapper, Content } from "./AudioPlayer.style";

function AudioPlayer() {
  //Estado
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioIsMuted, setAudioIsMuted] = useState(false);
  const [audioDuration, setAudioDuration] = useState(0);
  const [audioCurrentTime, setAudioCurrentTime] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);

  //Refer
  const audioPlayerRef = useRef(); //Referencia ao componente de audio
  const progressBarRef = useRef(); //Referencia ao slider
  const progressVolumeRef = useRef(); //Referencia ao slider
  const animationRef = useRef(); //Referencia a animação

  const timeTravel = (newTime) => {
    progressBarRef.current.value = newTime;
    changeRange();
  };

  useEffect(() => {
    audioPlayerRef.current.playbackRate = playbackRate;
    if (audioCurrentTime == audioDuration) {
      togglePlayPause();
      timeTravel(0);
    }
  }, [audioCurrentTime, playbackRate]);

  const onLoadedMetadata = () => {
    const seconds = Math.floor(audioPlayerRef.current.duration);
    setAudioDuration(seconds);
    progressBarRef.current.max = seconds;
  };
  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  };

  const changePlayerCurrentTime = () => {
    progressBarRef.current.style.setProperty(
      "--seek-before-width",
      `${(progressBarRef.current.value / audioDuration) * 100}%`
    );
    setAudioCurrentTime(progressBarRef.current.value);
  };

  const whilePlaying = () => {
    progressBarRef.current.value = audioPlayerRef.current.currentTime;
    changePlayerCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying);
  };

  const changeRange = () => {
    audioPlayerRef.current.currentTime = progressBarRef.current.value;
    changePlayerCurrentTime();
  };

  let audio = document.getElementById("my-audio");

  const changeRangeVolume = () => {
    progressVolumeRef.current.volume = progressVolumeRef.current.value;
    audio.volume = progressVolumeRef.current.volume;
    setAudioIsMuted(false);
    audio.muted = false;
    if(progressVolumeRef.current.value == 0) {
      setAudioIsMuted(true)
    } else {
      setAudioIsMuted(false)
    }
  };
  
  const setPlayBack = (value) => {
    setPlaybackRate(value);
  };

  const togglePlayPause = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    if (!prevValue) {
      audioPlayerRef.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      audioPlayerRef.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
  };

  const toggleMuteUnmute = () => {
    const prevValue = audioIsMuted;
    setAudioIsMuted(!prevValue);
    if(!audioIsMuted) {
      audio.muted = true;
      progressVolumeRef.current.value = 0
      progressVolumeRef.current.volume = progressVolumeRef.current.value
      audio.volume = progressVolumeRef.current.value;
    } else {
      audio.muted = false
      progressVolumeRef.current.value = 0.5
      audio.volume = progressVolumeRef.current.value;
    } 
  };

  return (
    <Wrapper>
      <Content>
        <audio
          id="my-audio"
          onLoadedMetadata={onLoadedMetadata}
          ref={audioPlayerRef}
          src="https://the360report.com/wp-content/uploads/2021/09/Rick_Astley_-_Never_Gonna_Give_You_Up.mp3?_=3"
          preload="metadata"
        ></audio>
        <div className="speed-audio-change">
          <div className="speed-audio-icon">
            <BsSpeedometer2 style={{ cursor: "pointer" }} />
          </div>
          <div className="speed-audio-options">
            <button
              onClick={() => {
                setPlayBack(0.25);
              }}
            >
              0.25x
            </button>
            <button
              onClick={() => {
                setPlayBack(0.5);
              }}
            >
              0.5x
            </button>
            <button
              onClick={() => {
                setPlayBack(1);
              }}
            >
              1x
            </button>
            <button
              onClick={() => {
                setPlayBack(1.5);
              }}
            >
              1.5x
            </button>
            <button
              onClick={() => {
                setPlayBack(2);
              }}
            >
              2x
            </button>
          </div>
        </div>
        <div onClick={togglePlayPause} className="button-play">
          {!isPlaying ? (
            <BsFillPlayFill
              style={{
                fontSize: "1.5rem",
                margin: "0.2rem 0.3rem 0 0.2rem",
                cursor: "pointer",
              }}
            ></BsFillPlayFill>
          ) : (
            <BsPauseFill
              style={{
                fontSize: "1.5rem",
                margin: "0.2rem 0.3rem 0 0.2rem",
                cursor: "pointer",
              }}
            ></BsPauseFill>
          )}
        </div>

        {/* current time */}
        <div>{calculateTime(audioCurrentTime)}</div>

        {/* progress bar */}
        <div className="audio-bar">
          <input
            className="progressBar"
            onChange={changeRange}
            ref={progressBarRef}
            step="0.05"
            type="range"
            defaultValue="0"
          />
        </div>

        {/* duration */}
        <div>{calculateTime(audioDuration)}</div>

        {/* audio bar */}
        <div onClick={toggleMuteUnmute} className="button-volume">
          {audioIsMuted ? (
            <BsFillVolumeMuteFill
              style={{
                fontSize: "1.5rem",
                margin: "0.2rem 0.3rem 0 0.2rem",
                cursor: "pointer",
              }}
            ></BsFillVolumeMuteFill>
          ) : (
            <BsVolumeUpFill
              style={{
                fontSize: "1.5rem",
                margin: "0.2rem 0.3rem 0 0.2rem",
                cursor: "pointer",
              }}
            ></BsVolumeUpFill>
          )}
        </div>

        <div className="volume-bar">
          <input
            className="volumeBar"
            max="1"
            onChange={changeRangeVolume}
            ref={progressVolumeRef}
            style={{ width: "90%" }}
            step="0.05"
            type="range"
            defaultValue="0.5"
          />
        </div>
      </Content>
    </Wrapper>
  );
}

export default AudioPlayer;
