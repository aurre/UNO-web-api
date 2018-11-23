'use strict'

const db = require('../server/db')
const {Player, Session, Game} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const players = await Promise.all([
    Player.create({name: 'Raysa'}),
    Player.create({name: 'Cristina'}),
    Player.create({name: 'Ariel'}),
    Player.create({name: 'Mauro'})
  ])

  const games = await Promise.all([
    Game.create({location: 'Cristina/s house'}),
    Game.create({location: 'Mauro/s house'})
  ])

  console.log(`seeded ${players.length} users`)
  console.log(`seeded ${games.length} games`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
