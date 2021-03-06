tools = require './tools'
{Promise} = require 'es6-promise'
{pairs, keys, values, object, resolveAll, isPrimitive, isArray, objectCreate, proc} = tools

resolveCompletely = (unresolved, depth) ->
  resolveAll([unresolved]).then ([resolved]) ->

    return resolved if depth <= 0 || !resolved? || isPrimitive(resolved)
    return resolveAll(resolved.map((x) -> resolveCompletely(x, depth-1) )) if isArray(resolved)

    unresolvedValues = resolveAll(values(resolved).map((x) -> resolveCompletely(x, depth-1)))

    unresolvedValues.then (resolvedValues) ->
      object(keys(resolved), resolvedValues)



init = (defaultConf) ->

  mixedIn = {}
  mixinObj = {}
  depth = if defaultConf?.depth? then defaultConf?.depth else 1000000

  updateMixinObj = ->
    pairs(mixedIn).forEach ([name, func]) ->
      mixinObj[name] = (args...) ->
        @then (resolved) ->
          resolveCompletely(args, depth).then (args) ->
            func.apply({ value: resolved }, args)

  Z = (obj) ->
    resolvedObject = resolveCompletely(obj, depth)
    overrideLayer = objectCreate(resolvedObject)
    resultingPromise = objectCreate(overrideLayer)

    overrideLayer.then = (args...) ->
      Z resolvedObject.then.apply(resolvedObject, args)

    for key, value of mixinObj
      resultingPromise[key] = value

    resultingPromise

  Z.mixin = proc (hash) ->
    pairs(hash).forEach ([name, func]) ->
      oldOne = mixedIn[name]
      mixedIn[name] = ->
        context = { value: @value }
        context.base = oldOne if oldOne
        func.apply(context, arguments)
    updateMixinObj()

  Z.mixinAsync = proc (hash) ->
    pairs(hash).forEach ([name, func]) ->
      oldOne = mixedIn[name]
      mixedIn[name] = (args...) ->
        new Promise (resolve, reject) =>
          context = { value: @value }
          context.base = oldOne if oldOne
          context.done = (err, value) ->
            return reject(err) if err
            resolve(value)

          try
            func.apply(context, args)
          catch e
            reject(e)
    updateMixinObj()

  Z.bindSync = (func, context) ->
    (unresolvedArgs...) ->
      Z(unresolvedArgs).then (args) =>
        func.apply(context ? this, args)

  Z.bindAsync = (func, context) ->

    (unresolvedArgs...) ->
      ctx = context ? this

      Z(unresolvedArgs).then (args) ->
        new Promise (resolve, reject) ->

          args.push (err, result...) ->
            if err?
              reject(err)
            else if result.length == 1
              resolve(result[0])
            else
              resolve(result)

          try
            func.apply(ctx, args)
          catch ex
            reject(ex)

  Z



makeZ = ->
  Z = init()
  Z.init = init
  Z



if typeof window != 'undefined' && typeof window.require == 'undefined'
  window.Z = makeZ()

if typeof module != 'undefined'
  module.exports = makeZ()
