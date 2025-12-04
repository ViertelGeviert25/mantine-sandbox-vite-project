// import { useState } from "react";
// import {
//     Badge,
//     Popover,
//     Button,
//     Stack,
//     Text,
//     ScrollArea,
//     Group,
//     Avatar,
// } from "@mantine/core";

// const notificationsMock = [
//     { id: 1, title: "Neues Video: React Tutorial", read: false },
//     { id: 2, title: "Dein Kommentar wurde geliked", read: false },
//     { id: 3, title: "Update: Neue Features verfügbar", read: true },
// ];

// export default function NotificationCenter() {
//     const [opened, setOpened] = useState(false);
//     const [notifications, setNotifications] = useState(notificationsMock);

//     const unreadCount = notifications.filter((n) => !n.read).length;

//     const markAsRead = (id) => {
//         setNotifications(
//             notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
//         );
//     };

//     const markAllAsRead = () => {
//         setNotifications(notifications.map((n) => ({ ...n, read: true })));
//     };

//     return (
//         <Popover
//             opened={opened}
//             onClose={() => setOpened(false)}
//             target={
//                 <Button
//                     variant="subtle"
//                     onClick={() => setOpened((o) => !o)}
//                     style={{ position: "relative" }}
//                 >
//                     {/* <Bell size={24} /> */}
//                     <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         width="16"
//                         height="16"
//                         fill="currentColor"
//                         class="bi bi-bell-fill"
//                         viewBox="0 0 16 16"
//                     >
//                         <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2m.995-14.901a1 1 0 1 0-1.99 0A5 5 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901" />
//                     </svg>
//                     {unreadCount > 0 && (
//                         <Badge
//                             color="red"
//                             size="sm"
//                             variant="filled"
//                             style={{ position: "absolute", top: 0, right: 0 }}
//                         >
//                             {unreadCount}
//                         </Badge>
//                     )}
//                 </Button>
//             }
//             width={300}
//             position="bottom"
//             withArrow
//         >
//             <Stack spacing="xs">
//                 <Group position="apart">
//                     <Text weight={500}>Notifications</Text>
//                     <Button variant="subtle" size="xs" onClick={markAllAsRead}>
//                         Alle als gelesen
//                     </Button>
//                 </Group>
//                 <ScrollArea style={{ height: 200 }}>
//                     {notifications.map((n) => (
//                         <Group
//                             key={n.id}
//                             spacing="sm"
//                             style={{
//                                 padding: "8px",
//                                 backgroundColor: n.read ? "white" : "#f0f0f0",
//                                 borderRadius: 6,
//                                 cursor: "pointer",
//                             }}
//                             onClick={() => markAsRead(n.id)}
//                         >
//                             <Avatar color="blue" radius="xl">
//                                 {n.title[0]}
//                             </Avatar>
//                             <Text size="sm">{n.title}</Text>
//                         </Group>
//                     ))}
//                 </ScrollArea>
//             </Stack>
//         </Popover>
//     );
// }
