const { findAllUsers, updateUser, findUserById, removeUser } = require('../model/User');

module.exports = {
  homePage: async (req, res) => {
    const users = await findAllUsers();
    res.render('list-user', {
      users,
      error_message: req.flash('error_message'),
      info_message: req.flash('info_message')
    });
  },
  deleteUser: async (req, res) => {
    const result = await removeUser(+req.params.id);
    if (!result) { // error
      req.flash('error_message', 'Delete error, plz try again!');
      res.redirect('/users');
    }
    else {
      req.flash('info_message', 'Delete successfully')
      res.redirect('/users');
    }
  },

  getViewUpdate: async (req, res) => {
    const user = await findUserById(+req.params.id);
    if (!user) return res.redirect('/users');
    res.render('update', { user });
  },
  postUpdate: async (req, res) => { // action cua form update
    const { idUser, username, fullname, password } = req.body;
    const result = await updateUser(idUser, fullname, username, password);
    if (!result) return res.redirect('/update/' + idUser); // update false
    res.redirect('/users'); // home
  },
  getUser: (req, res) => {
    // const id = +req.params.id;
    const user = listUser.find(user => user.id == +req.params.id);
    res.render('detail-user', { user });
  }
}