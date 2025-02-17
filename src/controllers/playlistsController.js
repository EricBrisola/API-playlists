const playlistModel = require('../models/playlistsModel')

const playlistController = {
    index: (req, res) => {

        try {
            const playlists = playlistModel.getAllPlaylists()
            res.status(200).json(playlists)
        } catch (error) {
            res.status(404).json({ message: error.message })
        }

    },

    show: (req, res) => {
        const { id } = req.params

        try {
            const playlist = playlistModel.getPlaylistByid(+id)
            res.status(200).json(playlist)
        } catch (error) {
            res.status(404).json({ message: `Invalid playlist id: ${id}` })
        }
    },

    store: (req, res) => {
        const { name, songs, tags } = req.body

        try {
            playlistModel.createNewPlaylist(name, songs, tags)
            res.status(201).json({ message: 'added with success', Playlist: { name, songs, tags } })
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    },

    storeSong: (req, res) => {
        const { id } = req.params
        const { name, year, artist, album } = req.body

        try {
            playlistModel.addNewSong(+id, name, year, artist, album)
            res.status(201).json({ message: 'added with success', song: { name, year, artist, album } })
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    },

    updateName: (req, res) => {
        const { id } = req.params
        const { name } = req.body

        try {
            playlistModel.changePlaylistName(+id, name)
            res.status(201).json({ message: 'updated with success', name: { name } })
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    },

    updateTags: (req, res) => {
        const { id } = req.params
        const { tags } = req.body

        try {
            playlistModel.changePlaylistTags(+id, tags)
            res.status(201).json({ message: 'updated with success', tags: { tags } })
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    },

    destroy: (req, res) => {
        const { id } = req.params

        try {
            playlistModel.deletePlaylistById(+id)
            res.status(204).end()
        } catch (error) {
            res.status(404).json({ message: error.message })
        }

    },

    destroySong: (req, res) => {
        const { id, songId } = req.params

        try {
            playlistModel.deleteSongById(+id, +songId)
            res.status(204).end()
        } catch (error) {
            res.status(404).json({ message: error.message })
        }

    }
}

module.exports = playlistController