const findUser = (req, data) => {
  const { id } = req.params;

  return data.find(
    (item) => item.id.toString() === id
  );
}

module.exports = findUser;
