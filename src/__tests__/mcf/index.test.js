const MCF = require('../../mcf');
const config = require('../../config');

describe('mcf', () => {
  const mcf = new MCF(config.baseUrl, config.username, config.apiKey);

  describe('e2e', () => {
    it('connects to server', async () => {
      await expect(
        mcf.get('/versions').catch((error) => {
          if (!error.response) throw new Error(error);
        }),
      ).resolves.not.toThrowError();
    });

    it('authenticates', async () => {
      const versions = await mcf.get('/versions');
      expect(versions.status).toBe(200);
      expect(versions.data.data).toBeDefined();
    });
  });
});
