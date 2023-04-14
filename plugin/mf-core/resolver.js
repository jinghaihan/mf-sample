const { CachedInputFileSystem, ResolverFactory } = require('enhanced-resolve')
const fs = require('fs')

const moduleResolver = ResolverFactory.createResolver({
  fileSystem: new CachedInputFileSystem(fs, 4000),
  conditionNames: ['node'],
  extensions: ['.js', '.json', '.node'],
  useSyncFileSystemCalls: true,
  mainFields: ['esm', 'module', 'main']
})

module.exports = moduleResolver
