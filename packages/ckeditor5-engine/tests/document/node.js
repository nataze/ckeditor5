/**
 * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* bender-tags: document */

'use strict';

var modules = bender.amd.require(
	'document/element',
	'document/character',
	'document/attribute',
	'document/nodelist' );

describe( 'tree', function() {
	var Element, Character;

	var root;
	var one, two, three;
	var charB, charA, charR, img;

	before( function() {
		Element = modules[ 'document/element' ];
		Character = modules[ 'document/character' ];

		charB = new Character( 'b' );
		charA = new Character( 'a' );
		img = new Element( 'img' );
		charR = new Character( 'r' );

		one = new Element( 'one' );
		two = new Element( 'two', null, [ charB, charA, img, charR ] );
		three = new Element( 'three' );

		root = new Element( null, null, [ one, two, three ] );
	} );

	it( 'should have proper positionInParent', function() {
		expect( root ).to.have.property( 'positionInParent' ).that.is.null;

		expect( one ).to.have.property( 'positionInParent' ).that.equals( 0 );
		expect( two ).to.have.property( 'positionInParent' ).that.equals( 1 );
		expect( three ).to.have.property( 'positionInParent' ).that.equals( 2 );

		expect( charB ).to.have.property( 'positionInParent' ).that.equals( 0 );
		expect( charA ).to.have.property( 'positionInParent' ).that.equals( 1 );
		expect( img ).to.have.property( 'positionInParent' ).that.equals( 2 );
		expect( charR ).to.have.property( 'positionInParent' ).that.equals( 3 );
	} );

	it( 'should have proper depth', function() {
		expect( root ).to.have.property( 'depth' ).that.equals( 0 );

		expect( one ).to.have.property( 'depth' ).that.equals( 1 );
		expect( two ).to.have.property( 'depth' ).that.equals( 1 );
		expect( three ).to.have.property( 'depth' ).that.equals( 1 );

		expect( charB ).to.have.property( 'depth' ).that.equals( 2 );
		expect( charA ).to.have.property( 'depth' ).that.equals( 2 );
		expect( img ).to.have.property( 'depth' ).that.equals( 2 );
		expect( charR ).to.have.property( 'depth' ).that.equals( 2 );
	} );

	it( 'should have proper root', function() {
		expect( root ).to.have.property( 'root' ).that.equals( root );

		expect( one ).to.have.property( 'root' ).that.equals( root );
		expect( two ).to.have.property( 'root' ).that.equals( root );
		expect( three ).to.have.property( 'root' ).that.equals( root );

		expect( charB ).to.have.property( 'root' ).that.equals( root );
		expect( charA ).to.have.property( 'root' ).that.equals( root );
		expect( img ).to.have.property( 'root' ).that.equals( root );
		expect( charR ).to.have.property( 'root' ).that.equals( root );
	} );

	it( 'should have proper nextSibling', function() {
		expect( root ).to.have.property( 'nextSibling' ).that.is.null;

		expect( one ).to.have.property( 'nextSibling' ).that.equals( two );
		expect( two ).to.have.property( 'nextSibling' ).that.equals( three );
		expect( three ).to.have.property( 'nextSibling' ).that.is.null;

		expect( charB ).to.have.property( 'nextSibling' ).that.equals( charA );
		expect( charA ).to.have.property( 'nextSibling' ).that.equals( img );
		expect( img ).to.have.property( 'nextSibling' ).that.equals( charR );
		expect( charR ).to.have.property( 'nextSibling' ).that.is.null;
	} );

	it( 'should have proper previousSibling', function() {
		expect( root ).to.have.property( 'previousSibling' ).that.is.expect;

		expect( one ).to.have.property( 'previousSibling' ).that.is.null;
		expect( two ).to.have.property( 'previousSibling' ).that.equals( one );
		expect( three ).to.have.property( 'previousSibling' ).that.equals( two );

		expect( charB ).to.have.property( 'previousSibling' ).that.is.null;
		expect( charA ).to.have.property( 'previousSibling' ).that.equals( charB );
		expect( img ).to.have.property( 'previousSibling' ).that.equals( charA );
		expect( charR ).to.have.property( 'previousSibling' ).that.equals( img );
	} );
} );

describe( 'getAttr', function() {
	it( 'should be possible to get attribute by key', function() {
		var Element = modules[ 'document/element' ];
		var Attribute = modules[ 'document/attribute' ];

		var fooAttr = new Attribute( 'foo', true );
		var element = new Element( 'foo', [ fooAttr ] );

		expect( element.getAttr( 'foo' ) ).to.equals( fooAttr.value );
	} );

	it( 'should return null if attribute was not found by key', function() {
		var Element = modules[ 'document/element' ];
		var Attribute = modules[ 'document/attribute' ];

		var fooAttr = new Attribute( 'foo', true );
		var element = new Element( 'foo', [ fooAttr ] );

		expect( element.getAttr( 'bar' ) ).to.be.null;
	} );
} );

describe( 'hasAttr', function() {
	it( 'should check attribute by key', function() {
		var Element = modules[ 'document/element' ];
		var Attribute = modules[ 'document/attribute' ];

		var fooAttr = new Attribute( 'foo', true );
		var element = new Element( 'foo', [ fooAttr ] );

		expect( element.hasAttr( 'foo' ) ).to.be.true;
	} );

	it( 'should return false if attribute was not found by key', function() {
		var Element = modules[ 'document/element' ];
		var Attribute = modules[ 'document/attribute' ];

		var fooAttr = new Attribute( 'foo', true );
		var element = new Element( 'foo', [ fooAttr ] );

		expect( element.hasAttr( 'bar' ) ).to.be.false;
	} );

	it( 'should check attribute by object', function() {
		var Element = modules[ 'document/element' ];
		var Attribute = modules[ 'document/attribute' ];

		var fooAttr = new Attribute( 'foo', true );
		var foo2Attr = new Attribute( 'foo', true );
		var element = new Element( 'foo', [ fooAttr ] );

		expect( element.hasAttr( foo2Attr ) ).to.be.true;
	} );

	it( 'should return false if attribute was not found by object', function() {
		var Element = modules[ 'document/element' ];
		var Attribute = modules[ 'document/attribute' ];

		var fooAttr = new Attribute( 'foo', true );
		var element = new Element( 'foo' );

		expect( element.hasAttr( fooAttr ) ).to.be.false;
	} );

	it( 'should create proper JSON string using toJSON method', function() {
		var Element = modules[ 'document/element' ];
		var Character = modules[ 'document/character' ];
		var NodeList = modules[ 'document/nodelist' ];

		var b = new Character( 'b' );
		var foo = new Element( 'foo', [], [ b ] );

		var parsedFoo = JSON.parse( JSON.stringify( foo ) );
		var parsedBar = JSON.parse( JSON.stringify( b ) );

		parsedFoo._children = new NodeList( parsedFoo._children );

		expect( parsedFoo ).to.be.deep.equals( {
			name: 'foo',
			parent: null,
			_attrs: [],
			_children: new NodeList( parsedFoo._children )
		} );

		expect( parsedBar ).to.be.deep.equals( {
			character: 'b',
			parent: 'foo',
			_attrs: []
		} );
	} );
} );