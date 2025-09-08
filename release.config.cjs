module.exports = {
  branches: [
    { name: 'main', channel: 'latest' },
    { name: 'next', channel: 'next', prerelease: true },
    { name: 'development', channel: 'dev', prerelease: true }
  ],
  repositoryUrl: 'https://github.com/ionic-team/capacitor-os-inappbrowser.git',
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/changelog'
  ]
};
