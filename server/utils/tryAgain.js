function main(func, times) {
  try {
    func();
  } catch (error) {
    console.log(error);
    setTimeout(() => main(), times);
  }
}

module.exports = main;
