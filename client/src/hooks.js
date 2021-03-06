import { useMutation } from "@apollo/client";
import { DELETE_SONG } from "./graphql/mutations";
import { FILTERED_SONGS, CLIENT_SIDE_FILTERED_SONGS } from "./graphql/queries";

function useDeleteSongItem(filter) {
  const [deleteSong] = useMutation(DELETE_SONG, {
    update(cache, { data: { deleteSong } }) {
      const { songs } = cache.readQuery({
        query: CLIENT_SIDE_FILTERED_SONGS,
        // variables: { filter: filter },
      });
      // console.log("testSongs: ", songs);
      let updatedSongList = songs.filter((elem) => {
        if (elem.id !== deleteSong.id) {
          return elem;
        }
      });
      console.log("updatedSongs: ", updatedSongList);
      cache.writeQuery({
        query: CLIENT_SIDE_FILTERED_SONGS,
        data: {
          songs: updatedSongList,
        },
        // variables: { filter: filter },
      });
    },
  });
  return { deleteSong };
}

export { useDeleteSongItem };
