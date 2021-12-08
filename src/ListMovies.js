import React, {useState, useEffect} from "react";
import axios from 'axios'
import './table.css';

function ListMovies(props) {
    const getMoviesURL = "https://prod-61.westus.logic.azure.com/workflows/984d35048e064b61a0bf18ded384b6cf/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=6ZWKl4A16kST4vmDiWuEc94XI5CckbUH5gWqG-0gkAw";
    const postMoviesURL = "https://prod-62.westus.logic.azure.com:443/workflows/779069c026094a32bb8a18428b086b2c/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=o_zIF50Dd_EpozYSPSZ6cWB5BRQc3iERfgS0m-4gXUo";

    const [movies, setMovies] = useState([]);
    const [moviesByRating, setByRating] = useState([]);
    const [moviesByMeta, setByMeta] = useState([]);

    const getMovies = () =>{
        axios.get(getMoviesURL)
        .then(res => {
            setMovies(res.data.response)
        })
        .catch(err => {
            console.log(err)
        })
    }
    
    useEffect(()=>{
        if(movies.length !== 0){
            const sortedByRating = [].concat(movies.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating)));
            setByRating(sortedByRating)
            const sortedByMeta = [].concat(movies.sort((a,b) => parseFloat(b.metascore) - parseFloat(a.metascore))).map(movie => movie.title);
            setByMeta(sortedByMeta)
        }
    },[movies])
    
    useEffect(()=>{
        if(moviesByMeta.length !== 0){
            const bodyData = {
                "RUT" : "19419043-3",
                "Peliculas" : moviesByMeta
            };
            axios.post(postMoviesURL,bodyData)
            .then(res =>{
                console.log(res.data.message)
            })
            .catch(err =>{
                console.log(err)
            })
        }
    },[moviesByMeta])
    
    return (
        <div>
            <button id = "buttons" className = "btn purple" onClick = {() => getMovies()}>Mostrar películas</button>
            {movies.length > 0 
            ?
            <div id ="main-container">
                <table>
                    <thead>
                        <tr>
                            <th>N°</th>
                            <th>Título</th>
                            <th>Director</th>
                            <th>Año</th>
                            <th>Rating</th>
                            <th>Metascore</th>
                        </tr>
                    </thead>
                    <tbody>
                        {moviesByRating.map((movie, index) =>{
                            return(
                            <tr key = {index}>
                            <td>{++index}</td>
                            <td>{movie.title}</td>
                            <td>{movie.director}</td>
                            <td>{movie.year}</td>
                            <td>{movie.rating}</td>
                            <td>{movie.metascore}</td>
                            </tr>)
                        })
                        }
                    </tbody>
                </table>
            </div>
            :
            ""
            }
        </div>
    )
}

export default ListMovies