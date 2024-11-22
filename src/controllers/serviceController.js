//feedback-system\src\controllers\serviceController.js

const Service = require('../models/Service');

exports.createService = async (req, res) => {
  const { name, description } = req.body;

  try {
    const service = await Service.create({ name, description });
    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar serviço', error });
  }
};

exports.getServices = async (req, res) => {
  try {
    const services = await Service.findAll();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar serviços', error });
  }
};