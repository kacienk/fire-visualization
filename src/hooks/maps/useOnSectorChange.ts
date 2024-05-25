import { Dispatch, SetStateAction, useEffect } from 'react';
import { eventEmitter } from '../../utils/eventEmitter';

export const useOnSectorChange = (setCurrentSectorIdCallback: Dispatch<SetStateAction<number | null>>) => {
  useEffect(() => {
    const onSectorChange = (sectorId: number | null) => {
      setCurrentSectorIdCallback((prevSectorId) => (prevSectorId !== sectorId ? sectorId : null));
    };

    eventEmitter.addListener('onSectorChange', onSectorChange);

    return () => {
      eventEmitter.removeListener('onSectorChange', onSectorChange);
    };
  }, []);
};
