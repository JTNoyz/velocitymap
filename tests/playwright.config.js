module.exports = {
  testDir: '.',
  testMatch: /.*\.spec\.js/,
  use: { browserName: 'chromium' },
  webServer: { command: 'npx --yes http-server@14.1.1 .. -p 4173 -s', port: 4173, reuseExistingServer: true }
};
