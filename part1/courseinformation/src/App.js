const Header = (props) => {
  return (<h1>{props.courseName}</h1>)
}

const Content = (props) => {
  return (<p>{props.partName} {props.exerciseCount}</p>)
}

const Total = (props) => {
  return (<p>Total number of exercises {props.total}</p>)
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
      <div>
        <Header courseName={course}/>
        <Content partName={part1} exerciseCount={exercises1}/>
        <Content partName={part2} exerciseCount={exercises2}/>
        <Content partName={part3} exerciseCount={exercises3}/>
        <Total total={exercises1 + exercises2 + exercises3}/>
      </div>
  )
}

export default App;
