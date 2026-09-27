import java.time.*;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.time.temporal.TemporalAdjusters;
import java.util.Locale;

public class DateTime {
    public static void main(String[] args) {
        LocalDate birthday = LocalDate.of(1815, 12, 10);                // Ada Lovelace
        LocalDate today = LocalDate.of(2026, 9, 27);                  // fixed, so the output is reproducible
        System.out.println("age: " + Period.between(birthday, today).getYears() + " years");
        System.out.println("next birthday in " + ChronoUnit.DAYS.between(today, birthday.withYear(2026)) + " days"); 
        System.out.println("plusMonths(1): " + today.plusMonths(1) + ", day of week: " + today.getDayOfWeek() + ", leap year: " + today.isLeapYear());
        System.out.println("last day of month: " + today.with(TemporalAdjusters.lastDayOfMonth()) + ", next Monday: " + today.with(TemporalAdjusters.next(DayOfWeek.MONDAY)));

        LocalTime opening = LocalTime.of(9, 30);
        LocalDateTime meeting = LocalDateTime.of(today, LocalTime.of(14, 0));
        System.out.println("opening + 90 min: " + opening.plusMinutes(90) + ", meeting: " + meeting);

        ZonedDateTime berlin = meeting.atZone(ZoneId.of("Europe/Berlin"));
        ZonedDateTime newYork = berlin.withZoneSameInstant(ZoneId.of("America/New_York"));
        System.out.println("Berlin " + berlin + " = New York " + newYork.toLocalTime());
        Instant instant = berlin.toInstant();
        System.out.println("as Instant (UTC): " + instant + ", epoch seconds: " + instant.getEpochSecond());

        // daylight saving time: 29 March 2026, 02:00 -> 03:00 in Germany
        ZonedDateTime beforeDst = ZonedDateTime.of(2026, 3, 29, 1, 30, 0, 0, ZoneId.of("Europe/Berlin"));
        System.out.println("1:30 + 1 hour on DST day: " + beforeDst.plusHours(1).toLocalTime() + " (" + beforeDst.plusHours(1).getOffset() + ")");

        Duration d = Duration.between(LocalTime.of(8, 15), LocalTime.of(16, 45));
        System.out.println("work day: " + d + " = " + d.toHours() + " h " + d.toMinutesPart() + " min");

        DateTimeFormatter german = DateTimeFormatter.ofPattern("EEEE, d. MMMM yyyy", Locale.GERMAN);
        DateTimeFormatter iso = DateTimeFormatter.ISO_LOCAL_DATE;
        System.out.println(today.format(german) + " | " + today.format(DateTimeFormatter.ofPattern("dd.MM.yyyy")) + " | " + today.format(iso));
        System.out.println("parse: " + LocalDate.parse("10.12.1815", DateTimeFormatter.ofPattern("dd.MM.yyyy")));
        try {
            LocalDate.parse("2026-02-30");
        } catch (DateTimeException e) {
            System.out.println("invalid: " + e.getMessage());
        }
    }
}
