import './App.css';
import GetMovies from './ListMovies';

function App(){
return (
    <div className="App">
        <header className="App-header">
            Listado de las 10 mejores películas según ranking IMDB
        </header>
        <GetMovies />
    </div>
);
}

export default App;
