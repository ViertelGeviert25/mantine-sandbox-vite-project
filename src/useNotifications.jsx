import "@mantine/notifications/styles.css";
import { randomId } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useState, useEffect, useRef, useCallback } from "react";
import { Progress } from "@mantine/core";
import { hideNotification } from "@mantine/notifications";
import "./notifications.css";

const NOTIFICATION_TYPE = {
    INFO: "info",
    SUCCESS: "success",
    WARNING: "warning",
    ERROR: "error",
};

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

    return (
        <Progress
            size={2}
            value={progress}
            className="cms-notification-progress"
        />
    );
};

export const useNotification = () => {
    const showNotification = (
        notificationObj,
        title,
        type,
        autoClose = true
    ) => {
        // use built-in mantine random string generator function
        const notificationId = randomId();

        if (String(notificationObj ?? "").trim().length === 0) {
            return;
        }
        const notificationArr = Array.isArray(notificationObj)
            ? Array.from(
                  notificationObj.filter(
                      (msg) => String(msg ?? "").trim().length > 0
                  )
              )
            : [];

        if (notificationArr.length === 0) {
            return;
        }

        const getColor = () => {
            switch (type) {
                case NOTIFICATION_TYPE.INFO:
                    return "blue";
                case NOTIFICATION_TYPE.WARNING:
                    return "orange";
                case NOTIFICATION_TYPE.ERROR:
                    return "red";
                case NOTIFICATION_TYPE.SUCCESS:
                    return "green";
                default:
                    return "blue";
            }
        };

        const getIcon = () => {
            switch (type) {
                case NOTIFICATION_TYPE.INFO:
                    return (
                        <svg
                            width="32"
                            height="32"
                            fill="white"
                            className="bi bi-info-circle-fill"
                            viewBox="0 0 16 16"
                        >
                            <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                        </svg>
                    );
                case NOTIFICATION_TYPE.WARNING:
                    return (
                        <svg
                            width="32"
                            height="32"
                            fill="white"
                            className="bi bi-exclamation-triangle-fill"
                            viewBox="0 0 16 16"
                        >
                            <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.553.553 0 0 1-1.1 0z" />
                        </svg>
                    );
                case NOTIFICATION_TYPE.ERROR:
                    return (
                        <svg
                            width="32"
                            height="32"
                            fill="white"
                            className="bi bi-exclamation-circle-fill"
                            viewBox="0 0 16 16"
                        >
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                        </svg>
                    );
                case NOTIFICATION_TYPE.SUCCESS:
                    return (
                        <svg
                            width="32"
                            height="32"
                            fill="white"
                            className="bi bi-check-circle-fill"
                            viewBox="0 0 16 16"
                        >
                            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z" />
                        </svg>
                    );
                default:
                    return null;
            }
        };

        const getMessage = () => {
            if (typeof notificationObj === "string") {
                return notificationObj;
            }
            if (Array.isArray(notificationObj) && notificationArr.length > 1) {
                return (
                    <ul>
                        {notificationArr.map((msg, index) => (
                            <li
                                key={`cms-notification-${notificationId}-${index}`}
                            >
                                {msg}
                            </li>
                        ))}
                    </ul>
                );
            } else {
                return notificationArr.at(0);
            }
        };

        notifications.show({
            id: notificationId,
            title: title,
            position: "top-right",
            message: (
                <div className="cms-list-notification">
                    {getMessage()}
                    {autoClose ? (
                        <NotificationWithProgress
                            duration={5000}
                            id={notificationId}
                        />
                    ) : null}
                </div>
            ),
            style: {
                backgroundColor: "white",
                padding: "15px",
                borderRadius: "14px",
            },
            color: getColor(),

            // https://icons.getbootstrap.com/icons/info-circle-fill/
            icon: getIcon(),
            autoClose: false, // we control autoClose ourself
            withBorder: true,
        });
    };

    const showInfo = useCallback(
        (notifications, title = "", autoClose = true) => {
            showNotification(
                notifications,
                title,
                NOTIFICATION_TYPE.INFO,
                autoClose
            );
        },
        []
    );

    const showWarning = useCallback(
        (notifications, title = "", autoClose = true) => {
            showNotification(
                notifications,
                title,
                NOTIFICATION_TYPE.WARNING,
                autoClose
            );
        },
        []
    );

    const showError = useCallback(
        (notifications, title = "", autoClose = true) => {
            showNotification(
                notifications,
                title,
                NOTIFICATION_TYPE.ERROR,
                autoClose
            );
        },
        []
    );

    const showSuccess = useCallback(
        (notifications, title = "", autoClose = true) => {
            showNotification(
                notifications,
                title,
                NOTIFICATION_TYPE.SUCCESS,
                autoClose
            );
        },
        []
    );

    return {
        showInfo,
        showWarning,
        showError,
        showSuccess,
    };
};
