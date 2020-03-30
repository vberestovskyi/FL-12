import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Courses from './components/Courses/Courses';
import CreateCourse from './components/EditCourse/CreateCourse';
import ModifyCourse from './components/EditCourse/ModifyCourse';
import test from './test.json';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      courses: test
    };
  }

  createCourse = () => {
    return {
      id: this.getNewId(),
      name: "",
      description: "",
      duration: "",
      authors: "",
      date: ""
    };
  };

  updateCourse = update => {
    const { courses } = this.state;
    courses.splice(courses.findIndex(course => course.id === update.id), 1, update);
    this.setState({ courses });
  };

  addCourse = CreateCourse => {
    this.setState({ courses: [...this.state.courses, CreateCourse] });
  };

  deleteCourse = id => {
    const { courses } = this.state;
    this.setState({ courses: courses.filter(course => course.id !== id) })
  };

  getNewId = () => {
    const { courses } = this.state;
    const lastId = courses.length ? Math.max(...courses.map(course => course.id)) : 0;
    return lastId + 1;
  };

  copyId = id => {
    return { ...this.state.courses.find(course => course.id === id) }
  };

  render() {
    return (
      <div>
        <BrowserRouter>
          <div className='container'>
            <Switch>
              <Route path='/' exact>
                <Courses
                  courses={this.state.courses}
                  delete={this.deleteCourse}
                />
              </Route>
              <Route path='/add_course'>
                <CreateCourse page="New course"
                  course={this.createCourse()}
                  save={this.addCourse}
                />
              </Route>
              <Route path='/edit/:id'>
                <ModifyCourse page="Edit course"
                  copy={this.copyId}
                  save={this.updateCourse}
                  courses={this.state.courses}
                />
              </Route>
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;