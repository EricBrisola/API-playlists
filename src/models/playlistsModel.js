let playlists = [
    {
        id: 1,
        name: "Classic Rock",
        tags: ["rock", "classic", "70s"],
        songs: [
            { id: 1, title: "Stairway to Heaven", year: 1971, artist: "Led Zeppelin", album: "Led Zeppelin IV" },
            { id: 2, title: "Bohemian Rhapsody", year: 1975, artist: "Queen", album: "A Night at the Opera" },
            { id: 3, title: "Hotel California", year: 1976, artist: "Eagles", album: "Hotel California" }
        ]
    },
    {
        id: 2,
        name: "Pop Hits",
        tags: ["pop", "2000s", "dance"],
        songs: [
            { id: 1, title: "Toxic", year: 2003, artist: "Britney Spears", album: "In the Zone" },
            { id: 2, title: "Hips Don't Lie", year: 2006, artist: "Shakira", album: "Oral Fixation, Vol. 2" },
            { id: 3, title: "Just Dance", year: 2008, artist: "Lady Gaga", album: "The Fame" }
        ]
    },
    {
        id: 3,
        name: "Old School Hip-Hop",
        tags: ["hip-hop", "90s", "rap"],
        songs: [
            { id: 1, title: "Juicy", year: 1994, artist: "The Notorious B.I.G.", album: "Ready to Die" },
            { id: 2, title: "California Love", year: 1996, artist: "2Pac", album: "All Eyez on Me" },
            { id: 3, title: "Lose Yourself", year: 2002, artist: "Eminem", album: "8 Mile Soundtrack" }
        ]
    }
];

const playlistModel = {

    getAllPlaylists: () => {
        if (playlists.length < 1) {
            throw new Error("No playlists found");

        }
        return playlists
    },

    getPlaylistByid: (id) => {
        const playlist = playlists.find(playlist => playlist.id === id)

        if (!playlist) {
            throw new Error("Cannot found playlist");
        }

        return playlist
    },

    createNewPlaylist: (name, songs = [], tags = []) => {

        if (!name) {
            throw new Error("A name for a new playlist is mandatory")
        }

        const playlistSongs = []

        if (tags.length < 1) {
            throw new Error("tags are empty");
        }

        if (songs.length >= 1) {
            songs.forEach(song => {

                const newSong = {
                    id: Math.floor(Math.random() * 99999),
                    name: song.name,
                    year: song.year,
                    artist: song.artist,
                    album: song.album
                }

                playlistSongs.push(newSong)
            })
        }

        const newPlaylist = {
            id: Math.floor(Math.random() * 99999),
            name: name,
            tags: tags,
            songs: playlistSongs
        }

        playlists.push(newPlaylist)

    },

    addNewSong: (playlistId, name, year, artist, album) => {

        const chosenPlaylistIndex = playlists.findIndex(playlist => playlist.id === playlistId)

        if (chosenPlaylistIndex === -1) {
            throw new Error("Playlist not found")
        }

        if (!name || !year || !artist || !album) {
            throw new Error("Missing data to add the song to a playlist")
        }

        const isSongduplicated = playlists[chosenPlaylistIndex].songs.findIndex(song => song.name === name)

        if (isSongduplicated === -1) {
            throw new Error("This song was added in this playlist already");
        }

        const newSong = {
            id: Math.floor(Math.random() * 99999),
            name: name,
            year: year,
            artist: artist,
            album: album
        }

        playlists[chosenPlaylistIndex].songs.push(newSong)
    },

    changePlaylistName: (playlistId, newName) => {

        const playlistIndex = playlists.findIndex(playlist => playlist.id === playlistId)

        if (playlistIndex === -1) {
            throw new Error("Playlist not found")
        }

        if (newName.length < 1 || typeof newName !== 'string') {
            throw new Error("New name format is invalid")
        }

        playlists[playlistIndex].name = newName
    },

    changePlaylistTags: (playlistId, tags) => {
        const playlistIndex = playlists.findIndex(playlist => playlist.id === playlistId)

        if (playlistIndex === -1) {
            throw new Error("Playlist not found")
        }

        if (tags.length < 1) {
            throw new Error("tags are empty")
        }

        playlists[playlistIndex].tags = tags
    },

    deletePlaylistById: (id) => {
        const playlistIndex = playlists.findIndex(playlist => playlist.id === id)

        if (playlistIndex === -1) {
            throw new Error("Playlist not found")
        }
        playlists = playlists.filter(playlist => playlist.id !== id)
    },

    deleteSongById: (playlistId, songId) => {
        const playlistIndex = playlists.findIndex(playlist => playlist.id === playlistId)

        if (playlistIndex === -1) {
            throw new Error("Playlist not found")
        }

        const songs = playlists[playlistIndex].songs.filter(song => song.id !== songId)

        playlists[playlistIndex].songs = songs

    },


}

module.exports = playlistModel
