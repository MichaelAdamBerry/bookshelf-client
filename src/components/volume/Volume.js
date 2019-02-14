import React from "react";
import queryString from "query-string";
import { Spring } from "react-spring/renderprops";
import Card from "../card/Card";
import VolumeCardView from "./VolumeCardView";
import PropTypes from "prop-types";
import Spinner from "../Spinner";

const RenderVolume = ({ volume }) => {
  return (
    <Spring from={{ opacity: 0 }} to={{ opacity: 1 }} delay={300}>
      {({ opacity }) => (
        <div style={{ opacity }}>
          <Card
            volume={volume}
            volumeInfo={volume.volumeInfo}
            render={({ props }) => {
              return <VolumeCardView {...props} />;
            }}
          />
        </div>
      )}
    </Spring>
  );
};

RenderVolume.propTypes = {
  volume: PropTypes.object.isRequired
};

//TODO componentDidMount should call
export default class Volume extends React.Component {
  state = { loading: true };

  async componentDidMount() {
    const search = queryString.parse(this.props.location.search);
    const apiUrl = "/volume-data/id/" + search.id;
    const data = await fetch(apiUrl);
    const volume = await data.json();
    this.setState({ volume: volume.data });
    setTimeout(() => {
      this.setState({ loading: false });
    }, 1000);
  }
  render() {
    const { loading, volume } = this.state;
    return (
      <div>
        {!loading ? (
          <RenderVolume volume={volume} />
        ) : (
          <div className="volumeContainer" style={{ display: "flex" }}>
            <Spinner style={{ alignItems: "center" }} />
          </div>
        )}
      </div>
    );
  }
}
