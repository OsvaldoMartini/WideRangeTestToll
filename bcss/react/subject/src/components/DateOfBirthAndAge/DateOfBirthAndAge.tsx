import React from "react";
import { DateTime, Interval } from "luxon";

export interface DateOfBirthAndAgeProps {
	dateOfBirth: string;
}

const DateOfBirthAndAge = ({dateOfBirth = DateTime.now().toFormat("d MMM yyyy")}:DateOfBirthAndAgeProps) => {
	return (
		<>
			{dateOfBirth} ({age(dateOfBirth)})
		</>
	)
}


const age = (dateOfBirth: string) => {
  let start = DateTime.fromFormat( dateOfBirth , "d MMM yyyy");
  let today = DateTime.now();
  return Math.floor(Interval.fromDateTimes(start, today).length("years"));
};

export default DateOfBirthAndAge;