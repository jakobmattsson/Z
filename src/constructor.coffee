Q = require 'q'
_ = require 'underscore'
util = require 'util'

resolveCompletely = (unresolved) ->
  Q.when(unresolved).then (resolved) ->

    return resolved if !resolved? || typeof resolved in ['boolean', 'string', 'number', 'function']
    return Q.all(resolved.map(resolveCompletely)) if Array.isArray(resolved)

    unresolvedKeys = Q.all(_.keys(resolved))
    unresolvedValues = Q.all(_.values(resolved).map(resolveCompletely))

    Q.all([unresolvedKeys, unresolvedValues]).then ([resolvedKeys, resolvedValues]) ->
      _.object(_.zip(resolvedKeys, resolvedValues))




underscoreMethods = [
  # COLLECTIONS
  'each'
  'map'
  'reduce'
  'reduceRight'
  'find'
  'filter'
  'where'
  'findWhere'
  'reject'
  'every'
  'some'
  'contains'
  'invoke'
  'pluck'
  'max'
  'min'
  'sortBy'
  'groupBy'
  'indexBy'
  'countBy'
  'shuffle'
  'sample'
  'toArray'
  'size'

  # ARRAYS
  'first'
  'initial'
  'last'
  'rest'
  'compact'
  'flatten'
  'without'
  'union'
  'intersection'
  'difference'
  'uniq'
  'zip'
  'object'
  'indexOf'
  'lastIndexOf'
  'sortedIndex'
  'range'

  # FUNCTIONS -- not sure if these makes sense yet
  # 'bind'
  # 'bindAll'
  # 'partial'
  # 'memoize'
  # 'delay'
  # 'defer'
  # 'throttle'
  # 'debounce'
  # 'once'
  # 'after'
  # 'wrap'
  # 'compose'

  # OBJECTS
  'keys'
  'values'
  'pairs'
  'invert'
  'functions'
  'extend'
  'pick'
  'omit'
  'defaults'
  'clone'
  'tap'
  'has'
  'isEqual'
  'isEmpty'
  'isElement'
  'isArray'
  'isObject'
  'isArguments'
  'isFunction'
  'isString'
  'isNumber'
  'isFinite'
  'isBoolean'
  'isDate'
  'isRegExp'
  'isNaN'
  'isNull'
  'isUndefined'

  # UTILITY
  # 'noConflict' -- not applicable
  'identity'
  'times'
  'random'
  # 'mixin' -- I have no idea how this would affect things
  'uniqueId'
  'escape'
  'unescape'
  'result'
  'template'

  # CHAINING -- zee has its own chaining
  # 'chain'
  # 'value'
]

genericMethods = ['toString']
arrayMethods = ['reverse', 'concat', 'join', 'slice', 'findIndex']
stringMethods = ['split']
underscoreEachMethods = ['omit', 'pick', 'keys']


module.exports = Z = (obj) ->
  overrideLayer = Object.create(resolveCompletely(obj))
  p = Object.create(overrideLayer)

  def = (name, f) ->
    p[name] = (args...) ->
      Z p.then (resolved) ->
        f(resolved, args...)

  zeeify = (name) ->
    superMethod = p[name]
    overrideLayer[name] = (args...) ->
      Z superMethod.apply(this, args)

  underscoreMethods.forEach (methodName) ->
    def methodName, (resolved, args...) ->
      _(resolved)[methodName](args...)

  underscoreEachMethods.forEach (methodName) ->
    def (methodName + 'Each'), (resolved, args...) ->
      resolved.map (e) -> _(e)[methodName](args...)

  genericMethods.forEach (methodName) ->
    def methodName, (resolved, args...) ->
      resolved[methodName].apply(resolved, args)

  arrayMethods.forEach (methodName) ->
    def methodName, (resolved, args...) ->
      if !Array.isArray(resolved)
        throw new Error("Object must be an array in order to invoke '#{methodName}'")
      resolved[methodName].apply(resolved, args)

  stringMethods.forEach (methodName) ->
    def methodName, (resolved, args...) ->
      if typeof resolved != 'string'
        throw new Error("Object must be a string in order to invoke '#{methodName}'")
      resolved[methodName].apply(resolved, args)

  def 'log', (resolved, shallow) ->
    if shallow
      if Array.isArray(resolved)
        console.log(resolved...)
      else
        console.log(resolved)
    else
      console.log(util.inspect(resolved, { depth: null }))

  zeeify('get')

  p



Z.methods = -> _.flatten [
  underscoreMethods
  genericMethods
  arrayMethods
  stringMethods
  'log'
  underscoreEachMethods.map((x) -> x + 'Each')
]
