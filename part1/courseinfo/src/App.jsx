const Header = ({ course }) => {
  return (
    <>
      <h1>{course}</h1>
    </>
  );
};

const Content = ({ content }) => {
  return (
    <>
      <Part part={content.part1} exercise={content.exercises1}/>
      <Part part={content.part2} exercise={content.exercises1}/>
      <Part part={content.part3} exercise={content.exercises3}/>
    </>
  );
};

const Part = ({ part, exercise }) => {
  return (
    <>
      <p>
        {part} {exercise}
      </p>
    </>
  );
};

const Total = ({ exercises }) => {
  return (
    <>
      <p>
        Number of exercises{" "}
        {exercises.exercises1 + exercises.exercises2 + exercises.exercises3}
      </p>
    </>
  );
};

const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  const content = { part1, part2, part3, exercises1, exercises2, exercises3 };
  const exercises = { exercises1, exercises2, exercises3 };

  return (
    <div>
      <Header course={course} />
      <Content content={content} />
      <Total exercises={exercises} />
    </div>
  );
};

export default App;
