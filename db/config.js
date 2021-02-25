const mongoose = require('mongoose');

const dbConection = async () => {
  try {
    await mongoose.connect(process.env.DB_CON, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('DB online');
  } catch (error) {
    console.log(error);
    throw new Error('Error a la hora de inicilizar bd');
  }
};

module.exports = {
  dbConection,
};
