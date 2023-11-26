const SITE_SECRET = 'goose'
const MASTER_PASSWORD = 'handsfreemasonry'

async function authenticateToken(req, res, next) {
  const token = req.cookies.authToken
  if (!token)
    return res.json({ auth: false })
  const username = await db.sub('tokens').get(token)
  if (!username)
    return res.json({ auth: false })
  const record = await db.sub('users').get(username)
  if (!record)
    return res.json({ auth: false })
    // return res.sendStatus(403) // Forbidden
  req.user = record

  // if (!token) {
  //   return res.sendStatus(401) // Unauthorized
  // }
  // jwt.verify(token, 'your-secret-key', (err, user) => {
  //   if (err) {
  //     return res.sendStatus(403) // Forbidden
  //   }
  //   req.user = user
  //   next()
  // })
  next()
}

// Site Authorization

router.post('/authorize', async (req, res) => {
  const { password } = req.body
  if (password !== MASTER_PASSWORD)
    return res.send(false)

  res.cookie('authorized', true, {
    httpOnly: true,
    secure: true,
    expires: new Date(Date.now() + (365 * 24 * 60 * 60 * 1000)), // Expires in 1 year
    sameSite: 'None', // Required if 'secure' is true and in cross-origin
  })

  res.send(true)
})

router.get('/site', async (req, res) => {
  const cookie = req.cookies.authorized
  if (_.isBool(cookie) && (cookie === 'true' || cookie === true))
    return res.send(true)
  res.send(false)
})

// User Authentication

router.get('/verify', authenticateToken, async (req, res) => {
  res.json({ auth: true, user: req.user.user })
})

function storePassword(password) {
  return Crypto.nacl.encrypt(Crypto.hash(password, 32, false), SITE_SECRET)
}

function verifyPassword(user, password) {
  return Crypto.verify(user.password, storePassword(password))
}

router.post('/register', async (req, res) => {
  const { username, password } = req.body
  const exists = await db.sub('usernames').get(username)
  if (exists)
    return res.json({ valid: false })
  const user = { username }
  const record = { id: _.uuid(), username, password: storePassword(password), user }
  await db.sub('users').put(record.id, record)
  await db.sub('usernames').put(record.username, record.id)
  const token = Crypto.random.hash()
  await db.sub('tokens').put(token, record.id)

  res.cookie('authToken', token, {
    httpOnly: true,
    secure: true,
    maxAge: 3600000, // expires in 1 hour
    sameSite: 'None', // Required if 'secure' is true and in cross-origin
  })

  res.json({ valid: true, user })
})

router.post('/login', async (req, res) => {
  const { username, password } = req.body
  const id = await db.sub('usernames').get(username)
  if (!id)
    return res.json({ valid: false })
  const record = await db.sub('users').get(id)
  if (!record)
    return res.json({ valid: false })
  if (!verifyPassword(record, password))
    return res.json({ valid: false })

  const token = Crypto.random.hash()
  await db.sub('tokens').put(token, id)

  res.cookie('authToken', token, {
    httpOnly: true,
    secure: true,
    maxAge: 3600000, // expires in 1 hour
    sameSite: 'None', // Required if 'secure' is true and in cross-origin
  })

  res.json({ valid: true, user: record.user })
})

router.post('/logout', authenticateToken, async (req, res) => {
  const token = req.cookies.authToken
  res.cookie('authToken', '', { 
    httpOnly: true,
    secure: true,
    expires: new Date(0), // A date in the past
    maxAge: 0, // Alternatively, set maxAge to 0
    sameSite: 'None' // Required if 'secure' is true and in cross-origin
  })
  await db.sub('tokens').del(token)

  res.json({ result: true })
})
