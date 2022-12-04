module.exports = {
    entry: ['./index.js'],
    output:{
        filename:'app.min.js'
    },
    mode:'development',
    module:{
        rules:[
            {
                test: /\.js$/,
                use: ['babel-loader']
            },
            {
                test: /\.(glb|gltf|vert|frag)/,
                use: ['glslify-import-loader','raw-loader','glslify-loader']
            },
            {
                test: /\.css/,
                use: ['style-loader','css-loader']
            }
        ]
    },
    devServer: {
        port: 3000
    }
};