class User {
  constructor(id, username, password, fullname) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.fullname = fullname;
  }
}
const listUser = [
  new User(1, 'admin', '111111', 'Administrator'),
  new User(2, 'guest', '111111', 'Guest'),
  new User(3, 'sale', '111111', 'Sale 01'),
  new User(4, 'user', '111111', 'User 01')
];

module.exports = { User, listUser }
