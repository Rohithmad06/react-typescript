import React from "react";
import { connect } from "react-redux";
import { Todo, fetchTodos, deleteTodo } from "../actions";
import { StoreState } from "../reducers";

interface AppProps {
  todos: Todo[];
  fetchTodos: Function;
  deleteTodo: Function;
}

interface AppState {
  fetching: Boolean;
}
class _App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = { fetching: false };
  }

  componentDidUpdate(prevProps: AppProps): void {
    if (!prevProps.todos.length && this.props.todos.length) {
      this.setState({ fetching: false });
    }
  }
  onButtonClick = (): void => {
    this.setState({ fetching: true });
    this.props.fetchTodos();
  };

  onListClick = (id: number): void => {
    this.props.deleteTodo(id);
  };

  renderList = (): JSX.Element[] => {
    return this.props.todos.map((todo: Todo) => (
      <p key={todo.id} onClick={() => this.onListClick(todo.id)}>
        {this.state.fetching ? "LOADING" : null}
        {todo.title}
      </p>
    ));
  };

  render() {
    return (
      <>
        <button onClick={this.onButtonClick}>Fetch</button>
        {this.renderList()}
      </>
    );
  }
}

const mapStateToProps = ({ todos }: StoreState): { todos: Todo[] } => {
  return { todos };
};

export const App = connect(mapStateToProps, { fetchTodos, deleteTodo })(_App);
