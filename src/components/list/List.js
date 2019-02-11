import React from "react";
import Card from "../card/Card";
import PropTypes from "prop-types";
import CardSpring from "./ListCardView";
import Spinner from "../Spinner";

const ListItem = ({ volume }) => {
  return (
    <Card
      volume={volume}
      volumeInfo={volume.volumeInfo}
      render={({ props }) => {
        return <CardSpring {...props} />;
      }}
    />
  );
};
ListItem.propTypes = {
  volume: PropTypes.object.isRequired
};

export const ListView = ({ volumes, loading }) => {
  return (
    <div data-testid="listWrapper" className="listWrapper">
      {!loading ? (
        volumes.map(volume => (
          <ListItem volume={volume} key={Math.random() * 10} />
        ))
      ) : (
        <div
          className="listContainer"
          style={{ display: "flex", alignItems: "center", minHeight: "100vh" }}>
          <Spinner />
        </div>
      )}
    </div>
  );
};

ListView.propTypes = {
  volumes: PropTypes.array.isRequired
};

class List extends React.Component {
  state = { loading: true };
  componentDidMount() {
    const { history } = this.props;
    fetch("/query-list-data")
      .then(res => res.json())
      .then(json => {
        if (!json.data.items) {
          this.setState({ noResults: true });
          history.replace({ pathname: "/", state: { error: true } });
        }
        console.log(json.data.items);
        this.setState({ volumes: json.data.items });
      });

    setTimeout(() => {
      this.setState({ loading: false });
    }, 1000);
  }
  render() {
    const { volumes, noResults, loading } = this.state;
    return (
      <div>
        <ListView volumes={volumes} noResults={noResults} loading={loading} />
      </div>
    );
  }
}

export default List;
