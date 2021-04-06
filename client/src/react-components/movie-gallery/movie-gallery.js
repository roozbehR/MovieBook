import React, { useState, useEffect } from "react";
import "./style.css";
import { Card, Spin } from 'antd'
import { getHookRandomMovie } from '../../actions/movies';

export default function MovieGallery() {
  const [movies, setMovies] = useState({ randomMovies: [] });

  //similar to ComponentDidMount
  useEffect(() => {
    // fetch Movies for 6 times
    const fetchMovies = async () => {
      let tempMovies = [];
      let i = 0;
      for (i; i < 6; i++) {
        let response = await getHookRandomMovie();
        if (response) await tempMovies.push(response);
      }
      setMovies({ randomMovies: tempMovies });
    }

    fetchMovies().then(() => {
      console.log("result")
      console.log(movies.randomMovies)
    });
  }, [])

  return (
    <div>
      {movies.randomMovies.length === 0 && <div className="loading"><Spin /></div>}
      {movies.randomMovies.length !== 0 && (
        <Card title="Recent Movies">
          {console.log(movies)}
          <div>
            <div className="imagesContainer">
              <div className="row">
                <div>
                  <a href={movies.randomMovies[0].randomMovie._id}>
                    <img
                      className="imageStyle"
                      src={movies.randomMovies[0].randomMovie.poster ?? 'images/default_poster.jpg'}
                      alt="No Image Availabl"
                    />
                  </a>
                </div>
                <div>
                  <a href={movies.randomMovies[1].randomMovie._id}>
                    <img
                      className="imageStyle"
                      src={movies.randomMovies[1].randomMovie.poster ?? 'images/default_poster.jpg'}
                      alt="No Image Available"
                    />
                  </a>
                </div>
                <div>
                  <a href={movies.randomMovies[2].randomMovie._id}>
                    <img
                      className="imageStyle"
                      src={movies.randomMovies[2].randomMovie.poster ?? 'images/default_poster.jpg'}
                      alt="No Image Available"
                    />
                  </a>
                </div>
              </div>

              <div className="row">
                <div>
                  <a href={movies.randomMovies[3].randomMovie._id}>
                    <img
                      className="imageStyle"
                      src={movies.randomMovies[3].randomMovie.poster ?? 'images/default_poster.jpg'}
                      alt="No Image Available"
                    />
                  </a>
                </div>
                <div>
                  <a href={movies.randomMovies[4].randomMovie._id}>
                    <img
                      className="imageStyle"
                      src={movies.randomMovies[4].randomMovie.poster ?? 'images/default_poster.jpg'}
                      alt="No Image Available"
                    />
                  </a>
                </div>
                <a href={movies.randomMovies[5].randomMovie._id}>
                  <img
                    className="imageStyle"
                    src={movies.randomMovies[5].randomMovie.poster ?? 'images/default_poster.jpg'}
                    alt="No Image Available"
                  />
                </a>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
