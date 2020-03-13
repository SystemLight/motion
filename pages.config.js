let splitChunks = {
    // chunks : all, async, and initial
    chunks: 'async',
    minSize: 30000,
    maxSize: 0,
    minChunks: 1,
    maxAsyncRequests: 6,
    maxInitialRequests: 4,
    automaticNameDelimiter: '~',
    automaticNameMaxLength: 30,
    cacheGroups: {
        vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10
        },
        default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
        }
    }
};

module.exports = {
    splitChunks,
    pages: [
        {
            pageName: "index",
            type: "ts",
            template: "./draft/motion.html"
        }
    ]
};