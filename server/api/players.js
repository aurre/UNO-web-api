const router = require('express').Router()
const {Player} = require('../db/models')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const players = await Player.findAll({
      attributes: ['id', 'name']
    })
    res.json(players)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const player = req.body
    const newPlayer = await Player.create(player)
    res.json(newPlayer)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    Player.destroy({
      where: {
         id: req.params.id
      }
    })
    res.sendStatus(204);
  } catch (err) {
    next(err)
  }
})
