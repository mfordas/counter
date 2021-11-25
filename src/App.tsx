import { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';

import { Counter } from 'Components/Counter';
import { createDateInMiliseconds } from 'utils/functions';
import { constants } from 'constants/index';

import './App.css';

function App() {
  const [lastSeen, setLastSeen] = useState(new Date());

  return (
    <div className='App'>
      <div className='dateTimeContainer'>
        <DateTimePicker
          value={lastSeen}
          onChange={setLastSeen}
          format={constants.DATE_FORMAT}
        />
      </div>
      <Counter
        lastSeen={
          lastSeen
            ? createDateInMiliseconds(lastSeen)
            : createDateInMiliseconds()
        }
      />
    </div>
  );
}

export default App;
