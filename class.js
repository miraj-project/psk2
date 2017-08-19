// original es 6:

class Hello {
    constructor(name) {
	this.name = name;
    }
    hello() {
	return "Hello " + this.name + "!";
    }
}

class HelloWorld extends Hello {
    constructor() {
	super("World");
    }

    echo() {
	alert(super.hello());
    }
}

var hw = new HelloWorld();
hw.echo();

// es 5:

"usestrict";

var _get = function get(object, property, receiver) {
    if (object === null) object = Function.prototype;
    var desc = Object.getOwnPropertyDescriptor(object, property);
    if (desc === undefined) {
	var parent = Object.getPrototypeOf(object);
	if (parent === null) {
	    return undefined;
	} else {
	    return get(parent, property,receiver);
	}
    } else if ("value" in desc) {
	return desc.value;
    } else {
	var getter = desc.get;
	if (getter === undefined) {
	    return undefined;
	}
	return getter.call(receiver);
    }
};


var _createClass = function() {
    function defineProperties(target,props) {
	for(vari=0;i< props.length; i++) {
	    var descriptor = props[i];
	    descriptor.enumerable = descriptor.enumerable || false;
	    descriptor.configurable = true;
	    if ("value" in descriptor) descriptor.writable = true;
	    Object.defineProperty(target, descriptor.key, descriptor);
	}
    }
    return function (Constructor, protoProps, staticProps) {
	if (protoProps) defineProperties(Constructor.prototype, protoProps);
	if (staticProps) defineProperties(Constructor, staticProps);
	return Constructor;
    };
}();

function _possibleConstructorReturn(self,call) {
    if (!self) { thrownewReferenceError("this hasn't been initialised - super() hasn't been called"); }
    return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
	throw new TypeError("Super expression must either be null or a function, not "
			    + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
	constructor: {
	    value: subClass, enumerable: false, writable: true, configurable: true
	}
    });

    if (superClass)
	Object.setPrototypeOf
	? Object.setPrototypeOf(subClass, superClass)
	: subClass.__proto__ = superClass;
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
	throw new TypeError("Cannot call a class as a function");
    }
}

var Hello = function() {
    function Hello(name) {
	_classCallCheck(this, Hello);
	this.name = name;
    }

    _createClass(Hello, [{
	key: "hello",
	value: function hello() {
	    return "Hello " + this.name + "!";
	}
    }]);

    return Hello;
}();

var HelloWorld = function(_Hello){
    _inherits(HelloWorld, _Hello);

    function HelloWorld() {
	_classCallCheck(this, HelloWorld);

	return _possibleConstructorReturn(this,
					  (HelloWorld.__proto__ || Object.getPrototypeOf
					   (HelloWorld)).call(this, "World"));
    }

    _createClass(HelloWorld, [{
	key: "echo",
	value: function echo() {
	    alert(_get(HelloWorld.prototype.__proto__ || Object.getPrototypeOf(HelloWorld.prototype),
		       "hello", this).call(this));
	}
    }]);

    return HelloWorld;
}(Hello);

var hw= newHelloWorld();
hw.echo();
