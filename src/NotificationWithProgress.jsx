import { useState, useEffect, useRef, useCallback } from "react";
import { Progress } from "@mantine/core";
import { hideNotification } from "@mantine/notifications";

const NotificationWithProgress = ({ id, duration }) => {
    const [progress, setProgress] = useState(100);
    const timer = useRef(null);
    const startTime = useRef(Date.now());
    const remaining = useRef(duration);
    const paused = useRef(false);

    const start = useCallback(() => {
        startTime.current = Date.now();
        timer.current = window.setInterval(() => {
            const elapsed =
                Date.now() - startTime.current + (duration - remaining.current);
            const percent = 100 - (elapsed / duration) * 100;
            if (percent <= 0) {
                clearInterval(timer.current);
                hideNotification(id);
            } else {
                setProgress(percent);
            }
        }, 60);
    }, []);

    const pause = useCallback(() => {
        if (!paused.current) {
            paused.current = true;
            remaining.current -= Date.now() - startTime.current;
            clearInterval(timer.current);
        }
    }, []);

    const resume = useCallback(() => {
        if (paused.current) {
            paused.current = false;
            start();
        }
    }, []);

    useEffect(() => {
        const notificationBoxElem = document.getElementById(id);
        if (!notificationBoxElem) {
            console.error("Notification element not found");
            return;
        }
        notificationBoxElem.addEventListener("mouseenter", pause);
        notificationBoxElem.addEventListener("mouseleave", resume);

        return () => {
            notificationBoxElem.removeEventListener("mouseenter", pause);
            notificationBoxElem.removeEventListener("mouseleave", resume);
        };
    }, []);

    useEffect(() => {
        start();
        return () => clearInterval(timer.current);
    }, []);

    return <Progress size={2} value={progress} />;
};

export default NotificationWithProgress;
