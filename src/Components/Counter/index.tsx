import React, { useCallback, useEffect, useState, memo, useRef } from 'react';

import { constants, enums } from 'constants/index';
import { createDateInMiliseconds } from 'utils/functions';

export const Counter: React.FC<{ lastSeen: number }> = memo(({ lastSeen }) => {
  const [count, setCount] = useState(0);

  const currentCountIntervalId = useRef<NodeJS.Timeout | null>(null);

  const timer = useCallback(() => {
    const currentDateInMiliseconds = createDateInMiliseconds();

    const timeDifferenceInSeconds = Math.round(
      (currentDateInMiliseconds - lastSeen) / constants.ONE_SECOND_IN_MS
    );

    const countInterval =
      timeDifferenceInSeconds < constants.ONE_MINUTE_IN_SECONDS
        ? constants.ONE_SECOND_IN_MS
        : constants.ONE_MINUTE_IN_MS;

    setCount(timeDifferenceInSeconds);

    const countIntervalId = setTimeout(() => {
      timer();
    }, countInterval);

    currentCountIntervalId.current = countIntervalId;
  }, [lastSeen]);

  const renderCountMessage = () => {
    if (count < 0) return enums.CounterMessages.FUTURE_MESSAGE;

    return count < constants.ONE_MINUTE_IN_SECONDS
      ? `${count} ${enums.CounterMessages.SECONDS_MESSAGE}`
      : `${Math.round(count / constants.ONE_MINUTE_IN_SECONDS)} ${
          enums.CounterMessages.MINUTES_MESSAGE
        }`;
  };

  useEffect(() => {
    timer();

    return () => {
      setCount(0);
      if (currentCountIntervalId.current)
        clearTimeout(currentCountIntervalId.current);
    };
  }, [lastSeen, timer]);

  return <div>{renderCountMessage()}</div>;
});
