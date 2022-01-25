import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  align-items: center;
  justify-content: center;
  background-color: #232323;
`;

export const Content = styled.div`
  display: flex;
  background-color: #fff;
  max-width: 30rem;
  height: 5rem;
  padding: 0 2rem;
  border-radius: 0.3rem;
  align-items: center;
  justify-content: space-between;

  align-items: center;
  display: flex;
  width: 700px;

  .speed-audio-change {
    position: relative;
    display: inline-block;
  }

  .speed-audio-icon {
    padding: 0.5rem 0.2rem 0.2rem 1rem;
  }

  .speed-audio-options {
    visibility: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    background-color: #f1f1f1;
    margin-right: -1.5rem;
    border-radius: 13px;
    bottom: 2rem;
    z-index: 1;
  }

  .speed-audio-options button:first-child {
    border-radius: 13px 13px 0 0;
  }

  .speed-audio-options button:last-child {
    border-radius: 0 0 13px 13px;
  }
  
  .speed-audio-options button {
    padding: 0.5rem;
    cursor: pointer;
    /* border-radius: 10px; */
    width: 100%;
  }

  .speed-audio-options button:hover {
    padding: 0.5rem;
    cursor: pointer;
    background-color: #e0e0e0;
  }

  .speed-audio-change:hover .speed-audio-options {
    visibility: visible;
  }

  .currentTime,
  .duration {
    font-family: "Poppins", sans-serif;
    font-size: 16px;
  }

  .currentTime {
    margin-left: 25px;
  }

  .progressBar {
    --bar-bg: #ffe3d4;
    --seek-before-width: 0;
    --seek-before-color: #ffc2a1;
    --knobby: #3452a5;
    --selectedKnobby: #26c9c3;

    appearance: none;
    background: var(--bar-bg);
    position: relative;
    width: 100%;
    height: 0.688rem;
    border-radius: 15px;
    outline: none;
  }

  /* progress bar - safari */
  .progressBar::-webkit-slider-runnable-track {
    background: var(--bar-bg);
    position: relative;
    width: 100%;
    height: 0.688rem;
    border-radius: 15px;
    outline: none;
  }

  /* progress bar - firefox */
  .progressBar::-moz-range-track {
    background: var(--bar-bg);
    position: relative;
    width: 100%;
    height: 0.688rem;
    border-radius: 15px;
    outline: none;
  }

  .progressBar::-moz-focus-outer {
    border: 0;
  }

  /* progress bar - chrome and safari */
  .progressBar::before {
    content: "";
    height: 0.688rem;
    width: var(--seek-before-width);
    background-color: var(--seek-before-color);
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    cursor: pointer;
  }

  /* progress bar - firefox */
  .progressBar::-moz-range-progress {
    background-color: var(--seek-before-color);
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    height: 0.688rem;
  }

  /* knobby - chrome and safari */
  .progressBar::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 0.938rem;
    width: 0.938rem;
    border-radius: 50%;
    border: none;
    background-color: var(--knobby);
    cursor: pointer;
    position: relative;
    margin: -2px 0 0 0;
    z-index: 3;
    box-sizing: border-box;
  }

  /* knobby while dragging - chrome and safari */
  .progressBar:active::-webkit-slider-thumb {
    transform: scale(1.2);
    background: var(--selectedKnobby);
  }

  /* knobby - firefox */
  .progressBar::-moz-range-thumb {
    height: 0.938rem;
    width: 0.938rem;
    border-radius: 50%;
    border: transparent;
    background-color: var(--knobby);
    cursor: pointer;
    position: relative;
    z-index: 3;
    box-sizing: border-box;
  }

  /* knobby while dragging - firefox */
  .progressBar:active::-moz-range-thumb {
    transform: scale(1.2);
    background: var(--selectedKnobby);
  }


  /* volume */
  
  .volumeBar {
    --bar-bg: #ffe3d4;
    --seek-before-width: 0;
    --disable-volume: initial;
    --seek-before-color: #ffc2a1;
    --knobby: #3452a5;
    --selectedKnobby: #26c9c3;

    appearance: none;
    background: var(--bar-bg);
    position: relative;
    width: 100%;
    height: 0.688rem;
    border-radius: 15px;
    outline: none;
    pointer-events: var(--disable-volume);
  }

  /* progress bar - safari */
  .volumeBar::-webkit-slider-runnable-track {
    background: var(--bar-bg);
    position: relative;
    width: 100%;
    height: 0.688rem;
    border-radius: 15px;
    outline: none;
  }

  /* progress bar - firefox */
  .volumeBar::-moz-range-track {
    background: var(--bar-bg);
    position: relative;
    width: 100%;
    height: 0.688rem;
    border-radius: 15px;
    outline: none;
  }

  .volumeBar::-moz-focus-outer {
    border: 0;
  }

  /* progress bar - chrome and safari */
  .volumeBar::before {
    content: "";
    height: 0.688rem;
    width: var(--seek-before-width);
    background-color: var(--seek-before-color);
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    cursor: pointer;
  }

  /* progress bar - firefox */
  .volumeBar::-moz-range-progress {
    background-color: var(--seek-before-color);
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    height: 0.688rem;
  }

  /* knobby - chrome and safari */
  .volumeBar::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 0.938rem;
    width: 0.938rem;
    border-radius: 50%;
    border: none;
    background-color: var(--knobby);
    cursor: pointer;
    position: relative;
    margin: -2px 0 0 0;
    z-index: 3;
    box-sizing: border-box;
  }

  /* knobby while dragging - chrome and safari */
  .volumeBar:active::-webkit-slider-thumb {
    transform: scale(1.2);
    background: var(--selectedKnobby);
  }

  /* knobby - firefox */
  .volumeBar::-moz-range-thumb {
    height: 0.938rem;
    width: 0.938rem;
    border-radius: 50%;
    border: transparent;
    background-color: var(--knobby);
    cursor: pointer;
    position: relative;
    z-index: 3;
    box-sizing: border-box;
  }

  /* knobby while dragging - firefox */
  .volumeBar:active::-moz-range-thumb {
    transform: scale(1.2);
    background: var(--selectedKnobby);
  }
`;
