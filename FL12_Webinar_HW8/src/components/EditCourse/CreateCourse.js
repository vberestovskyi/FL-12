import React from 'react';
import { Route, Link, withRouter } from 'react-router-dom';
import './EditCourse.css';

class EditProp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isChanged: false
    };
  }

  render() {
    const { type, title, name, value } = this.props;
    if (type === 'input') {
      return (
        <div className={`${name}`}>
          <div>{title}*</div>
          <input
            value={value}
            onChange={e => {
              this.props.changeValue(name, e.target.value);
              this.setState({ isChanged: true });
            }}
          />
        </div>
      )
    } else if (type === 'field') {
      return (
        <div className={`${name}`}>
          <div>{title}*</div>
          <textarea
            rows="5"
            value={value}
            onChange={e => {
              this.props.changeValue(name, e.target.value);
              this.setState({ isChanged: true });
            }}
          />
        </div>
      )
    } else if (type === 'date') {
      return (
        <div className={`${name}`}>
          <div>{title}*</div>
          <input
            type="date"
            value={value}
            onChange={e => {
              this.props.changeValue(name, e.target.value);
              this.setState({ isChanged: true });
            }}
          />
        </div>
      )
    }
  }
}

class CreateCourse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      course: props.course
    };
  }

  changeProp = (name, value) => {
    this.setState({
      course: { ...this.state.course, [name]: value }
    });
  };

  getCourseProps = () => Object.keys(this.state.course).filter(key => key !== "id");

  render() {
    return (

      <div className="course">
        <h1 style={{ fontSize: "2rem", margin: "1rem", textAlign: "center" }}>
          {this.props.page}
        </h1>
        <div className="inputs">
          {this.getCourseProps().map(property => property === "description" ?
            (
              <EditProp type="field"
                key={property}
                title={property === "name" ? "Title" : property}
                name={property}
                value={this.state.course[property]}
                changeValue={this.changeProp}
              />
            ) : property === "date" ?
              (
                <EditProp type="date"
                  key={property}
                  title={property === "name" ? "Title" : property}
                  name={property}
                  value={this.state.course[property]}
                  changeValue={this.changeProp}
                />
              ) :
              (
                <EditProp type="input"
                  key={property}
                  title={property === "name" ? "Title" : property}
                  name={property}
                  value={this.state.course[property]}
                  changeValue={this.changeProp}
                />
              )
          )}
          <div className="btn-container">
            <Route
              render={({ history }) => (
                <button className="btn-save"
                  type="button"
                  onClick={() => {
                    this.props.save(this.state.course);
                    history.push("/");
                  }}
                >
                  Save
                </button>
              )}
            />
            <Link to="/" className="btn-cancel">
              Cancel
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(CreateCourse);