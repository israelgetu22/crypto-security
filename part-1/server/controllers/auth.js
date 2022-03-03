const bcryptjs = require("bcryptjs");

const users = [];

module.exports = {
  login: (req, res) => {
    console.log("Logging In User");
    console.log(req.body);
    const { username, password } = req.body;
    for (let i = 0; i < users.length; i++) {
      if (users[i].username === username) {
        const authenicated = bcryptjs.compareSync(
          password,
          users[i].hashedPassword
        );

        if (authenicated) {
          let savedUser = { ...users[i] };
          delete savedUser.hashedPassword;
          res.status(200).send(savedUser);
        }
        //res.status(200).send(users[i]);
      }
    }
    res.status(400).send("User not found.");
  },
  register: (req, res) => {
    const { username, email, firstName, lastName, password } = req.body;

    const salt = bcryptjs.genSaltSync(7);
    const hashedPassword = bcryptjs.hashSync(password, salt);

    let user = {
      username,
      email,
      firstName,
      lastName,
      hashedPassword,
    };

    users.push(user);
    let savedUser = { ...user };
    delete savedUser.hashedPassword;
    res.status(200).send(savedUser);

    // console.log("Registering User");
    // console.log(req.body);
    // users.push(req.body);
    // res.status(200).send(req.body);
  },
};
