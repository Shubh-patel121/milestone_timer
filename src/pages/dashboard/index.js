import React, { useCallback, useState } from "react";
import { CommonButton } from "../../components/reusable/button";
import { SPEED_DATA } from "../../utils/timer_speed_data";
import CounterStatus from "../counter_status";
import OfficeStatus from "../office_status";
import { dashboardController } from "../../controllers/dashboard_controllers";

const Dashboard = () => {
  const { state, dispatch } = dashboardController();
  const { inputValue, timerSpeed, disabled, startTimer, error } = state;
  const [estimatedDeployementTime, setEstimatedDeploymentTime] = useState(
    inputValue * 60
  );
  const handleTimerStart = useCallback(() => {
    const isNumber = inputValue.match(/^\d{1,2}$/);
    const onlyZeros = inputValue.match(/^0{1,2}$/);

    if (!isNumber || onlyZeros) {
      dispatch({ type: "error" });
    } else {
      dispatch({ type: "start" });
    }
  }, [dispatch, inputValue]);

  const handleFormatValue = useCallback((inputNumber) => {
    // remove any leading zeros
    const formatedValue = inputNumber.replace(/^0+/g, "");

    // and give back the string transformed in number
    return +formatedValue;
  }, []);

  return (
    <div>
      <div>
        <form>
          <input
            type="number"
            value={inputValue}
            onChange={(e) =>
              dispatch({
                type: "field",
                fieldName: "inputValue",
                payload: e.target.value,
              })
            }
            placeholder="Time (Min)"
            disabled={disabled}
          ></input>
          <div className="start-reset">
            <CommonButton
              title={startTimer ? "RESET" : "START"}
              handleClick={() => {
                startTimer ? dispatch({ type: "restart" }) : handleTimerStart();
              }}
            />
          </div>
        </form>
        {error && (
          <span className="error">Time can't be negative or zero !.</span>
        )}
      </div>
      <div>
        {startTimer ? (
          <CounterStatus
            className="timer"
            timer={handleFormatValue(inputValue)}
            speed={timerSpeed}
            setEstimatedDeploymentTime={setEstimatedDeploymentTime}
          />
        ) : (
          <span className="timer_class">00:00</span>
        )}
      </div>

      <div className="speed_container">
        {SPEED_DATA.map((speedObj, index) => {
          return (
            <CommonButton
              key={index}
              title={speedObj.title}
              isSelected={timerSpeed == speedObj.speed}
              handleClick={() =>
                dispatch({
                  type: "field",
                  fieldName: "timerSpeed",
                  payload: speedObj.speed,
                })
              }
            />
          );
        })}
      </div>

      {startTimer && (
        <div className="office_container">
          <OfficeStatus estimatedDeployementTime={estimatedDeployementTime} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
