import React, { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/fa";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("fa");

interface PersianRelativeTimeProps {
  createdAt: string;
}

const PersianRelativeTime: React.FC<PersianRelativeTimeProps> = ({
  createdAt,
}) => {
  const [relativeTimeText, setRelativeTime] = useState<string>("");
  const [unit, setUnit] = useState<string>("");

  useEffect(() => {
    const createdDate: Dayjs = dayjs(createdAt).tz("Asia/Tehran");

    const interval = setInterval(() => {
      const now: Dayjs = dayjs().tz("Asia/Tehran");
      const diff: string = now.from(createdDate, true);

      const [number, unit] = diff.split(" ");

      const persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
      const persianNumber = number
        .split("")
        .map((char) => persianNumbers[parseInt(char)])
        .join("");

      setUnit(unit);
      setRelativeTime(persianNumber);
    }, 1000);

    return () => clearInterval(interval);
  }, [createdAt]);

  return (
    <span className="flex text-right  justify-end items-center gap-1 text-black-secondary text-base ">
      <span> پیش در</span>
      <span> {unit} </span>
      <span className="text-right"> {relativeTimeText} </span>
    </span>
  );
};

export default PersianRelativeTime;
