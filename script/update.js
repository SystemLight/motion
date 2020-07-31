const childProcess = require("child_process");
const process = require("process");
const Path = require("path");

const rootPath = process.cwd();
const project = require(Path.join(rootPath, "package.json"));

async function exec(command) {
    return new Promise(((resolve, reject) => {
        childProcess.exec(command, (error) => {
            if (error) {
                reject(error);
            }
            resolve();
        }).stdout.on("data", (data) => {
            console.log(data);
        }).on("end", () => {
            console.log("end");
        });
    }));
}

async function main() {
    // eslint-disable-next-line guard-for-in
    for (const i in project.devDependencies) {
        if (project.devDependencies.hasOwnProperty(i)) {
            const command = `npm install ${i}@latest --save-dev`;
            console.log(command);
            await exec(command);
        }
    }

    // eslint-disable-next-line guard-for-in
    for (const i in project.dependencies) {
        if (project.dependencies.hasOwnProperty(i)) {
            const command = `npm install ${i}@latest --save`;
            console.log(command);
            await exec(command);
        }
    }
}

main().then();
