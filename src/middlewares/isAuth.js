module.exports = (req, res, next) => {
  const data = true
  // IN THIS PART THE JWT WILL BE
  // Just change the boolean to get into de page
  if (data === true) {
    console.log('ENTRA BIEN')

    next()
  } else {
    console.log('REDIRECCIONA')
    res.redirect('/Login')
  }
}
