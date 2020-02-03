const { Comment, Image } = require('../models');


async function commentsCounter() {
  return await Comment.countDocuments();
}



module.exports = async () => {

  const results = await Promise.all([
    commentsCounter()
  ]);

  return {
    comments: results[0]
  } 
};