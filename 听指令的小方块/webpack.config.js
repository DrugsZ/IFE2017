/**
 * Created by DrugsZ on 2017/9/24.
 */
module.exports = {
    entry: __dirname + "/app/main.js",
    output: {
        // path: __dirname + "/public",
        path:"/", 
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.js|jsx$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                query: {presets: ['es2015']}
            }

        ]
    }
}