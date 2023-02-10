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

const StatisticRow = ({name, count}) => {
    return (
        <tr>
            <td>{name}</td>
            <td>{count}</td>
        </tr>)
}

const StatisticTable = ({stats}) => {
    return (
        <table>
            <tbody>
            {stats.map(info => <StatisticRow name={info.name} count={info.count}/>)}
            </tbody>
        </table>
    )
}

const StatisticBar = ({stats}) => {
    const rating = {'good': 1, 'neutral': 0, 'bad': -1}

    const rateCount = stats.map(info => info.count).reduce((p, c) => p + c)

    if (rateCount) {
        let average = stats.map(info => info.count * rating[info.name]).reduce((p, c) => p + c) / rateCount
        let positiveRate = stats.filter(info => info.name === 'good').map(info => info.count) / rateCount

        const newStats = stats.concat({name: 'all', count: rateCount})
            .concat({name: 'average', count: average})
            .concat({name: 'positive', count: positiveRate * 100 + ' %'})

        return (
            <>
                <h1>statistics</h1>
                <StatisticTable stats={newStats}/>
            </>
        )
    } else {
        return (
            <>
                <h1>statistics</h1>
                <p>No feedback given</p>
            </>
        )
    }
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
            <StatisticBar stats={statStateList}/>
        </div>
    )
}

export default App;
