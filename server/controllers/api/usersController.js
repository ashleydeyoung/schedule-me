const usersController = require('express').Router();

const db = require('../../models');
const { JWTVerifier } = require('../../lib/passport');
const jwt = require('jsonwebtoken');

usersController.post('/', (req, res) => {
  const { email, password, firstName, lastName, preferredName } = req.body;

  db.User.create({ email, password, firstName, lastName, preferredName })
    .then(user => res.json(user))
    .catch(err => res.json(err));
});

usersController.get('/me', JWTVerifier, (req, res) => {
  res.json(req.user);
});

usersController.post('/login', (req, res) => {
  const { email, password } = req.body;

  db.User.findOne({ where: { email }, include: [{ model:db.Role }] })
    .then(user => {
      if (!user || !user.comparePassword(password)) {
        return res.status(401).send("Unauthorized");
      }

      res.json({
        token: jwt.sign({ sub: user.id }, process.env.JWT_SECRET),
        user
      });
    });
});

usersController.put('/:id', JWTVerifier, async function (req, res) {
  const result = await db.User.findOne({ where: { id: req.params.id } })
  const result2 = await result.update({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    preferredName: req.body.preferredName,
  })

  req.login(result2, { session: false }, function (err) {
    if (err) throw err;
    res.json(result2)
  })
});

usersController.put('/:id/roles', async function (req, res) {
    const user = await db.User.findOne({ where: { id: req.params.id }, include: [{ model:db.Role }] })
    
    for (let i = 0; i < user.Roles.length; i++) {
      const role = user.Roles[i];
      await user.removeRole(role);
    }
    
    const roles = req.body.filter(role => role.value);

    for (let i = 0; i < roles.length; i++) {
      const id = roles[i].name[0];
      const role = await db.Role.findByPk(id);
      await user.addRole(role);
    }
    
    res.json(user);
});

usersController.get('/:id', async function (req, res){
  const User = await db.User.findByPk(req.params.id, {include: [{model: db.Role}]});
  res.json(User);
});

usersController.get('/', async function (req, res){
  const User = await db.User.findAll({include: [{model: db.Role}]});
  res.json(User);
});

module.exports = usersController;
