import React from "react";
import { Spring, config, animated as a } from "react-spring/renderprops";
import CoverImg from "../CoverImg";
import PropTypes from "prop-types";
import stripHtml from "string-strip-html";

const Front = ({ imageLinks }) => {
  return <CoverImg imageLinks={imageLinks} maxRes={true} width={"350px"} />;
};

const Back = () => {
  return <div className="back" />;
};

export default class BookFlipper extends React.Component {
  state = { flipped: false };

  static propTypes = {
    description: PropTypes.string,
    previewLink: PropTypes.string
  };

  handleClick = () => {
    this.setState(prevState => ({ flipped: !prevState.flipped }));
  };

  render() {
    const { description, previewLink, imageLinks } = this.props;
    const { flipped } = this.state;
    return (
      <div onClick={this.handleClick} className="imgWrapper">
        <Spring
          config={key =>
            key === "opacity"
              ? { tension: "120", friction: "120" }
              : config.slow
          }
          to={{
            opacity: `${flipped ? "1" : "0"}`,
            transform: `perspective(600px) rotateY(${
              flipped ? "180" : "0"
            }deg)`,
            backgroundColor: `${flipped ? "#2f2f2f" : "#f7fbfc"}`
          }}>
          {({ opacity, transform }) => (
            <>
              <a.div
                className="c front"
                style={{
                  opacity: `${flipped ? "0" : "1"}`,
                  transform,
                  boxShadow: "rgb(51, 46, 46) 5px 5px 30px"
                }}>
                <Front imageLinks={imageLinks} />
              </a.div>
              <a.div
                className="c back"
                style={{
                  opacity,
                  transform,
                  border: "1.5px solid rgb(33, 33, 33)",
                  borderRadius: "3%",
                  boxShadow: "rgb(51, 46, 46) 5px 5px 30px"
                }}>
                <Back description={description} previewLink={previewLink} />
              </a.div>
              <a.div
                className="c"
                style={{
                  opacity
                }}>
                <p>{stripHtml(description)}</p>
              </a.div>
            </>
          )}
        </Spring>
      </div>
    );
  }
}
