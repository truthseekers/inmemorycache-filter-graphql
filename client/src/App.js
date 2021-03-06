import "./App.css";
import React, { useState, Fragment, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";

// const SONGS = gql`
//   query {
//     songs {
//       id
//       title
//     }
//   }
// `;

const SONGS = gql`
  query songs($filter: String) {
    songs(filter: $filter) {
      id
      title
    }
  }
`;

function App() {
  const [filter, setFilter] = useState("");
  const { data, loading, error } = useQuery(SONGS, {
    variables: { filter: filter },
  });

  // if (loading) {
  //   return <div>loading...</div>;
  // }
  // if (error) {
  //   return <div>error...</div>;
  // }
  // console.log("data: ", data);
  // data.songs.map((song) => {
  //   console.log("song title: ", song.title);
  // });

  return (
    <div className="App">
      <header className="App-header">
        <h3>Fav songs:</h3>
        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        {!data || loading ? (
          <div>loading...</div>
        ) : (
          <ul>
            {data.songs.map((song) => (
              <li key={song.id}>
                <h2>{song.title}</h2>
              </li>
            ))}
          </ul>
        )}
      </header>
    </div>
  );
}

export default App;
