import { gql } from "@apollo/client";

const SONGS = gql`
  query {
    songs {
      id
      title
    }
  }
`;

const CLIENT_SIDE_FILTERED_SONGS = gql`
  query Songs {
    filteredSongs @client {
      id
      title
    }

    songs {
      id
      title
    }
  }
`;

const FILTERED_SONGS = gql`
  query songs($filter: String) {
    songs(filter: $filter) {
      id
      title
    }
  }
`;

export { CLIENT_SIDE_FILTERED_SONGS, FILTERED_SONGS, SONGS };
