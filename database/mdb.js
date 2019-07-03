module.exports = mPool => {
  return {
    getCounts(user, countsField){
      return mPool.collection('user')
        .findOne({userId: user.id})
        .then(userCounts => userCounts[countsField]);
    }
  };
};