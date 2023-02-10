const Header = (props) => {
  return (<h1>{props.courseName}</h1>)
}

const Part = (props) => {
    return (<p>{props.partName} {props.exerciseCount}</p>)
}

const Content = (props) => {
  return (
      <div>
          <Part partName={props.partNames[0]} exerciseCount={props.exerciseCounts[0]}/>
          <Part partName={props.partNames[1]} exerciseCount={props.exerciseCounts[1]}/>
          <Part partName={props.partNames[2]} exerciseCount={props.exerciseCounts[2]}/>
      </div>
  )
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
        <Content partNames={[part1, part2, part3]} exerciseCounts={[exercises1, exercises2, exercises3]}/>
        <Total total={exercises1 + exercises2 + exercises3}/>
      </div>
  )
}

export default App;
