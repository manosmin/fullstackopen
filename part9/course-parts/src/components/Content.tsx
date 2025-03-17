import { CoursePart } from '../App';
import Part from './Part';

interface ContentProps {
    courseParts: CoursePart[];
}

const Content = ({courseParts}: ContentProps) => {
  return (
    <div>
        {courseParts.map((c, index) => <Part key={index} coursePart={c}/>)}
    </div>
  )
}

export default Content