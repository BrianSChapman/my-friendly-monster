const db = require('../config/connection');
const { User, Monster } = require('../models');

const monsterData = require('./monsterData.json');
const userData = require('./userData.json');

db.once('open', async () => {
  // clean database
  await Monster.deleteMany({});
  await User.deleteMany({});

  // bulk create each model
  const monsters = await Monster.insertMany(monsterData);
  const users = await User.insertMany(userData);
  monsters.save();
  users.save();

//   for (newClass of classes) {
//     // randomly add each class to a school
//     const tempMonster = 123;
//     tempMonster.userId.push(newClass._id);
//     await tempSchool.save();

//     // reference class on professor model, too
//     user.monsters.push(monster._id);
//     await tempProfessor.save();
//   }

  console.log('all done!');
  process.exit(0);
});
