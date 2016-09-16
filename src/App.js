import React, { Component } from 'react';
import { reduxForm, Field, FieldArray } from 'redux-form'
import { connect } from 'react-redux'
import cx from 'classnames';
import DraggableList from 'react-draggable-list';

import './App.css';

const renderPlanet = ({ input, name }) => {
  return (
    <h2>{ input.value }</h2>
  )
}
class Planet extends React.Component {
  getDragHeight() {
    return this.props.item.subtitle ? 47 : 28;
  }

  render() {
    const {item, itemSelected, dragHandle} = this.props;
    const scale = itemSelected * 0.05 + 1;
    const shadow = itemSelected * 15 + 1;
    const dragged = itemSelected !== 0;

    return (
      <div
        className={cx('item', {dragged})}
        style={{
          transform: `scale(${scale})`,
          boxShadow: `rgba(0, 0, 0, 0.3) 0px ${shadow}px ${2 * shadow}px 0px`
        }}>
        {dragHandle(
          <Field name={item.name} component={renderPlanet} />
        )}
      </div>
    );
  }
}

const renderPlanets = ({ fields, ...props }) => {
  const planets = fields.map((name, index) => ({
    key: props.planets[index],
    name
  }))
  return (
    <DraggableList
      itemKey="key"
      template={Planet}
      list={planets}
      onMoveEnd={(newList, obj, indexA, indexB) => fields.move(indexA, indexB)}
      />
    )
}

class App extends Component {
  render() {
    const { planets } = this.props.initialValues
    return (
      <div className="App">
        <div className="App-intro" ref="container">
          <FieldArray
            name='planets'
            planets={planets}
            component={renderPlanets} />
        </div>
      </div>
    );
  }
}

App = reduxForm({
  form: 'test',
})(App)

App = connect(
  state => ({
    initialValues: {
      planets: state.planets
    }
  })
)(App)

export default App
