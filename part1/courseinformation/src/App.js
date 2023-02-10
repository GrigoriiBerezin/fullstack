const Header = (props) => {
    return (<h1>{props.courseName}</h1>)
}

const Part = (props) => {
    return (<p>{props.part.name} {props.part.exercises}</p>)
}

const Content = (props) => {
    return (
        <div>
            {props.parts.map(p => <Part part={p}/>)}
        </div>
    )
}

const Total = (props) => {
    return (<p>Total number of exercises {props.parts.map(p => p.exercises).reduce((p, c) => p + c)}</p>)
}

const App = () => {
    const course = 'Half Stack application development'
    const parts = [
        {
            name: 'Fundamentals of React',
            exercises: 10
        },
        {
            name: 'Using props to pass data',
            exercises: 7
        },
        {
            name: 'State of a component',
            exercises: 14
        }
    ]

    return (
        <div>
            <Header courseName={course}/>
            <Content parts={parts}/>
            <Total parts={parts}/>
        </div>
    )
}

export default App;
