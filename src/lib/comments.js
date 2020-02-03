const { Comment, Post } = require('../models');

module.exports = {
  async newest () {

    const comments = await Comment.find()
      .limit(5)
      .sort({timestamp: -1});

    for(const comment of comments) {
      const image = await Post.findOne({_id: comment.post_id});
      comment.image = image;
    }

    return comments;
  }
};