/// <reference types="node" />
import type { UseTimerProps } from './useTimer.types';
declare const useTimer: ({ duration, onTick, onFinish }: UseTimerProps) => {
    time: number;
    timer: NodeJS.Timer | undefined;
    isRunning: boolean;
    start: () => void;
    stop: () => void;
    restart: () => void;
};
export default useTimer;
