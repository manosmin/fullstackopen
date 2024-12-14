import { useEffect, useState } from "react";
import "./App.css";

const Button = ({ text, style, handleClick }) => {
  return (
    <button style={style} onClick={handleClick(text)}>
      {text}
    </button>
  );
};

const StatisticLine = ({ text, value }) => {
  return (
    <li>
      {text} = {value}{text === "positive" && '%'}
    </li>
  );
};

const Statistics = ({ total, perc, avg, userFeedback }) => {
  return (
    <>
      <h2>Statistics</h2>
      <ul>
        <StatisticLine text="good" value={userFeedback.good}></StatisticLine>
        <StatisticLine
          text="neutral"
          value={userFeedback.neutral}
        ></StatisticLine>
        <StatisticLine text="bad" value={userFeedback.bad}></StatisticLine>
        <StatisticLine text="all" value={total}></StatisticLine>
        <StatisticLine text="average" value={avg}></StatisticLine>
        <StatisticLine text="positive" value={perc}></StatisticLine>
      </ul>
    </>
  );
};

const App = () => {
  const [userFeedback, setUserFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });
  const [total, setTotal] = useState(0);
  const [perc, setPerc] = useState(0);
  const [avg, setAvg] = useState(0);

  const handleClick = (feedback) => {
    return () => {
      setUserFeedback((prevState) => ({
        ...prevState,
        [feedback]: prevState[feedback] + 1,
      }));
    };
  };

  useEffect(() => {
    const totalVotes = userFeedback.good + userFeedback.neutral + userFeedback.bad;
    setTotal(totalVotes);
    const goodBadTotalVotes = userFeedback.good + userFeedback.bad;
    setAvg(goodBadTotalVotes && ((userFeedback.good - userFeedback.bad) / goodBadTotalVotes).toFixed(2));
    setPerc(
      totalVotes ? ((userFeedback.good / totalVotes) * 100).toFixed(2) : 0
    );
  }, [userFeedback]);

  return (
    <>
      <h1>Unicafe</h1>
      <h2>Give feedback</h2>
      <div className="feedback">
        <Button text="good" handleClick={handleClick} style={{ backgroundColor: "green" }}/>
        <Button text="neutral" handleClick={handleClick} style={{ backgroundColor: "blue" }}/>
        <Button text="bad" handleClick={handleClick} style={{ backgroundColor: "red" }}/>
        {total ? (
          <Statistics total={total} perc={perc} avg={avg} userFeedback={userFeedback} />
        ) : (
          <p>No feedback given</p>
        )}
      </div>
    </>
  );
};

export default App;
