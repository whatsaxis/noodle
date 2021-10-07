import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  preset: 'ts-jest/presets/js-with-babel',
  testEnvironment: 'jsdom',
  extensionsToTreatAsEsm: ['.ts'],
  setupFilesAfterEnv: ['./tests/setup.js'],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "../mocks/fileMock.js",
    "\\.(css|less)$": "../mocks\\styleMock.js"
  },
  verbose: true
}

export default config