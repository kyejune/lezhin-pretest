const path = require('path');

module.exports = {

    entry: "./src/app",

    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                include: path.join(__dirname, 'src'),
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['env', {module: false}]
                        ]
                    }
                }]
            },

            {
                test: /\.scss$/,
                include: path.join(__dirname, 'src'),
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                    },
                    {
                        loader: "sass-loader", // compiles Sass to CSS
                        options: {

                        }
                    }
                ]
            }
        ]
    }
}