const Course = ({ course }) => {
  console.log("Content", course);
  const totalExercises = course.parts.reduce(
    (sum, part) => sum + part.exercises,
    0
  );
  return (
    <>
      <Header title={course.name} />
      {course.parts.map((part) => (
        <Part key={part.id} name={part.name} exercise={part.exercises} />
      ))}
      <Total total={totalExercises} />
    </>
  );
};

const Header = ({ title }) => {
  console.log("Header", title);
  return (
    <>
      <h1>{title}</h1>
    </>
  );
};

const Part = ({ name, exercise }) => {
  console.log("Part", name, exercise);
  return (
    <>
      <p>
        {name} {exercise}
      </p>
    </>
  );
};

const Total = ({ total }) => {
  console.log("Total", total);
  return (
    <>
      <p>Number of exercises {total}</p>
    </>
  );
};

export default Course;
