import { Button, Text } from "@mantine/core";
import React, { useCallback } from "react";
import { useNotification } from "./useNotifications";
import { modals } from "@mantine/modals";

const TableContainer = () => {
    const notification = useNotification();

    const openDeleteModal = useCallback(() => {
        modals.openConfirmModal({
            title: "Delete your profile",
            centered: true,
            children: (
                <Text size="sm">
                    Are you sure you want to delete your profile? This action is
                    destructive and you will have to contact support to restore
                    your data.
                </Text>
            ),
            labels: { confirm: "Delete account", cancel: "No don't delete it" },
            confirmProps: { color: "red" },
            onCancel: () => {
                console.log("Cancel");
            },
            onConfirm: () => {
                console.log("Confirmed");
                notification.showSuccess("Deleted account");
            },
        });
    }, [modals, notification]);

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                rowGap: "1em",
                alignItems: "center",
            }}
        >
            <Button onClick={openDeleteModal} color="red">
                Delete account
            </Button>
            <Button
                variant="filled"
                onClick={() => {
                    notification.showInfo(
                        // [
                        //     "ving quite a bit of trouble as changing the default prop size for the closeButtonProps doesn't seem to behave the same way the individual close button does. My screenshot below ",
                        //     "next",
                        // ],
                        "msg",
                        // "titleee",
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
                        [null, " g  ", undefined, "gj sf   "],
                        "Paste Issues",
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
