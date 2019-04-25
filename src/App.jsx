import React from 'react';
import Timer from './components/Timer';
import TodoItem from './components/TodoItem';
import TodoInput from './components/TodoInput';
import ClearButton from './components/ClearButton';
import EmptyState from './components/EmptyState';

import './styles/App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.addItem = this.addItem.bind(this);
    this.clearCompletedItems = this.clearCompletedItems.bind(this);
    this.startSession = this.startSession.bind(this);
    this.increaseSessionsCompleted = this.increaseSessionsCompleted.bind(this);
    this.toggleItemIsCompleted = this.toggleItemIsCompleted.bind(this);

    this.state = {
      items : [],
      nextItemID: 0,
      sessionIsRunning: false,
      itemIdRunning: null,
      areItemsMarkedAsCompleted: false
    };
  }

  addItem(description) {
    const { nextItemId } = this.state;
    var newId = nextItemId + 1;
    const newItem = {
      id: nextItemId,
      description: description,
      sessionsCompleted: 0,
      isCompleted: false,
    };
    this.setState((prevState) => {
      return {
        id: newId,
        items: prevState.items.concat([newItem])
      }
    });
  }

  clearCompletedItems() {
    this.setState((prevState) => {
      const filter = prevState.items.filter(item => item.isCompleted === false);
      //console.log(filter);
      return {
        items: filter,
        areItemsMarkedAsCompleted: false
      }
    });
  }

  increaseSessionsCompleted(itemId) {
    var target = null;
    var items = this.state.items;
    for (var i = 0; i < items.length; i+=1) {
      var curr = items[i];
      if (curr.id === itemId) {
        target = curr;
        items.splice(i, 1);
        break;
      }
    }
    curr.sessionsCompleted += 1;
    this.setState((prevState) => {
      return {
        items: prevState.items.concat([curr]),

      }
    });
  }

  toggleItemIsCompleted(itemId) {
    var target = null;
    var items = this.state.items;
    for (var i = 0; i < items.length; i+=1) {
      var curr = items[i];
      if (curr.id === itemId) {
        target = curr;
        items.splice(i, 1);
        break;
      }
    }
    curr.isCompleted = true;
    this.setState((prevState) => {
      return {
        items: prevState.items.concat([curr]),
        areItemsMarkedAsCompleted: true
      }
    });
  }

  startSession(id) {
   this.setState({
     sessionIsRunning: true,
     itemIdRunning: id,
   })
  }


  render() {
    const {
      items,
      sessionIsRunning,
      itemIdRunning,
      areItemsMarkedAsCompleted,
    } = this.state;

    return (
      <div className="flex-wrapper">
        <div className="container">
          <header>
            <h1 className="heading">Today</h1>
            {areItemsMarkedAsCompleted && <ClearButton onClick={this.clearCompletedItems} />}
          </header>
          {sessionIsRunning && <Timer mode="WORK"
                                      onSessionComplete={ () => this.increaseSessionsCompleted(itemIdRunning)}
                                      autoPlays/>}
          {items.length === 0? (
              <EmptyState />
          ) : (


            <div className="items-container">
            {items.map((item) => (
                <TodoItem
              description={item.description} sessionsCompleted={item.sessionsCompleted}
              isCompleted={item.isCompleted} startSession={() => this.startSession(item.id)}
              toggleIsCompleted = {() => this.toggleItemIsCompleted(item.id)}
              key={item.id}
              />
              ))}
            </div>
          )}
        </div>
        <footer>
          <TodoInput addItem={this.addItem} />
        </footer>
      </div>
    );
  }
}

export default App;
