const Header = ({ title }) => {
  console.log('Header', title);
  return (
    <>
      <h1>{title}</h1>
    </>
  );
};

const Course = ({ course }) => {
  console.log('Content', course);
  const totalExercises = course.parts.reduce((sum, part) => sum + part.exercises, 0);
  return (
    <>
    <Header title={course.name}/>
      {course.parts.map((part) => (
        <Part key={part.id} name={part.name} exercise={part.exercises}/>
      ))}
      <Total total={totalExercises}/>
    </>
  );
};

const Part = ({ name, exercise }) => {
  console.log('Part', name, exercise);
  return (
    <>
      <p>
        {name} {exercise}
      </p>
    </>
  );
};

const Total = ({ total }) => {
  console.log('Total', total);
  return (
    <>
      <p>Number of exercises {total}</p>
    </>
  );
};

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ];

  return (
    <div>
      {courses.map(course => (
        <Course key={course.id} course={course} />
      ))}
    </div>
  );
};

export default App;
