import React from "react";
import moment from "moment/moment";
import { COMPANY_DATA } from "../../utils/company_data";

const OfficeStatus = ({estimatedDeployementTime}) => {
    //estimatedDeployementTime is in sec.
    const MS = 1000;

    const getEstimatedTime = (targetTimezone) => {
        let estimatedTimeInMs = new Date( new Date().getTime() +  estimatedDeployementTime*MS);
           estimatedTimeInMs = estimatedTimeInMs.toLocaleString("en-US", { timeZone: targetTimezone });
        const currentEstimatedDate = moment(estimatedTimeInMs).format("dddd, MMM. DD @ h:mm:ss a");
        return currentEstimatedDate;
      };

   return (
    <div className="office">
       <p>Est. Deployment Time :-</p>
      { COMPANY_DATA.map((data,index) => {
        let formatedDate = getEstimatedTime(data?.timeZone);
        return <p key={index} className="office_p"> {data.city + ": " + formatedDate}</p>;
      })}
    </div>
    )
}

export default OfficeStatus ;