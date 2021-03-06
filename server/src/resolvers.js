const { createSongId } = require("./utils");

const newSongId = createSongId(); // only temporary.

const { songs } = require("./data/songs");

const resolvers = {
  Query: {
    songs: (parent, args, context, info) => {
      if (args.filter) {
        const filteredSongs = songs.filter((song) => {
          return song.title.toLowerCase().includes(args.filter.toLowerCase());
        });
        return filteredSongs;
      }
      return songs;
    },
  },
  Mutation: {
    createSong: (parent, args, context, info) => {
      const newSong = {
        id: newSongId(),
        title: args.title,
        userId: args.userId,
      };

      songs.push(newSong);
      return newSong;
    },
    deleteSong: (parent, args, context, info) => {
      let song;
      const songToRemove = songs.findIndex((elem) => {
        if (elem.id == args.songId) {
          song = elem;
          return true;
        }
        return false;
      });
      song ? songs.splice(songToRemove, 1) : "";
      return song;
    },
  },
};

module.exports = {
  resolvers,
};
