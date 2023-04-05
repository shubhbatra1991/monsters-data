import { Component } from 'react';
import CardList from './components/card-list/card-list.component';

import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchField: ''
    };
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response)=> response.json())
      .then((users) => 
        this.setState( () => {
          return { monsters: users };
        },
      ));
  }

  // anonymous function for on change
  onSearchChange = (event) => {
    const searchField = event.target.value.toLocaleLowerCase();
    this.setState(()=> {
      return { searchField };
    });
  }

  render(){

    // making it more readable
    const { monsters, searchField } = this.state;
    const { onSearchChange } = this;

    // monsters name
    const filteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });

    return (
      <div className="App">
        <input 
          className='search-box' 
          type='search' 
          placeholder='search monsters' 
          onChange={onSearchChange} 
        />
       {/* {
        filteredMonsters.map((monster)=>{
          return (
          <div  key={monster.id}>
            <h1>{monster.name}</h1>
          </div>
          );
        })
       } */}

       <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

export default App;
