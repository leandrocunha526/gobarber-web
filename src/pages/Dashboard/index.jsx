import React, { useState, useEffect, useMemo } from "react";
import {
    format,
    subDays,
    addDays,
    setHours,
    setMinutes,
    setSeconds,
    setMilliseconds,
    isBefore,
    isEqual,
    parseISO,
} from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import api from "./../../services/api";
import pt from "date-fns/locale/pt";
import { Container, Time } from "./styles";

const range = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

export default function Dashboard() {
    const [schedule, setSchedule] = useState([]);
    const [date, setDate] = useState(new Date());

    const dateFormatted = useMemo(
        () => format(date, "d 'de' MMMM 'de' yyyy", { locale: pt }),
        [date],
    );

    useEffect(() => {
        async function loadScheduler() {
            const response = await api.get("schedule", {
                params: { date },
            });

            const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

            const data = range.map((hour) => {
                const checkDate = setMilliseconds(
                    setSeconds(setMinutes(setHours(date, hour), 0), 0),
                    0,
                );
                const compareDate = utcToZonedTime(checkDate, timezone);

                return {
                    time: `${hour}:00h`,
                    past: isBefore(compareDate, new Date()),
                    appointment: response.data.find((a) =>
                        isEqual(parseISO(a.date), compareDate),
                    ),
                };
            });

            setSchedule(data);
        }
        loadScheduler();
    }, [date]);

    function handlePrevDay() {
        setDate(subDays(date, 1));
    }

    function handleNextDay() {
        setDate(addDays(date, 1));
    }

    return (
        <Container>
            <header>
                <button type="button" onClick={handlePrevDay}>
                    <MdChevronLeft size={36} color="#fff" />
                </button>
                <strong>{dateFormatted}</strong>
                <button type="button" onClick={handleNextDay}>
                    <MdChevronRight size={36} color="#fff" />
                </button>
            </header>

            {schedule.length === 0 ? (
                <p style={{ color: "white", textAlign: "center" }}>
                    Não há horários disponíveis para o dia selecionado.
                </p>
            ) : (
                <ul>
                    {schedule.map((time) => (
                        <Time
                            key={time.time}
                            past={time.past}
                            available={!time.appointment}
                        >
                            <strong>{time.time}</strong>
                            {time.appointment ? (
                                <span>{time.appointment.user.name}</span>
                            ) : (
                                <span>Em aberto</span>
                            )}
                        </Time>
                    ))}
                </ul>
            )}
        </Container>
    );
}
