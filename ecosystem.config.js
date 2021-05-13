module.exports = {
    /**
     * Application configuration section
     * http://pm2.keymetrics.io/docs/usage/application-declaration/
     */
    apps: [
        {
            name: "ssr_dev",
            script: "server/index.js",
            env: {
                STAGE_ENV: "dev",
            },
            cwd: ".",
            instances: 2,
            exec_mode: "cluster"
        },
        {
            name: "ssr_test",
            script: "server/index.js",
            env: {
                STAGE_ENV: "test",
            },
            cwd: ".",
            instances: 2,
            exec_mode: "cluster"
        },
        {
            name: "ssr_sim",
            script: "server/index.js",
            env: {
                STAGE_ENV: "sim",
            },
            cwd: ".",
            instances: "max",
            exec_mode: "cluster"
        },
        {
            name: "ssr_prod",
            script: "server/index.js",
            env: {
                STAGE_ENV: "prod",
            },
            cwd: ".",
            instances: "max",
            exec_mode: "cluster"
        }
    ]
}
