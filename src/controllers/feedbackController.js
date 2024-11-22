//feedback-system\src\controllers\feedbackController.js

const Feedback = require('../models/Feedback');

exports.createFeedback = async (req, res) => {
  const { content } = req.body;
  const serviceId = req.params.id;

  try {
    const feedback = await Feedback.create({ content, serviceId });
    res.status(201).json(feedback);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar feedback', error });
  }
};

exports.getFeedbacks = async (req, res) => {
  const serviceId = req.params.id;

     try {
       const feedbacks = await Feedback.findAll({ where: { serviceId } });
       res.status(200).json(feedbacks);
     } catch (error) {
       res.status(500).json({ message: 'Erro ao listar feedbacks', error });
     }
};