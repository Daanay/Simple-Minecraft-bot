const mineflayer = require('mineflayer')
const {pathfinder,Movements,goals}=require('mineflayer-pathfinder')
const GoalFollow =goals.GoalFollow
const {goals: { GoalNear } } = require('mineflayer-pathfinder')
const { Vec3 } = require('vec3')

const bot = mineflayer.createBot({
  host: 'localhost',
  port: 55654,
  username: 'MyBot',
  //password: '',
  //auth: 'mojang'
})

bot.on('spawn', () => {
  const mcData = require('minecraft-data')(bot.version) // You will know the version when the bot has spawned
  const totemId = mcData.itemsByName.totem_of_undying.id // Get the correct id
  if (mcData.itemsByName.totem_of_undying) {
    setInterval(() => {
      const totem = bot.inventory.findInventoryItem(totemId, null)
      if (totem) {
        bot.equip(totem, 'off-hand')
      }
    }, 50)
  }
})

function createBot () {
  const bot = mineflayer.createBot({
    host: 'localhost',
    port: 55654,
    username: 'MyBot',
    //password: '',
    //auth: 'mojang'
  })

bot.loadPlugin(pathfinder)

let target = null

bot.on('chat', (username, message) => {
  if (username === '__Danay__') // your username in minecraft
    target = bot.players[username].entity
    switch (message) {
    case 'take':
        const mcData = require('minecraft-data')(bot.version)
        const elytraId = mcData.itemsByName.elytra.id // Get the correct id
        if (mcData.itemsByName.elytra) {
                const elytra = bot.inventory.findInventoryItem(elytraId, null)
                if (elytra) {
                    bot.equip(elytra, "torso")
                }
            }
    
      break
      
    case 'rotate':
      var yy = 20
      var pp = -0.10
      setInterval(() => {
      bot.look(yaw = bot.entity.yaw - 0.1, pitch = pp)
    }, 100)
      break
    
    case 'use':
      const mcDataF = require('minecraft-data')(bot.version) // You will know the version when the bot has spawned
      const fireworkId = mcDataF.itemsByName.firework_rocket.id // Get the correct id
      if (mcDataF.itemsByName.firework_rocket) {
        setInterval(() => {
          const firework = bot.inventory.findInventoryItem(fireworkId, null)
          if (firework) {
            
            bot.equip(firework, 'hand')
          }

    }, 500)
  }
      
      break
    case 'use1':
      bot.placeEntity(bot.blockAt(bot.entity.position.offset(0, 0, 1)), new Vec3(0, 1, 0))
      break
    case 'look':
      setInterval(watchTarget, 50)
      break
    case 'rejoin':
      bot.quit()
      createBot()
      break
    case 'follow':
      followPlayer()
      break
    case 'left':
      bot.setControlState('left', true)
      break
    case 'right':
      bot.setControlState('right', true)
      break
    case 'quit':
      bot.quit()
      break
    case 'sprint':
      bot.setControlState('sprint', true)
      break
    case 'stop':
      bot.clearControlStates()
      break
    case 'jump':
      bot.setControlState('jump', true)
      bot.setControlState('jump', false)
      break
    case 'jump a lot':
      bot.setControlState('jump', true)
      break
    case 'stop jumping':
      bot.setControlState('jump', false)
      break
    case 'tp':
      bot.entity.position.y += 10
      break
    case 'pos':
      bot.chat(bot.entity.position.toString())
      break
    case 'yp':
      bot.chat(`Yaw ${bot.entity.yaw}, pitch: ${bot.entity.pitch}`)
      break
  }
})

function followPlayer(){
  const player1=bot.players['__Danay__']
  if(!player1|| !player1.entity){
      return
  }
  const mcData=require('minecraft-data')(bot.version)
  const movements=new Movements(bot,mcData)
  bot.pathfinder.setMovements(movements)
  const goal=new GoalFollow(player1.entity,2)
  bot.pathfinder.setGoal(goal,true)
}
function watchTarget () {
  if (!target) return
  bot.lookAt(target.position.offset(0, target.height, 0))
}
}

bot.loadPlugin(pathfinder)

let target = null

bot.on('chat', (username, message) => {
  if (username === '__Danay__') // your username in minecraft
    target = bot.players[username].entity
    switch (message) {
    case 'take':
        const mcData = require('minecraft-data')(bot.version)
        const elytraId = mcData.itemsByName.elytra.id // Get the correct id
        if (mcData.itemsByName.elytra) {
                const elytra = bot.inventory.findInventoryItem(elytraId, null)
                if (elytra) {
                    bot.equip(elytra, "torso")
                }
            }
    
      break
      
    case 'rotate':
      var yy = 20
      var pp = -0.10
      setInterval(() => {
      bot.look(yaw = bot.entity.yaw - 0.1, pitch = pp)
    }, 100)
      break
    
    case 'use':
      const mcDataF = require('minecraft-data')(bot.version) // You will know the version when the bot has spawned
      const fireworkId = mcDataF.itemsByName.firework_rocket.id // Get the correct id
      if (mcDataF.itemsByName.firework_rocket) {
        setInterval(() => {
          const firework = bot.inventory.findInventoryItem(fireworkId, null)
          if (firework) {
            
            bot.equip(firework, 'hand')
          }

    }, 500)
  }
      
      break
    case 'use1':
      bot.placeEntity(bot.blockAt(bot.entity.position.offset(0, 0, 1)), new Vec3(0, 1, 0))
      break
    case 'look':
      setInterval(watchTarget, 50)
      break
    case 'rejoin':
      bot.quit()
      createBot()
      break
    case 'follow':
      followPlayer()
      break
    case 'left':
      bot.setControlState('left', true)
      break
    case 'right':
      bot.setControlState('right', true)
      break
    case 'quit':
      bot.quit()
      break
    case 'sprint':
      bot.setControlState('sprint', true)
      break
    case 'stop':
      bot.clearControlStates()
      break
    case 'jump':
      bot.setControlState('jump', true)
      bot.setControlState('jump', false)
      break
    case 'jump a lot':
      bot.setControlState('jump', true)
      break
    case 'stop jumping':
      bot.setControlState('jump', false)
      break
    case 'tp':
      bot.entity.position.y += 10
      break
    case 'pos':
      bot.chat(bot.entity.position.toString())
      break
    case 'yp':
      bot.chat(`Yaw ${bot.entity.yaw}, pitch: ${bot.entity.pitch}`)
      break
  }
})

function followPlayer(){
  const player1=bot.players['__Danay__']
  if(!player1|| !player1.entity){
      return
  }
  const mcData=require('minecraft-data')(bot.version)
  const movements=new Movements(bot,mcData)
  bot.pathfinder.setMovements(movements)
  const goal=new GoalFollow(player1.entity,2)
  bot.pathfinder.setGoal(goal,true)
}

function watchTarget () {
  if (!target) return
  bot.lookAt(target.position.offset(0, target.height, 0))
}
