module.exports = {
    verbose: true,
    testRegex: '\\.(test)\\.(ts|tsx)$',
    moduleFileExtensions: ['ts', 'tsx', 'js'],
    transform: {
        '.(ts|tsx)': 'ts-jest'
    },
    setupFiles: ['./scripts/jest/test-setup.js']
};
