"use client";

import React, { Fragment, useState, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { Calendar, DateLocalizer } from "react-big-calendar";
import DemoLink from "../../resource/DemoLink.component";
import events from "../../resource/events";
import locale from "../../node_modules/globalize/lib/cultures/globalize.culture.ko";

const cultures = ["en", "ko"];
const lang = {
  en: null,
  ko: {
    week: "주",
    work_week: "일하는 날",
    day: "일",
    month: "월",
    previous: "이전월",
    next: "다음월",
    today: "오늘",
    agenda: "일정",
    showMore: (total: number) => `+${total}개`,
  },
};

export default function CulturesDemo({ locale: any }) {
  const [culture, setCulture] = useState("ko");
  const [rightToLeft, setRightToLeft] = useState(false);

  const cultureOnClick = useCallback(
    ({ target: { value: any } }) => {
      // really better to useReducer for simultaneously setting multiple state values
      setCulture(value);
      setRightToLeft(value === "ko");
    },
    [setCulture]
  );

  const { defaultDate, messages } = useMemo(
    () => ({
      defaultDate: new Date(2015, 3, 1),
      messages: lang[culture],
    }),
    [culture]
  );

  return (
    <Fragment>
      <DemoLink fileName="cultures">
        <div>
          <label>Select a Culture</label>{" "}
          <select
            className="form-control"
            style={{ width: 200, display: "inline-block" }}
            defaultValue={"ko"}
            onChange={cultureOnClick}
          >
            {cultures.map((c, idx) => (
              <option key={idx} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </DemoLink>
      <div className="height600">
        <Calendar
          culture={culture}
          defaultDate={defaultDate}
          events={events}
          localizer={locale}
          messages={messages}
          rtl={rightToLeft}
        />
      </div>
    </Fragment>
  );
}

CulturesDemo.propTypes = {
  localizer: PropTypes.instanceOf(DateLocalizer),
};
