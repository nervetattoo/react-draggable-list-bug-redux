import React, { Component } from 'react';
import { connect } from 'react-redux'
import cx from 'classnames';
import DraggableList from 'react-draggable-list';

import './App.css';

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
        {dragHandle(<h2>{ item.name }</h2>)}
      </div>
    );
  }
}

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      useContainer: false,
    }
  }

  render() {
    const planets = this.props.planets.map((name, key) => ({name,key}))
    const { useContainer } = this.state

    return (
      <div className="App">
        <div className="App-intro" ref="container">
          <DraggableList
            itemKey="key"
            template={Planet}
            list={planets}
            onMoveEnd={(newList, obj, indexA, indexB) => this.props.move(indexA, indexB)}
            container={()=>useContainer ? this.refs.container : document.body}
            />
        </div>
      </div>
    );
  }
}

export default connect(
  state => state,
  dispatch => ({
    move: (indexA, indexB) => {
      console.log('move', indexA, indexB);
      dispatch({
        type: 'MOVE',
        payload: {indexA, indexB}
      })
    }
  })
)(App)
