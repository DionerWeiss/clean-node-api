export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb+srv://clean:c@cluster0.rz8xe.mongodb.net/clean-node-api?retryWrites=true&w=majority',
  // mongoUrl: process.env.MONGO_URL || 'mongodb://mongo:27017/clean-node-api',
  port: process.env.PORT || 5050,
  jwtSecret: process.env.JWT_SECRET || '12-dsÇ'
}
