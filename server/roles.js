const ROLES = {
  MERLIN: '梅林',
  ASSASSIN: '刺客',
  PERCIVAL: '派西维尔',
  MORGANA: '莫甘娜',
  MORDRED: '莫德雷德',
  OBERON: '奥伯伦',
  GOODGUY: '亚瑟忠臣',
  BADGUY: '爪牙'
}

const SIDE = {
  GOOD: 'GOOD',
  BAD: 'BAD',
}

const badPlayerMap = {
  5: 2,
  6: 2,
  7: 3,
  8: 3,
  9: 4,
  10: 4,
  11: 5,
  12: 5
}

function generateRoles({
  gameType
}) {
  const {
    playerNumber,
    hasMerlin, // 梅林
    hasAssassin, // 刺客
    hasPercival, // 派西维尔
    hasMorgana, // 莫甘娜
    hasMordred, // 莫德雷德
    hasOberon // 奥伯伦
  } = gameType

  const badNumber = badPlayerMap[playerNumber]
  let badUsers = Array1ToN(badNumber)

  const roles = new Array(playerNumber).fill(1).map((a, index) => {
    if (index >= badNumber) {
      return {
        name: ROLES.GOODGUY,
        message: '',
        side: SIDE.GOOD,
        otherUsers: []
      }
    } else {
      return {
        name: ROLES.BADGUY,
        message: '所有的反派角色是',
        side: SIDE.BAD,
        otherUsers: shuffle([...badUsers])
      }
    }
  })

  let badIndex = 0
  if (hasAssassin) {
    roles[badIndex].name = ROLES.ASSASSIN
    badIndex++
  }

  let morganaIndex = -1
  if (hasMorgana) {
    roles[badIndex].name = ROLES.MORGANA
    morganaIndex = badIndex
    badIndex++
  }

  let mordredIndex = -1
  if (hasMordred) {
    roles[badIndex].name = ROLES.MORDRED
    mordredIndex = badIndex

    badIndex++
  }

  if (hasOberon) {
    roles[badIndex].name = ROLES.OBERON

    const newBadUsers = [...badUsers]
    newBadUsers.splice(badIndex, 1)
    for (let i = 0; i < badNumber; i++) {
      roles[i].otherUsers = shuffle([...newBadUsers])
    }

    roles[badIndex].message = ''
    roles[badIndex].otherUsers = []

    badIndex++
  }

  let goodIndex = badNumber

  let merlinIndex = -1
  if (hasMerlin) {
    roles[goodIndex].name = ROLES.MERLIN
    roles[goodIndex].message = '所有的反派角色是'

    const badUsersForMerlin = [...badUsers]

    if (mordredIndex >= 0) {
      badUsersForMerlin.splice(mordredIndex, 1)
    }

    roles[goodIndex].otherUsers = shuffle([...badUsersForMerlin])

    merlinIndex = goodIndex

    goodIndex++
  }

  if (hasPercival) {
    roles[goodIndex].name = ROLES.PERCIVAL

    if (merlinIndex >= 0 && morganaIndex >= 0) {
      roles[goodIndex].message = '梅林在他们中之一'
      roles[goodIndex].otherUsers = shuffle([merlinIndex, morganaIndex])
    }

    goodIndex++
  }

  const shuffleChangeArray = getShuffleChangeArray(playerNumber)

  const shuffleRoles = new Array(playerNumber)

  for (let i = 0; i < playerNumber; i++) {
    shuffleRoles[shuffleChangeArray[i]] = {
      ...roles[i],
      otherUsers: roles[i].otherUsers.map(userIndex => shuffleChangeArray[userIndex])
    }
  }

  return shuffleRoles
}

function Array1ToN(n) {
  return new Array(n).fill(1).map((a, index) => index)
}

function shuffle(array) {
  const shuffleArray = [...array]
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffleArray[i], shuffleArray[j]] = [shuffleArray[j], shuffleArray[i]]
  }
  return shuffleArray
}

function getShuffleChangeArray(n) {
  const sortArray = Array1ToN(n)
  const shuffleArray = shuffle(sortArray)

  return shuffleArray
}

module.exports = {
  generateRoles,
  ROLES,
  SIDE
}
