import Scripts from './scripts'

/**
 *
 * @param {Array} scripts
 */
const prioritiseScripts = (scripts) => {
    const priorityScripts = scripts.reduce((acc, val) => {
        const priority = val.priority || 0
        if (!acc[priority]) {
            acc[priority] = []
        }

        acc[priority].push(val)

        return acc
    }, {})

    return Object.entries(priorityScripts)
        .map(([priority, scripts]) => ( { priority, scripts } ))
        .sort((a, b) => Number(a.priority) - Number(b.priority))
}

/**
 *
 * @param scripts
 * @returns {*}
 */
const buildPromises = scripts => {
    return scripts.map(({ module, element, params = [] }) => {
        return new Promise((resolve, reject) => {
            if (!element) {
                resolve()
                return
            }

            module().then(({ default: d }) => {
                d ? d(...params) : null
                resolve()
            }).catch((e) => {
                console.log(e);
                reject()
            })
        })
    })
}

const scriptsMerge = (baseScripts = [], additionalScripts = []) => {
    baseScripts.forEach((baseScript, index) => {
        if (additionalScripts.some(additionalScript => additionalScript.name === baseScript.name)) {
            baseScripts.splice(index, 1, {})
        }
    })

    return [...baseScripts, ...additionalScripts]
}


export default async ({
    scriptsObject = Scripts,
    additionalScripts = [],
    params = {}
}) => {
    try {
        for (const scripts of prioritiseScripts(scriptsMerge(scriptsObject(params), additionalScripts))) {
            await Promise.all(buildPromises(scripts.scripts))
        }
    } catch (err) {
        console.error(err)
    }
}
