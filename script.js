// add 0 before one-digit number 
function pad0(value) {
	let result = value.toString();
	if (result.length < 2) {
 		result = '0' + result;
	}
	return result;
}

// add class and set beginning 
class Stopwatch extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			running: false,
			times: {
				minutes: 0,
				seconds: 0,
				miliseconds: 0
			},	
		}
		this.start = this.start.bind(this)
        this.stop = this.stop.bind(this)
        this.reset = this.reset.bind(this) 
	}

	// reset stopwatch
	reset () {
		this.setState ({times : {
			minutes: 0,
			seconds: 0,
			miliseconds: 0
		}},
		this.print.bind(this));
	}

	// show stopwatch
	print() {
		this.setState ({ display: this.format(this.state.times) });
	}

	// time format
	format(times) {
		return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
	}

	// run stopwatch
	start() {
		if (!this.state.running) {
			this.setState ({ running : true });
			this.watch = setInterval(() => this.step(), 10);
		}
	}

	// check if stopwatch is run
	step() {
		if (!this.state.running) return;
		this.calculate();
		this.print();
	}

	// calculate time 
	calculate() {
		let calTime = {
			minutes: this.state.times.minutes,
			seconds: this.state.times.seconds,
			miliseconds: this.state.times.miliseconds
		}
		calTime.miliseconds += 1;
		if (calTime.miliseconds >= 100) {
			calTime.seconds += 1;
			calTime.miliseconds = 0;
		}
		if (calTime.seconds >= 60) {
			calTime.minutes += 1;
			calTime.seconds = 0;
		}
		this.setState({ times: calTime })
	}

	// stop stopwatch 
	stop() {
		this.setState ({ running : false });
		clearInterval(this.watch);
	}

	render() {
		return (
			<div className="counter">
				<nav className="controls">
					<a href="#" className="button" onClick={this.start}>
						Start
					</a>
					<a href="#" className="button" onClick={this.stop}>
						Stop
					</a>
					<a href="#" className="button" onClick={this.reset}>
						Reset
					</a>
				</nav>
				<div className="stopwatch" id="watch">
					{this.state.display}
				</div>
			</div>
	    );
  	}
}

// react
const app = React.createElement(Stopwatch);
ReactDOM.render(app, document.getElementById("app"));