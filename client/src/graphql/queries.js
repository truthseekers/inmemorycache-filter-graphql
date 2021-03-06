import { gql } from "@apollo/client";

const SONGS = gql`
  query {
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

export { FILTERED_SONGS, SONGS };
