const mcf = require('../../mcf');
const config = require('../../config');

describe('real server', () => {
  const { get } = mcf(config.baseUrl, config.username, config.apiKey);

  describe('mcf', () => {
    it('connects to server', async () => {
      await expect(
        get('/versions').catch((error) => {
          if (!error.response) throw new Error(error);
        }),
      ).resolves.not.toThrowError();
    });

    it('authenticates', async () => {
      const versions = await get('/versions');
      expect(versions.data.data).toBeDefined();
    });
  });
});
