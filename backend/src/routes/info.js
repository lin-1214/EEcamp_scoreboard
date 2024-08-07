import Info from "../models/info";

exports.initData = async (req, res) => {
  
  await Info.deleteMany({});
  for (let i = 1; i <= 10; i++) {
    const newInfo = new Info({
      team: i.toString(),
      money: 70,
    });
    await newInfo.save();
  }

  console.log("init data success");
  res.send({ msg: "success" });
};

// exports.getAllTeams = async (req, res) => {
//   const teams = await Info.collection.find({}).toArray();
//   console.log("get all teams success");
//   res.send({ msg: "success", teams: teams });
// };


exports.updateMoney = async (req, res) => {
  const team = req.body.team;
  const money = req.body.money;
  // console.log(team, money);
  const target = await Info.collection.findOne({team: team.toString()});


  if (target.money + money < 0) {
    res.send({ msg: "fail" });
    return;
  }

  await Info.findOneAndUpdate(
    { team: team },
    { money: target.money + money}
  );
  console.log("update money success");
  res.send({ msg: "success", money: target.money + money});
};

exports.getTeam = async (req, res) => {
  const team = req.query.team;
  const target = await Info.collection.findOne({ team: team });

  if (!target) res.send({ msg: "no user", money: 0 });
  else {
    console.log("get team success");
    res.send({
      msg: "success",
      money: target.money,
    });
  }
};
