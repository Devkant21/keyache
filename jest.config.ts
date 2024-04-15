module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: {
        '^keyache$': '<rootDir>/dist/index.js',
        '^keyache/(.*)$': '<rootDir>/dist/$1',
    },
};
