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

  function timeTravel(newTime) {
    progressBarRef.current.value = newTime;
    changeRange();
  }

  useEffect(() => {
    audioPlayerRef.current.playbackRate = playbackRate;
    if (parseFloat(audioCurrentTime) === parseFloat(audioDuration)) {
      togglePlayPause();
      timeTravel(0);
    }
  }, [audioCurrentTime, playbackRate]);

  function onLoadedMetadata() {
    const seconds = Math.floor(audioPlayerRef.current.duration);
    setAudioDuration(seconds);
    progressBarRef.current.max = seconds;
  }

  function calculateTime(secs) {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  }

  function changePlayerCurrentTime() {
    progressBarRef.current.style.setProperty(
      "--seek-before-width",
      `${(progressBarRef.current.value / audioDuration) * 100}%`
    );
    setAudioCurrentTime(progressBarRef.current.value);
  }

  function whilePlaying() {
    progressBarRef.current.value = audioPlayerRef.current.currentTime;
    changePlayerCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying);
  }

  function changeRange() {
    audioPlayerRef.current.currentTime = progressBarRef.current.value;
    changePlayerCurrentTime();
  }

  let audio = document.getElementById("my-audio");

  function changeRangeVolume() {
    progressVolumeRef.current.volume = progressVolumeRef.current.value;
    audio.volume = progressVolumeRef.current.volume;
    setAudioIsMuted(false);
    audio.muted = false;
    if (parseFloat(progressVolumeRef.current.value) === 0) {
      setAudioIsMuted(true);
    } else {
      setAudioIsMuted(false);
    }
  }

  function setPlayBack(value) {
    setPlaybackRate(value);
  }

  function togglePlayPause() {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    if (!prevValue) {
      audioPlayerRef.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      audioPlayerRef.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
  }

  function toggleMuteUnmute() {
    const prevValue = audioIsMuted;
    setAudioIsMuted(!prevValue);
    if (!audioIsMuted) {
      audio.muted = true;
      progressVolumeRef.current.value = 0;
      audio.volume = progressVolumeRef.current.value;
    } else {
      audio.muted = false;
      progressVolumeRef.current.value = 0.5;
      audio.volume = progressVolumeRef.current.value;
    }
  }

  function handleKeyPress(e) {
    if (e.charCode === 32) {
      togglePlayPause();
    } else if (e.charCode === 77 || e.charCode === 109) {
      toggleMuteUnmute();
    }
  }

  function teste(e) {
    switch (e.keyCode) {
      case 37:
        timeTravel(Number(progressBarRef.current.value) - 5);
        break;
      case 39:
        timeTravel(Number(progressBarRef.current.value) + 5);
        break;
        default:
        break;
    }
  }

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
        <button
          onKeyPress={(e) => handleKeyPress(e)}
          onKeyDown={(e) => teste(e)}
          className="input-control-by-keyboard"
        >
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
          <button onClick={togglePlayPause} className="button-play">
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
          </button>

          {/* current time */}
          <div>{calculateTime(audioCurrentTime)}</div>

          {/* progress bar */}
          <div className="audio-bar">
            <input
              className="progressBar"
              onChange={changeRange}
              ref={progressBarRef}
              step="0.5"
              type="range"
              defaultValue="0"
            />
          </div>

          {/* duration */}
          <div>{calculateTime(audioDuration)}</div>

          {/* audio bar */}
          <button onClick={toggleMuteUnmute} className="button-volume">
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
          </button>

          <div className="volume-bar">
            <input
              className="volumeBar"
              max="1"
              onChange={changeRangeVolume}
              ref={progressVolumeRef}
              style={{ width: "90%" }}
              step="0.01"
              type="range"
              defaultValue="0.5"
            />
          </div>
        </button>
      </Content>
    </Wrapper>
  );
}

export default AudioPlayer;
