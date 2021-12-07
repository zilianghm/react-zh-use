/* ====================== 工具方法 ================================ */

/**
 * 扁平化数组转 tree
 * @param {Array} list    
 * @return {Array} 树形结构 tree   
 */
export const arrayToTree = (list = [], pid = 0) => {
    let result = []
    if (list && list.length) {
        list.forEach((item) => {
            if (item.pid === pid) {
                item.children = arrayToTree(list, item.id)
                result.push(item)
            }
        })
    }
    return result
}

/**
 * tree 转扁平化数组
 * @param {Array} tree
 * @return {Array} 数组的扁平化解构
 */
export const treeToArray = (tree = []) => {
    let result = []
    for (const item of tree) {
        // 解构 children 属性
        const {children, ...i} = item
        result.push(i)
        if (children && children.length) {
            result = result.concat(treeToArray(children))
        }
    }
    return result
}

/** 
 * 彻底扁平化
 * @param {*} x 什么类型参数都行
 * @return {*} 和入参数同样类型
 */
export const flatten = (x) => {
    // 基础类型、null 直接返回
    if (typeof x !== 'object' || x === null) return x
    // 特殊对象（函数/正则/日期），返回新实例的相同值
    if (x instanceof RegExp) return new RegExp(x)
    if (x instanceof Date) return new Date(x)
    if (typeof x === 'function') return eval(x.toString())
    // 普通对象/数组，创造一个对应实例
    let flattenX = new x.constructor()
    // x 是遍历目标，扁平化需要新的 key 值
    const deep = (x, newkey) => {
        for (let key in x) {
            // 过滤继承属性
            if (!x.hasOwnProperty(key)) break
            // 判断是否为数组
            let isArr = Array.isArray(x[key])
            // 拼接 key 名称，数组为中括号，对象为点号
            let curKey = newkey ? (isArr ? `${newkey}[${key}]` : `${newkey}.${key}`) : key
            if (typeof x[key] !== 'object' || x[key] === null) {
                // 基础类型、null
                flattenX[curKey] = x[key]
            } else {
                // 对象/数组类型，递归遍历
                deep(x[key], curKey)
            }
        }
    }
    deep(x, '')
    return flattenX
}

/**
 * 深拷贝
 * @param {*} x 什么类型都可以
 * @return {*} 和入参数同样类型
 */
export const deepClone = x => {
    // 基础类型、null 直接返回
    if (typeof x !== 'object' || x === null) return x
    // 特殊对象（函数/正则/日期），返回新实例的相同值
    if (x instanceof RegExp) return new RegExp(x)
    if (x instanceof Date) return new Date(x)
    if (typeof x === 'function') return eval(x.toString())

    // 普通对象/数组，创造一个对应实例
    let cloneX = new x.constructor()
    for (let key in x) {
        // 过滤继承属性
        if (!x.hasOwnProperty(key)) break
        // 递归
        cloneX[key] = deepClone(x[key])
    }
    return cloneX
}

/**
 * 深比较
 * @param {Object, Array} x
 * @param {Object, Array} y
 * @return {boolean}
 */
export const deepCompare = (x, y) => {
    const keysX = Object.keys(x)
    const keysY = Object.keys(y)
    if (keysX.length !== keysY.length) {
        return false
    } else {
        // 遍历
        for (let key in x) {
            if (!y.hasOwnProperty(key)) return false
            // 类型相同
            if (typeof x[key] === typeof y[key]) {
                if ((typeof x[key] === 'function' && typeof y[key] === 'function') ||
                    (x[key] instanceof Date && y[key] instanceof Date) ||
                    (x[key] instanceof RegExp && y[key] instanceof RegExp)) {
                    // 特殊对象
                    if (x[key].toString() !== y[key].toString()) return false
                } else if (x[key] === null || y[key] === null) {
                    // null 
                    if (x[key] !== y[key]) return false
                } else if (typeof x[key] === 'object' && typeof y[key] === 'object') {
                    // 引用类型，递归
                    const result = deepCompare(x[key], y[key])
                    if (!result) return false
                } else if (isNaN(x[key]) && isNaN(y[key])) {
                    // 都是 NaN 不比较
                    break
                } else if ((typeof x[key] !== 'object' && typeof y[key] !== 'object') && x[key] !== y[key]) {
                    // 基础类型值不相同
                    return false
                }
            } else {
                // 类型不相同
                return false
            }
        }
        return true
    }
}

/**
 * 深合并
 * @param {*} opt 什么参数都可以，通过 ... 扩展语法收集参数为数组
 * @return {object} result 
 */
export const deepAssign = (...opt) => {
    let result = {}
    opt.forEach(item => {
        for (let key in item) {
            if (item.hasOwnProperty(key)) {
                if (Object.prototype.toString.call(item) === '[object object]') {
                    result[key] = merger(item[key])
                } else {
                    result[key] = item[key]
                }
            }
        }
    })
    return result
}

/**
 * 函数防抖 debounce：delay 时间内只执行一次
 * @param {*}
 * @return {*}
 */
export const debounce = (fun, delay = 1000) => {
    let timeBar = null
    return (...arg) => {
        if (timeBar) {
            clearTimeout(timeBar)
        }
        timeBar = setTimeout(() => {
            fun.apply(this, arg)
        }, delay)
    }
}

/**
 * 函数节流 throttle：按 delay 时间来间隔执行
 * @param {*}
 * @return {*}
 */
export const throttle = (fun, delay = 500) => {
    let timerBar = null
    return (...arg) => {
        if (timerBar) return
        timerBar = setTimeout(() => {
            fun.apply(this, arg)
            timerBar = null
        }, delay)
    }
}