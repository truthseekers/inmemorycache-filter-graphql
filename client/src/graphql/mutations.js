import { gql } from "@apollo/client";

const DELETE_SONG = gql`
  mutation deleteSong($songId: ID!) {
    deleteSong(songId: $songId) {
      title
      id
    }
  }
`;

export { DELETE_SONG };
