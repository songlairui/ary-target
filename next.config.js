const withLess = require('@zeit/next-less')
const fetch = require('isomorphic-unfetch')
const lessToJs = require('less-vars-to-js')
const fs = require('fs')
const path = require('path')
const Dotenv = require('dotenv-webpack')

const ENV = process.env.ENV.trim()
const envFile = ENV ? `.env.${ENV}` : '.env'

const themeVariables = lessToJs(
    fs.readFileSync(path.resolve(__dirname, './assets/antd-custom.less'), 'utf8')
)

module.exports = withLess({
    lessLoaderOptions: {
        javascriptEnabled: true,
        modifyVars: themeVariables, // make your antd custom effective
    },
    webpack: (config, { isServer }) => {
        config.plugins = config.plugins || []
        config.plugins.push(new Dotenv({
            path: path.join(__dirname, envFile),
            systemvars: true
        }))
        if (isServer) {
            const antStyles = /antd\/.*?\/style.*?/
            const origExternals = [...config.externals]
            config.externals = [
                (context, request, callback) => {
                    if (request.match(antStyles)) {
                        return callback()
                    }
                    if (typeof origExternals[0] === 'function') {
                        origExternals[0](context, request, callback)
                    } else {
                        callback()
                    }
                },
                ...(typeof origExternals[0] === 'function' ? [] : origExternals),
            ]

            config.module.rules.unshift({
                test: antStyles,
                use: 'null-loader',
            })
        }
        return config
    },
    exportPathMap: async function () {
        const paths = {
            '/': { page: '/' },
            '/about': { page: '/about' }
        }
        const res = await fetch('https://api.tvmaze.com/search/shows?q=batman');
        const data = await res.json()
        const shows = data.map(entry => entry.show)
        shows.forEach(show => {
            paths[`/p/${show.id}`] = {
                page: '/p/[id]', query: { id: show.id }
            }
        })
        return paths
    }
})