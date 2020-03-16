import React from 'react';
import { Link } from 'react-router-dom';
import './Courses.css';
import iconEdit from './edit.svg';
import iconDelete from './delete.svg';

class SearchInput extends React.Component {
  render() {
    return (
      <input
        className="search-input"
        placeholder="Search"
        type="text"
        value={this.props.value}
        onChange={e => this.props.onChange(e.target.value)}
      />
    );
  }
}

class CourseItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  toggleEdit = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    const { name, description, duration, date } = this.props.course;
    const course = this.props.course;
    return (
      <div className="courses">
        <div>{date}</div>
        <div style={{ fontWeight: "bold" }}>{name}</div>
        <div>{description}</div>
        <div>{duration}</div>
        <div>
          <span className="edit-container" onClick={this.toggleEdit}>...</span>
          {this.state.isOpen ? (
            <div style={{ position: "relative" }}>
              <div className="edit-menu">
                <div className="edit-content"></div>
                <Link to={`/edit/${course.id}`}>
                  <img src={iconEdit} alt="Edit course" width="15px" className="icon" />Edit
                </Link>
                <div
                  onClick={() => {
                    this.props.delete(this.props.course.id)
                  }
                  }
                  style={{ cursor: "pointer" }}
                >
                  <img src={iconDelete} alt="Delete course" width="15px" className="icon" />Delete
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

class CoursesList extends React.Component {
  render() {
    return (
      <div>
        {this.props.courses.map(course => (
          <CourseItem key={course.id}
            course={course}
            delete={this.props.delete}
          />)
        )}
      </div>
    );
  }
}

class Courses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ""
    };
  }

  searchCourses = () => {
    return this.props.courses.filter(course => {
      return course.name.toLowerCase().includes(this.state.search.toLowerCase())
    });
  };

  changeSearch = searchStr => this.setState({ search: searchStr });

  render() {
    return (
      <div>
        <div className="search-container">
          <SearchInput placeholder="Search"
            value={this.state.search}
            onChange={this.changeSearch} />
          <Link to="/add_course" className="btn-add">
            Add Course
          </Link>
        </div>
        <CoursesList
          courses={this.searchCourses()}
          delete={this.props.delete} />
      </div>
    );
  }
}

export default Courses;