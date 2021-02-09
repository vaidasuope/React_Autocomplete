import React, {useState, useEffect, useRef} from 'react';
import movie from '../img/movie.svg';
import glass from '../img/search.svg';

function Search() {

    const [search, setSearch] = useState("");
    const [options, setOptions] = useState([]);
    const [chosen, setChosen] = useState("");
    options.length = 8;

    const [display, setDisplay] = useState(false);
    const dropDownRef = useRef(null);


    useEffect(() => {
        const fetchData = () => {
            fetch(`https://api.themoviedb.org/3/search/movie?api_key=a34754f25589f98bec2073c96c8d3cd5&query=${search}`)
                .then((response) => response.json())
                .then(movies => {
                    console.log(movies.results)
                    setOptions(movies.results.map(movie => {
                        return movie;
                        // console.log(movie.original_title)
                    }))
                })
        }
        if (search !== "" && search.length >= 3) {
            fetchData();
            // setDisplay(!display);
        }
    }, [search]);


    /*const optionsArray = [];
    const getAPI = async () => {
        if (search !== "" && search.length >= 3){
            const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=a34754f25589f98bec2073c96c8d3cd5&query=${search}`);
            const getData = await response.json();
            console.log(getData.results)
            const movies = getData.results;
            movies.forEach(movie =>{
                if (optionsArray.length<8){
                    optionsArray.push(movie)
                }
            });
            setOptions(optionsArray);
        }
    }
    useEffect(() => {
        getAPI();
    },[search])

*/
    useEffect(() => {
        window.addEventListener("mousedown", handleClickOutside);

        return () => {
            window.removeEventListener("mousedown", handleClickOutside)
        };
    }, []);

    const handleClickOutside = event => {
        const {current: dropDown} = dropDownRef;
        if (dropDown && !dropDown.contains(event.target)) {
            setDisplay(false);
        }
    }

    const setInputField = movie => {
        setSearch(movie);
        setDisplay(false);
    }

    function onSubmit (e,i) {
        e.preventDefault();
        setSearch("");
        console.log("submit")
        console.log(search)
    }




    return (
        <div className="search">
            <form onSubmit={onSubmit} className="input">
                <div ref={dropDownRef} className="field">
                    <img className="firstPhoto" src={movie} alt="Movie"/>
                    <input
                        id="searchInput"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onClick={() => setDisplay(!display)}
                        placeholder="Enter movie name"/>
                    {display && (<label>Enter a movie name</label>)}

                    {(display && search.length>=3) && (
                        <div className="dropDownContainer">
                            {options.map((item, index) => {
                                return (
                                    <div
                                        onClick={() => setInputField(item.title)}
                                        className="options"
                                        key={index}>
                                        <span>{item.title}</span>
                                        <p>{item.vote_average} Raiting, {item.release_date?item.release_date.split("-")[0]:false}</p>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
                <div className="searchButton">
                    <button type="submit"><img src={glass} alt="Magnifying glass"/></button>
                </div>
            </form>


        </div>

    );

}

export default Search;