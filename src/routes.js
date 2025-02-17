const express = require('express')
const playlistController = require('./controllers/playlistsController')


const router = express.Router()

// GET /

router.get('/', (req, res) => {
    res.json({ message: 'API playlists' })
})

// GET /playlists

router.get('/playlists', playlistController.index)

// GET /playlists/:id

router.get('/playlists/:id', playlistController.show)

// POST /playlists/store

router.post('/playlists/store', playlistController.store)

// POST /playlists/:id/store

router.post('/playlists/:id/store', playlistController.storeSong)

// PUT /playlists/:id/update-name

router.put('/playlists/:id/update-name', playlistController.updateName)

// PUT /playlists/:id/update-tags

router.put('/playlists/:id/update-tags', playlistController.updateTags)

// DELETE /playlists/:id

router.delete('/playlists/:id', playlistController.destroy)

// DELETE /playlists/:id/songs/:id

router.delete('/playlists/:id/songs/:songId', playlistController.destroySong)

module.exports = router

