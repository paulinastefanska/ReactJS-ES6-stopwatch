"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// add 0 before one-digit number 
function pad0(value) {
	var result = value.toString();
	if (result.length < 2) {
		result = '0' + result;
	}
	return result;
}

// add class and set beginning 

var Stopwatch = function (_React$Component) {
	_inherits(Stopwatch, _React$Component);

	function Stopwatch(props) {
		_classCallCheck(this, Stopwatch);

		var _this = _possibleConstructorReturn(this, (Stopwatch.__proto__ || Object.getPrototypeOf(Stopwatch)).call(this, props));

		_this.state = {
			running: false,
			minutes: 0,
			seconds: 0,
			miliseconds: 0
		};
		return _this;
	}

	// reset stopwatch


	_createClass(Stopwatch, [{
		key: "reset",
		value: function reset() {
			this.times = {
				minutes: 0,
				seconds: 0,
				miliseconds: 0
			};
		}

		// show stopwatch

	}, {
		key: "print",
		value: function print() {
			this.display.innerText = this.format(this.times);
		}

		// time format

	}, {
		key: "format",
		value: function format(times) {
			return pad0(times.minutes) + ":" + pad0(times.seconds) + ":" + pad0(Math.floor(times.miliseconds));
		}

		// run stopwatch

	}, {
		key: "start",
		value: function start() {
			var _this2 = this;

			if (!this.running) {
				this.running = true;
				this.watch = setInterval(function () {
					return _this2.step();
				}, 10);
			}
		}

		// check if stopwatch is run

	}, {
		key: "step",
		value: function step() {
			if (!this.state.running) return;
			this.calculate();
			this.print();
		}

		// calculate time

	}, {
		key: "calculate",
		value: function calculate() {
			this.state.times.miliseconds += 1;
			if (this.times.miliseconds >= 100) {
				this.times.seconds += 1;
				this.times.miliseconds = 0;
			}
			if (this.times.seconds >= 60) {
				this.times.minutes += 1;
				this.times.seconds = 0;
			}
		}

		// stop stopwatch 

	}, {
		key: "stop",
		value: function stop() {
			this.running = false;
			clearInterval(this.watch);
		}

		// time reset

	}, {
		key: "resetTimer",
		value: function resetTimer() {
			this.reset();
			this.print();
		}
	}, {
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				{ className: "counter" },
				React.createElement(
					"nav",
					{ className: "controls" },
					React.createElement(
						"a",
						{ href: "#", className: "button", onClick: this.start = this.start.bind(this) },
						"Start"
					),
					React.createElement(
						"a",
						{ href: "#", className: "button", onClick: this.stop = this.stop.bind(this) },
						"Stop"
					),
					React.createElement(
						"a",
						{ href: "#", className: "button", onClick: this.reset = this.reset.bind(this) },
						"Reset"
					)
				),
				React.createElement(
					"div",
					{ className: "stopwatch", id: "watch" },
					this.format.bind()
				)
			);
		}
	}]);

	return Stopwatch;
}(React.Component);

// react


var app = React.createElement(Stopwatch);
ReactDOM.render(app, document.getElementById("app"));
