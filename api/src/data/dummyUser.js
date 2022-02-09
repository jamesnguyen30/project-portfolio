const bcrypt = require('bcrypt')

const names = ['a', 'b', 'c', 'd', 'e', 'f']
const randomId = max => (Math.floor(Math.random() * max))

const generateUsers = async () => {
    const users = []
    const defaultPass = await bcrypt.hash('password', 10)
    names.forEach(item => users.push({
        id: randomId(1000000),
        email: `${item}@email.com`,
        password: defaultPass,
        createdDate: Date.now()
    }))
    return users
}


module.exports = generateUsers;

