import React from "react";
import "./style.css";
import { Map, Markers } from "react-amap";

const randomPosition = () => ({
  longitude: 100 + Math.random() * 20,
  latitude: 30 + Math.random() * 20
});

const randomMarker = len =>
  Array(len)
    .fill(true)
    .map((e, idx) => ({
      position: randomPosition()
    }));

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [],
      center: randomPosition()
    };
  }
  tranform = array => {
    return array.map(item => {
      return {
        longitude: item.x,
        latitude: item.y
      };
    });
  };
  async componentDidMount() {
    const data = await fetch("/api/friends/10");
    this.setState({ markers: tranform(data) });
  }
  render() {
    return (
      <div>
        <div style={{ width: "100%", height: 372 }}>
          <Map plugins={["ToolBar"]} center={this.state.center} zoom={6}>
            <Markers markers={this.state.markers} />
          </Map>
        </div>
      </div>
    );
  }
}
