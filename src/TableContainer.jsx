import { Button } from "@mantine/core";
import React, { useCallback } from "react";
import { useNotification } from "./useNotifications";

const TableContainer = () => {
    const notification = useNotification();

    return (
        <div>
            <Button
                variant="filled"
                onClick={() => {
                    notification.showInfo(
                        [
                            "ving quite a bit of trouble as changing the default prop size for the closeButtonProps doesn't seem to behave the same way the individual close button does. My screenshot below ",
                            "next",
                        ],
                        "dfg",
                        true
                    );
                }}
            >
                Info
            </Button>
            <Button
                variant="filled"
                onClick={() => {
                    notification.showSuccess(
                        [null, "   ", undefined, "gj sf   "],
                        "",
                        true
                    );
                }}
            >
                Success
            </Button>
            <Button
                variant="filled"
                onClick={() => {
                    notification.showWarning(
                        [null, "   ", undefined, "gj sf   "],
                        "",
                        true
                    );
                }}
            >
                Warning
            </Button>
            <Button
                variant="filled"
                onClick={() => {
                    notification.showError(
                        [null, "   ", undefined, "gj sf   "],
                        "",
                        true
                    );
                }}
            >
                Error
            </Button>
        </div>
    );
};

{
    /* <Table columns={columns} dataSource={data} />; */
}
export default TableContainer;
