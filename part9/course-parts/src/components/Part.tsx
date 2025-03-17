import { CoursePart } from "../App";

interface PartProps {
  coursePart: CoursePart;
}

const Part = ({ coursePart }: PartProps) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const renderContent = (coursePart: CoursePart) => {
    switch (coursePart.kind) {
      case "group":
        return (
          <>
            <h3>
              {coursePart.name} {coursePart.exerciseCount}
            </h3>
            <p>Projects exercises {coursePart.groupProjectCount}</p>
          </>
        );
      case "basic":
        return (
          <>
            <h3>
              {coursePart.name} {coursePart.exerciseCount}
            </h3>
            <i>{coursePart.description}</i>
          </>
        );
      case "background":
        return (
          <>
            <h3>
              {coursePart.name} {coursePart.exerciseCount}
            </h3>
            <i>{coursePart.description}</i>
            <p>Submit to {coursePart.backgroundMaterial}</p>
          </>
        );
      case "special":
        return (
          <>
            <h3>
              {coursePart.name} {coursePart.exerciseCount}
            </h3>
            <i>{coursePart.description}</i>
            <ul>
              {coursePart.requirements.map((r, index) => (
                <li key={index}>{r}</li>
              ))}
            </ul>
          </>
        );
        default: 
            return assertNever(coursePart);
    }
  };

  return <div>{renderContent(coursePart)}</div>;
};

export default Part;
