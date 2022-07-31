const info = (...params) => {
  if(process.env.NODE_ENV !== ''){
    console.log(...params)
  }
}

const error = (...params) => {
  if(process.env.NODE_ENV !== ''){
    console.error(...params)
  }
}

module.exports = {
  info, error
}