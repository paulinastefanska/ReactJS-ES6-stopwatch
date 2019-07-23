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
			times: {
				minutes: 0,
				seconds: 0,
				miliseconds: 0
			}
		};
		_this.start = _this.start.bind(_this);
		_this.stop = _this.stop.bind(_this);
		_this.reset = _this.reset.bind(_this);
		return _this;
	}

	// reset stopwatch


	_createClass(Stopwatch, [{
		key: "reset",
		value: function reset() {
			this.setState({ times: {
					minutes: 0,
					seconds: 0,
					miliseconds: 0
				} }, this.print.bind(this));
		}

		// show stopwatch

	}, {
		key: "print",
		value: function print() {
			this.setState({ display: this.format(this.state.times) });
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

			if (!this.state.running) {
				this.setState({ running: true });
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
			var calTime = {
				minutes: this.state.times.minutes,
				seconds: this.state.times.seconds,
				miliseconds: this.state.times.miliseconds
			};
			calTime.miliseconds += 1;
			if (calTime.miliseconds >= 100) {
				calTime.seconds += 1;
				calTime.miliseconds = 0;
			}
			if (calTime.seconds >= 60) {
				calTime.minutes += 1;
				calTime.seconds = 0;
			}
			this.setState({ times: calTime });
		}

		// stop stopwatch 

	}, {
		key: "stop",
		value: function stop() {
			this.setState({ running: false });
			clearInterval(this.watch);
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
						{ href: "#", className: "button", onClick: this.start },
						"Start"
					),
					React.createElement(
						"a",
						{ href: "#", className: "button", onClick: this.stop },
						"Stop"
					),
					React.createElement(
						"a",
						{ href: "#", className: "button", onClick: this.reset },
						"Reset"
					)
				),
				React.createElement(
					"div",
					{ className: "stopwatch", id: "watch" },
					this.state.display
				)
			);
		}
	}]);

	return Stopwatch;
}(React.Component);

// react


var app = React.createElement(Stopwatch);
ReactDOM.render(app, document.getElementById("app"));
