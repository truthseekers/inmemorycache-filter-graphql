import { useMutation, useQuery, gql } from "@apollo/client";
import { DELETE_SONG } from "./graphql/mutations";
import { FILTERED_SONGS } from "./graphql/queries";

function useDeleteSongItem(filter) {
  const [deleteSong] = useMutation(DELETE_SONG, {
    update(cache, { data: { deleteSong } }) {
      const { songs } = cache.readQuery({
        query: FILTERED_SONGS,
        variables: { filter: filter },
      });
      let updatedSongList = songs.filter((elem) => {
        if (elem.id !== deleteSong.id) {
          return elem;
        }
      });
      cache.writeQuery({
        query: FILTERED_SONGS,
        data: {
          songs: updatedSongList,
        },
        variables: { filter: filter },
      });
    },
  });
  return { deleteSong };
}

export { useDeleteSongItem };
