import React, { useState } from 'react';
import './App.css';

function App() {
	return (
		<div className='container'>
			<h1>Hello World</h1>
			<FuncComp initNumber={2}></FuncComp>
			<ClassComp initNumber={2}></ClassComp>
		</div>
	);
}

// 함수 방식
// 값을 넘겨 받기 위해는 약속하였던 값을 넣어주어야 한다
var funcStyle = 'color:blue';
var funcId = 0;
function FuncComp(props) {
	var numberState = useState(props.initNumber);
	// initNumber 에 대한 값을 props 가져온다.
	var number = numberState[0]; // 배열이 가지고 있는 첫번쨰 값이 원하는 state 값이다.
	var setNumber = numberState[1]; // 상태를 바꾸는 함수

	// var [number, setNumber] = useState(props.initNumber);

	// var dateState = useState((new Date()).toString());
	// var _date = dateState[0]; // 키워드 일수 있기 떄문에 _ 추가
	// var setDate = dateState[1];

	var [_date, setDate] = useState(new Date().toString());
	// 위의 3줄 코드와 똑같이 동작한다.

	console.log('numberState', numberState);

  console.log('%cfunc => render'+(++funcId), funcStyle);
  // ++ 는 실행할 떄마다 1씩 증가 한다.

	return (
		<div className='container'>
			<h2>function style component</h2>
			{/* <p>Number : {props.initNumber}</p> */}
			<p>Number : {number}</p>
			<p>Date : {_date}</p>

			<input
				type='button'
				value='random'
				onClick={function () {
					setNumber(Math.random());
				}}></input>
			<input
				type='button'
				value='date'
				onClick={function () {
					setDate(new Date().toString());
				}}></input>
		</div>
	);
}

// class 방식
var classStyle = 'color:red';
class ClassComp extends React.Component {
	state = {
		number: this.props.initNumber,
		date: new Date().toString(),
	};
	componentWillMount() {
		console.log('%cclass => componentWillMount', classStyle);
	}
	componentDidMount() {
		console.log('%cclass => componentDidMount', classStyle);
	}
	shouldComponentUpdate(nextProps, nextState) {
		console.log('%cclass => shouldComponentUpdate', classStyle);
		return true;
	}
	componentWillUpdate(nextProps, nextState) {
		console.log('%cclass => componentWillUpdate', classStyle);
	}
	componentDidUpdate(nextProps, nextState) {
		console.log('%cclass => componentDidUpdate', classStyle);
	}
	render() {
		console.log('%cclass => render', classStyle);
		return (
			<div className='container'>
				<h2>class style component</h2>
				{/* <p>Number : {this.props.initNumber}</p> */}
				{/* {// class 방식은 그냥 값을 가져와도 괜찮고 state 으로 가져와도 괜찮다 state 방식 선호} */}
				{/* 랜덤 값을 발생시키는 버튼 */}
				<p>Number : {this.state.number}</p>
				<p>Date : {this.state.date}</p>
				<input
					type='button'
					value='random'
					onClick={
						function () {
							this.setState({ number: Math.random() });
							// this.setState 라는 메소드에 새로운 state 값을 넘겨주는걸 통해서 state 를 업데이트 시킨다 -> 그후 react 가 render 메소드를 호출한다.
						}.bind(this)
						// 클래스 방식의 안좋은점 .bind
						// 장점 : 제일 기본적인 방법 성능 이슈가 없다.
						// 단점 : 바인딩이 필요한 함수를 유지보수할때(함수를 정의할때, 수정, 삭제)할때 등 생성자에도 따로 관리를 해야된다.
					}></input>
				<input
					type='button'
					value='date'
					onClick={function () {
						this.setState({ date: new Date().toString() });
					}.bind(this)}></input>
			</div>
		);
	}
}

export default App;
