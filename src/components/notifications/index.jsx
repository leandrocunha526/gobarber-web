import React, { useState, useEffect, useMemo, useRef } from "react";
import { formatDistance, parseISO } from "date-fns";
import pt from "date-fns/locale/pt";
import { MdNotifications } from "react-icons/md";
import api from "../../services/api";

import {
    Container,
    Badge,
    NotificationList,
    Scroll,
    Notification,
} from "./styles";

export default function Notifications() {
    const [visible, setVisible] = useState(false);
    const [notifications, setNotifications] = useState([]);

    const notificationsComp = useRef(null);

    function handleGlobalClick(e) {
        const clickedOutsideComponent = !notificationsComp.current.contains(
            e.target,
        );

        if (clickedOutsideComponent) {
            setVisible(false);
        }
    }

    function handleGlobalKeyPress(e) {
        if (e.key === "Escape") {
            setVisible(false);
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleGlobalClick, false);
        document.addEventListener("keydown", handleGlobalKeyPress, false);

        async function loadNotifications() {
            const response = await api.get("/notification");
            const data = response.data.map((notification) => ({
                ...notification,
                timeDistance: formatDistance(
                    parseISO(notification.created_at),
                    new Date(),
                    {
                        addSuffix: true,
                        locale: pt,
                    },
                ),
            }));
            setNotifications(data);
        }

        loadNotifications();

        return () => {
            document.removeEventListener("mousedown", handleGlobalClick, false);
            document.removeEventListener(
                "keydown",
                handleGlobalKeyPress,
                false,
            );
        };
    }, []);

    const hasUnread = useMemo(
        () => !!notifications.find((notification) => !notification.read),
        [notifications],
    );

    async function handleMarkAsRead(id) {
        await api.put(`/notification/${id}`);
        const newNotifications = notifications.map((notification) => {
            return notification._id === id
                ? { ...notification, read: true }
                : notification;
        });
        setNotifications(newNotifications);
    }

    function handleToggleVisible() {
        setVisible(!visible);
    }

    return (
        <Container>
            <Badge hasUnread={hasUnread} onClick={handleToggleVisible}>
                <MdNotifications color="#7159c1" size={20} />
            </Badge>
            <NotificationList ref={notificationsComp} visible={visible}>
                <Scroll>
                    {notifications.length === 0 ? (
                        <Notification>
                            <p>Nenhuma notificação</p>
                        </Notification>
                    ) : (
                        notifications.map((notification) => (
                            <Notification
                                key={notification._id}
                                unread={!notification.read}
                            >
                                <p>{notification.content}</p>
                                <time>{notification.timeDistance}</time>
                                {!notification.read && (
                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleMarkAsRead(notification._id)
                                        }
                                    >
                                        Marcar como lida
                                    </button>
                                )}
                            </Notification>
                        ))
                    )}
                </Scroll>
            </NotificationList>
        </Container>
    );
}
