let todoList = [];
todoList.push({ value: 'Bred' });
todoList.push({ value: 'Buter' });

class Li extends React.Component {
  constructor(props) {
    super(props);
    this.buttonDeleteLi = this.buttonDeleteLi.bind(this);
    this.buttonRenameLi = this.buttonRenameLi.bind(this);
    this.inputNewValue = this.inputNewValue.bind(this);
    this.state = {
      inputNewValueState: false,
      newValueState: this.props.liName.value
    };
  }
  buttonDeleteLi() {
    this.props.deleteLi(this.props.id);
  }
  buttonRenameLi(e) {
    e.preventDefault();
    this.setState({ newValueState: this.props.liName.value });
    if (this.state.inputNewValueState && this.state.newValueState) {
      this.setState({ inputNewValueState: false, });
      this.props.renameLi(this.props.id, this.state.newValueState);
    } else {
      this.setState({ inputNewValueState: true });
    }
  }
  inputNewValue(event) {
    // this.state.preventDefault;

    // this.setState(() => ({ newValueState: event.target.value }));
    this.setState({ newValueState: event.target.value });
  }
  render() {
    return (
      <li className='li' id={this.props.id + 1}>
        <form onSubmit={this.buttonRenameLi} className="for-rename">
          {
            this.state.inputNewValueState &&
            <input
              onChange={this.inputNewValue}
              className="input-for-rename input"
              placeholder='enter new name'
              value={undefined}
            />
          }
          {
            this.state.inputNewValueState ||
            <div className="text">
              <p onClick={this.buttonRenameLi}>{this.props.liName.value}</p>
            </div>
          }
          <button className="button" type="submit">Rename</button>
        </form>
        <button className="button" onClick={this.buttonDeleteLi}>Delete</button>
      </li>
    )
  }

}

class List extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const liElements = this.props.liElements.map((el, i) => {
      return (
        <Li
          id={i} liName={el} key={i}
          deleteLi={this.props.deleteLi}
          renameLi={this.props.renameLi}
        />
      );
    })
    return (
      <ul className="list">
        {liElements}
      </ul>
    )
  }
}

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.buttonDeleteList = this.buttonDeleteList.bind(this);
    this.changeInput = this.changeInput.bind(this);
    this.state = { value: '' };
  }
  submit(e) {
    e.preventDefault();
    const value = this.state.value;
    if (value) {
      this.setState({ value: '' });
      this.props.addLi(value);
    }
  }
  buttonDeleteList() {
    this.props.deleteList();
  }
  changeInput(event) {
    this.setState({ value: event.target.value });
  }
  render() {
    return (
      <>
        <div className="form">
          <form onSubmit={this.submit}>
            <input
              type="text"
              className="input"
              placeholder="add..."
              value={this.state.value}
              onChange={this.changeInput}
            />
            <button type="submit" className="button submit">Add</button>
          </form>
          <button className="button delete-list" onClick={this.buttonDeleteList}>DeleteAll</button>
        </div>
      </>
    );
  }
}

class Todo extends React.Component {
  constructor(props) {
    super(props)
    this.deleteList = this.deleteList.bind(this);
    this.deleteLi = this.deleteLi.bind(this);
    this.renameLi = this.renameLi.bind(this);
    this.addLi = this.addLi.bind(this);
    this.state = { change: '' };
  }
  deleteList() {
    todoList.splice(0);
    this.setState({ change: todoList });
  }
  deleteLi(index) {
    todoList.splice(index, 1);
    this.setState({ change: todoList });
    // this.setState((state) => ({ todoList: state.todoList }));
  }
  renameLi(index, value) {
    todoList.splice(index, 1, { value: value })
    // todoList[index].value = value;
    this.setState({ change: todoList });
  }
  addLi(value) {
    todoList.push({ value: value });
    this.setState({ value: todoList });
  }
  render() {
    console.log(todoList)
    return (
      <>
        <h1>Todo list</h1>
        <Form deleteList={this.deleteList} addLi={this.addLi} />
        <List
          deleteLi={this.deleteLi}
          renameLi={this.renameLi}
          liElements={this.props.liElements}
        />
      </>
    );
  }
}

ReactDOM.render(<Todo liElements={todoList} />, document.getElementById("root"));
