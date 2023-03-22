const Todo = {
  find() {
    return new Promise((resolve, reject) => {
      resolve([{ name: "basanta" }]);
    });
  },
};


Todo.find().then((result) => {
    console.log(result)
})