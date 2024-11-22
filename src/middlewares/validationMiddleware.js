//feedback-system\src\middlewares\validationMiddleware.js

exports.validateFeedback = (req, res, next) => {
    const { content } = req.body;
    if (!content || content.length < 10) {
      return res.status(400).json({ message: 'Feedback must have at least 10 characters.' });
    }
    next();
  };