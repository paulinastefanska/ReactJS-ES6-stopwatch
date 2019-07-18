// add class and set beginning
class Stopwatch extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			running: false,
			minutes: 0,
			seconds: 0,
			miliseconds: 0
		}
	}
	render() {
		return (
			document.getElementById('app')
		);
	}
	

	// reset stopwatch
	reset () {
		this.times = {
			minutes: 0,
			seconds: 0,
			miliseconds: 0
		};
	}

	// show stopwatch
	print() {
		this.display.innerText = this.format(this.times);
	}

	// time format
	format(times) {
		return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
	}

	// run stopwatch
	start() {
		if (!this.running) {
			this.running = true;
			this.watch = setInterval(() => this.step(), 10);
		}
	}

	// check if stopwatch is run
	step() {
		if (!this.running) return;
		this.calculate();
		this.print();
	}

	// calculate time
	calculate() {
		this.times.miliseconds += 1;
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
	stop() {
		this.running = false;
		clearInterval(this.watch);
	}

	// time reset
	resetTimer() {
		this.reset();
		this.print();
	}
}

// add 0 before one-digit number 
function pad0(value) {
	let result = value.toString();
	if (result.length < 2) {
 		result = '0' + result;
	}
	return result;
}
const stopwatch = new Stopwatch(
	document.querySelector('.stopwatch')
);

// buttons click
let startButton = document.getElementById('start');
startButton.addEventListener('click', () => stopwatch.start());

let stopButton = document.getElementById('stop');
stopButton.addEventListener('click', () => stopwatch.stop());

let resetButton = document.getElementById('reset');
resetButton.addEventListener('click', () => stopwatch.resetTimer());

// react
const app = React.createElement(Stopwatch);
ReactDOM.render(app, document.getElementById("app"));