import React from "react";
import "./App.css";
import music from "./Summer_Love_trim.mp3";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userTouch: false,
    };
    this.audioContext = {};
  }
  componentDidMount() {
    let canvas,
      ctx,
      source,
      analyser,
      fbc_array,
      bar_count,
      bar_pos,
      bar_width,
      bar_height;

    var audio = new Audio();

    audio.src = music;
    audio.controls = true;
    audio.loop = false;
    audio.autoplay = false;

    document.getElementById("audio").appendChild(audio);

    this.audioContext = new AudioContext();
    analyser = this.audioContext.createAnalyser();
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    source = this.audioContext.createMediaElementSource(audio);

    canvas.width = window.innerWidth * 0.8;
    canvas.height = window.innerHeight * 0.6;

    source.connect(analyser);
    analyser.connect(this.audioContext.destination);

    FrameLooper();
    this.setState({ audioContext: this.audioContext });

    function FrameLooper() {
      window.RequestAnimationFrame =
        window.requestAnimationFrame(FrameLooper) ||
        window.msRequestAnimationFrame(FrameLooper) ||
        window.mozRequestAnimationFrame(FrameLooper) ||
        window.webkitRequestAnimationFrame(FrameLooper);

      fbc_array = new Uint8Array(analyser.frequencyBinCount);
      bar_count = window.innerWidth / 2;

      analyser.getByteFrequencyData(fbc_array);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#ffffff";

      for (var i = 0; i < bar_count; i++) {
        bar_pos = i * 4;
        bar_width = 2;
        bar_height = -(fbc_array[i] / 2);

        ctx.fillRect(bar_pos, canvas.height, bar_width, bar_height);
      }
    }
  }

  render() {
    return (
      <div className="App">
        <div id="player">
          <div id="audio"></div>
          <canvas id="canvas"></canvas>
          {/* <button
            onClick={() => {
              this.setState({ userTouch: true });
            }}
          >
            User interaction
          </button> */}
        </div>
      </div>
    );
  }
}

export default App;
