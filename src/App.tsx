import { useState, useEffect, ChangeEvent } from 'react';
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';
import './App.css';

import { getData } from './utils/data.utils';

export type Monster = {
  id:  string;
  name: string;
  email: string;
}



const App = () => {
  
  const [searchField, setSearchField] = useState('');
  const [title, setTitle] = useState('');
  const [ monsters, setMonsters] =useState<Monster[]>([]);
  const [filteredMonsters, setFilterMonsters] = useState(monsters);
  

  useEffect(()=> {
    const fetchUsers = async () => {
      const users= await getData<Monster[]>('https://jsonplaceholder.typicode.com/users');
      setMonsters(users);
    };

    fetchUsers();
  }, []);


  useEffect(()=> {
    const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });

    setFilterMonsters(newFilteredMonsters);
  },[monsters, searchField]);

  const  onSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
      const searchFieldString = event.target.value.toLocaleLowerCase();
      setSearchField(searchFieldString);
  };

  const  onTitleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setTitle(searchFieldString);
};

  return (
    <div className="App">
        <h1 className='app-title'> {title}</h1>


        <SearchBox 
            onChangeHandler = {onSearchChange} 
            placeholder = 'search monsters' 
            className='search-box' 
        />
        <br />
        <SearchBox 
            onChangeHandler = {onTitleChange} 
            placeholder = 'set title' 
            className='title-search-box' 
        />
       
       <CardList monsters={filteredMonsters} />
      </div>
  )
}


// class App extends Component {
//   constructor() {
//     super();

//     this.state = {
//       monsters: [],
//       searchField: '',
//     };
//   }

  // componentDidMount() {
  //   fetch('https://jsonplaceholder.typicode.com/users')
  //     .then((response)=> response.json())
  //     .then((users) => 
  //       this.setState( () => {
  //         return { monsters: users };
  //       },
  //     ));
  // }

//   // anonymous function for on change
//   onSearchChange = (event) => {
//     const searchField = event.target.value.toLocaleLowerCase();
//     this.setState(()=> {
//       return { searchField };
//     });
//   }

//   render(){

//     // making it more readable
//     const { monsters, searchField } = this.state;
//     const { onSearchChange } = this;

//     // monsters name
//     const filteredMonsters = monsters.filter((monster) => {
//       return monster.name.toLocaleLowerCase().includes(searchField);
//     });

//     return (
//       <div className="App">
//         <h1 className='app-title'> Monsters Data</h1>

//         <SearchBox 
//             onChangeHandler = {onSearchChange} 
//             placeholder = 'search monsters' 
//             className='search-box' 
//         />
       
//        <CardList monsters={filteredMonsters} />
//       </div>
//     );
//   }
// }

export default App;
