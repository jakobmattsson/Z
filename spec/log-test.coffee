require('./support/node')
Q = require 'q'
jscov = require 'jscov'
{zeeCreator} = require jscov.cover('..', 'src', 'constructor')



describe 'put', ->
  
  beforeEach ->
    @out = []
    @Z = zeeCreator({ log: (args...) => @out.push(args) })

  it 'writes strings', ->
    obj = @Z("foo")
    obj.put().then =>
      @out.should.eql [["'foo'"]]

  it 'writes arrays', ->
    obj = @Z([1,2,3])
    obj.put().then =>
      @out.should.eql [["[ 1, 2, 3 ]"]]

  it 'writes arrays of objects', ->
    obj = @Z([{ a: 1 }, { b: 2 }])
    obj.put().then =>
      @out.should.eql [["[ { a: 1 }, { b: 2 } ]"]]

  it 'writes objects', ->
    obj = @Z({ a: 1 })
    obj.put().then =>
      @out.should.eql [["{ a: 1 }"]]

  it 'writes nested objects', ->
    obj = @Z({ a: { b: { c: 1 } } })
    obj.put().then =>
      @out.should.eql [["{ a: { b: { c: 1 } } }"]]



describe 'log', ->

  beforeEach ->
    @out = []
    @Z = zeeCreator({ log: (args...) => @out.push(args) })

  it 'writes strings', ->
    obj = @Z("foo")
    obj.log().then =>
      @out.should.eql [['foo']]

  it 'writes arrays', ->
    obj = @Z([1,2,3])
    obj.log().then =>
      @out.should.eql [[[ 1, 2, 3 ]]]

  it 'writes arrays of objects', ->
    obj = @Z([{ a: 1 }, { b: 2 }])
    obj.log().then =>
      @out.should.eql [[[ { a: 1 }, { b: 2 } ]]]

  it 'writes objects', ->
    obj = @Z({ a: 1 })
    obj.log().then =>
      @out.should.eql [[{ a: 1 }]]

  it 'writes nested objects', ->
    obj = @Z({ a: { b: { c: 1 } } })
    obj.log().then =>
      @out.should.eql [[{ a: { b: { c: 1 } } }]]

