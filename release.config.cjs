module.exports = {
  branches: [
    { name: 'main', channel: 'latest' },
    { name: '1.x-Maintenance', channel: 'latest-1', prerelease: false },
    { name: 'next', channel: 'next', prerelease: true },
    { name: 'dev', channel: 'dev', prerelease: true }
  ],
  repositoryUrl: 'https://github.com/ionic-team/capacitor-os-inappbrowser.git',
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/changelog',
    '@semantic-release/npm',
    [
      '@semantic-release/github',
      {
        successComment: false,
        failComment: false,
        releasedLabels: false,
        addReleases: 'bottom',
        releaseNotes: {
          changelogFile: 'CHANGELOG.md'
        }
      }
    ],
    [
      '@semantic-release/git',
      {
        assets: ['CHANGELOG.md', 'package.json'],
        message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}'
      }
    ]
  ]
};
