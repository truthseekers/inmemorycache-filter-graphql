import "./App.css";
import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { useDeleteSongItem } from "./hooks";
import {
  CLIENT_SIDE_FILTERED_SONGS,
  FILTERED_SONGS,
  SONGS,
} from "./graphql/queries";
import { filter } from "./index";

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
  const [filterInput, setFilterInput] = useState("");
  const { data, loading, error } = useQuery(CLIENT_SIDE_FILTERED_SONGS);

  const { deleteSong } = useDeleteSongItem(filter);

  const handleFilterInput = (newInput) => {
    setFilterInput(newInput);
    filter(newInput);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h3>Fav songs:</h3>
        <input
          type="text"
          value={filterInput}
          onChange={(e) => handleFilterInput(e.target.value)}
        />
        {!data || loading ? (
          <div>loading...</div>
        ) : (
          <ul>
            {data.filteredSongs.map((song) => (
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
