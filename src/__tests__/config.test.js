describe('Config', () => {
  test('NODE_ENV should be defined without errors', () => {
    const config = require('../config');
    expect(['production', 'development', 'test']).toContain(config.env);
  });
});
