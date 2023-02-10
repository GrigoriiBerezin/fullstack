import Part from "./Part";

const Content = ({parts}) => (parts.map(part => <Part
    name={part.name}
    exercises={part.exercises}
    key={part.id}/>))

export default Content
