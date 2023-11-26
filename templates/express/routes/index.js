router.get('/', async (req, res) => {
  res.send(`
    <body style="background:black">
      <div style="padding:5px">
        <h1 style="color:grey">It works!</h1>
      </div>
    </body>
  `)
})
router.get('/ping', async (req, res) => {
  res.status(200).send('pong')
})

router.get('/sock', async (req, res) => {
  res.status(200).send('pong')
})
