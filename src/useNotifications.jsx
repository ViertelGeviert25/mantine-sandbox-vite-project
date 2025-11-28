import "@mantine/notifications/styles.css";
import { randomId } from "@mantine/hooks";
import NotificationWithProgress from "./NotificationWithProgress";
import "./notifications.css";
import { notifications } from "@mantine/notifications";

export const useNotification = () => {
    const notificationId = randomId();

    const showNotification = (notificationObj) => {
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

        const getMessage = () => {
            if (typeof notificationObj === "string") {
                return notificationObj;
            }
            if (Array.isArray(notificationObj)) {
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
            }
        };

        notifications.show({
            id: notificationId,
            title: "Paste Messages",
            position: "top-right",
            message: (
                <div className="cms-list-notification">
                    {getMessage()}
                    <NotificationWithProgress
                        duration={5000}
                        id={notificationId}
                    />
                </div>
            ),
            style: {
                backgroundColor: "#dfebf5",
                padding: "15px",
            },
            color: "blue",

            // https://icons.getbootstrap.com/icons/info-circle-fill/
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                >
                    <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                </svg>
            ),
            autoClose: false, // we control autoClose ourself
            withBorder: true,
        });
    };

    return {
        showNotification,
    };
};
