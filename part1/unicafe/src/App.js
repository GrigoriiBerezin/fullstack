import {useState} from "react";

const Button = ({onClick, name}) => {
    return (<button onClick={onClick}>{name}</button>)
}

const ButtonBar = ({buttonsInfo}) => {
    return (
        <>
            <h1>give feedback</h1>
            {buttonsInfo.map(info => <Button onClick={info.onClick} name={info.name}/>)}
        </>
    )
}

const Statistic = ({name, count}) => {
    return (<p>{name} {count}</p>)
}

const StatisticList = ({stats}) => {
    const rating = {'good': 1, 'neutral': 0, 'bad': -1}

    const rateCount = stats.map(info => info.count).reduce((p, c) => p + c)
    let average = stats.map(info => info.count * rating[info.name]).reduce((p, c) => p + c) / rateCount
    average = ((average) ? average : 0)
    let positiveRate = stats.filter(info => info.name === 'good').map(info => info.count) / rateCount
    positiveRate = ((positiveRate) ? positiveRate : 0)

    return (
        <>
            <h1>statistics</h1>
            {stats.map(stat => <Statistic name={stat.name} count={stat.count}/>)}
            <Statistic name={'all'} count={rateCount}/>
            <Statistic name='average' count={average}/>
            <Statistic name='positive' count={positiveRate * 100 + ' %'}/>
        </>
    )
}

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const statStateList = [
        {name: 'good', count: good, onClick: () => setGood(good + 1)},
        {name: 'neutral', count: neutral, onClick: () => setNeutral(neutral + 1)},
        {name: 'bad', count: bad, onClick: () => setBad(bad + 1)}
    ]

    return (
        <div>
            <ButtonBar buttonsInfo={statStateList}/>
            <StatisticList stats={statStateList}/>
        </div>
    )
}

export default App;
