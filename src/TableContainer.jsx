import { Button } from "@mantine/core";
import React, { useCallback } from "react";
import { useNotification } from "./useNotifications";

const TableContainer = () => {
    const notification = useNotification();

    const handleBtnClick = useCallback(() => {
        notification.showNotification([null, "   ", undefined, "gj sf   "]);
    }, [notification]);

    return (
        <Button variant="filled" onClick={handleBtnClick}>
            Button
        </Button>
    );
};

{
    /* <Table columns={columns} dataSource={data} />; */
}
export default TableContainer;
