import { Button } from '@mui/material';
import { useEffect, useState } from 'react';

export const RunSimulationButton = () => {
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    if (!isRunning) return;

    const eventSource = new EventSource('http://localhost:8181/run-simulation');

    eventSource.onmessage = (event) => {
      console.log('Event received:', event.data);
      // Handle incoming events
    };

    eventSource.onerror = (error) => {
      console.error('EventSource failed:', error);
      eventSource.close();
      // setIsRunning(false);
    };

    return () => {
      eventSource.close();
    };
  }, [isRunning]);

  return !isRunning ? (
    <Button
      variant="contained"
      onClick={() => {
        console.debug('Run simulation');
        setIsRunning(true);
      }}
      sx={{ width: '150px' }}
    >
      Run simulation
    </Button>
  ) : (
    <Button
      variant="contained"
      color="error"
      onClick={() => {
        console.debug('Stop simulation');
        setIsRunning(false);
      }}
      sx={{ width: '150px' }}
    >
      Stop simulation
    </Button>
  );
};
