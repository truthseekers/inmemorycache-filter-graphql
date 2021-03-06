import "./App.css";
import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { useDeleteSongItem } from "./hooks";
import { FILTERED_SONGS } from "./graphql/queries";

function SongRow(props) {
  const deleteSongRow = () => {
    props.deleteSong({
      variables: { songId: props.songId },
    });
  };

  return (
    <li key={props.songId}>
      {props.title} <span onClick={deleteSongRow}>delete</span>
    </li>
  );
}

function App() {
  const [filter, setFilter] = useState("");
  const { data, loading, error } = useQuery(FILTERED_SONGS, {
    variables: { filter: filter },
  });
  const { deleteSong } = useDeleteSongItem(filter);

  // const songList = data.songs;

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
              <SongRow
                deleteSong={deleteSong}
                key={song.id}
                songId={song.id}
                title={song.title}
              />
            ))}
          </ul>
        )}
      </header>
    </div>
  );
}

export default App;
