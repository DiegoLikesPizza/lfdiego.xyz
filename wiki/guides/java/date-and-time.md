# Date and Time

Use **`java.time`** (Java 8+). Never `java.util.Date` or `Calendar` in new code: they're mutable, confusing (months start at 0) and not thread-safe. Output from `code/java/DateTime.java`, with "today" fixed to 27 September 2026.

## Which class?
| Class | Holds | Example |
|---|---|---|
| `LocalDate` | a date, no time, no zone | a birthday, a holiday |
| `LocalTime` | a time of day | opening hours 09:30 |
| `LocalDateTime` | date + time, no zone | "14:00 on 27 Sept", in *some* place |
| `ZonedDateTime` | date + time + time zone | a meeting in Berlin |
| `Instant` | a point on the global timeline (UTC) | timestamps, logs, database `created_at` |
| `Duration` | an amount of time in seconds/nanos | 8 h 30 min |
| `Period` | an amount in years/months/days | 19 years, 2 months |

Rule: store and transmit **`Instant`** (or UTC); convert to `ZonedDateTime` only for display.

## Dates
```java
LocalDate birthday = LocalDate.of(1815, 12, 10);                // Ada Lovelace
LocalDate today = LocalDate.of(2026, 9, 27);
System.out.println("age: " + Period.between(birthday, today).getYears() + " years");
System.out.println("next birthday in " + ChronoUnit.DAYS.between(today, birthday.withYear(2026)) + " days");
```
```
age: 210 years
next birthday in 74 days
plusMonths(1): 2026-10-27, day of week: SUNDAY, leap year: false
last day of month: 2026-09-30, next Monday: 2026-09-28
```
All `java.time` objects are **immutable**: `plusMonths` returns a new date. Real code gets today with `LocalDate.now()` (or `LocalDate.now(clock)` for testable code: inject a `Clock`).

## Time zones and daylight saving time
```java
ZonedDateTime berlin = meeting.atZone(ZoneId.of("Europe/Berlin"));
ZonedDateTime newYork = berlin.withZoneSameInstant(ZoneId.of("America/New_York"));
```
```
opening + 90 min: 11:00, meeting: 2026-09-27T14:00
Berlin 2026-09-27T14:00+02:00[Europe/Berlin] = New York 08:00
as Instant (UTC): 2026-09-27T12:00:00Z, epoch seconds: 1790510400
```
On 29 March 2026, German clocks jump from 02:00 to 03:00. `ZonedDateTime` knows:
```java
ZonedDateTime beforeDst = ZonedDateTime.of(2026, 3, 29, 1, 30, 0, 0, ZoneId.of("Europe/Berlin"));
beforeDst.plusHours(1);
```
```
1:30 + 1 hour on DST day: 03:30 (+02:00)
```
Use region IDs like `Europe/Berlin`, not fixed offsets like `+01:00`: offsets don't know about summer time.

## Durations
```java
Duration d = Duration.between(LocalTime.of(8, 15), LocalTime.of(16, 45));
```
```
work day: PT8H30M = 8 h 30 min
```
`PT8H30M` is ISO-8601 notation (period of time: 8 hours 30 minutes).

## Formatting and parsing
```java
DateTimeFormatter german = DateTimeFormatter.ofPattern("EEEE, d. MMMM yyyy", Locale.GERMAN);
today.format(german);
today.format(DateTimeFormatter.ofPattern("dd.MM.yyyy"));
LocalDate.parse("10.12.1815", DateTimeFormatter.ofPattern("dd.MM.yyyy"));
```
```
Sonntag, 27. September 2026 | 27.09.2026 | 2026-09-27
parse: 1815-12-10
```
| Pattern | Means |
|---|---|
| `yyyy`, `MM`, `dd` | year, month, day (**`MM` month, `mm` minutes!**) |
| `HH:mm:ss` | 24-hour time |
| `EEEE`, `MMMM` | full day and month names (locale-dependent) |

Invalid dates are rejected:
```
invalid: Text '2026-02-30' could not be parsed: Invalid date 'FEBRUARY 30'
```
For APIs and databases use ISO-8601 (`2026-09-27`, `2026-09-27T12:00:00Z`): `toString()` and `parse()` without a formatter use it.

## Converting from legacy types
`date.toInstant()`, `Date.from(instant)`, `resultSet.getObject("created_at", OffsetDateTime.class)`. JDBC drivers and JSON libraries (Jackson with `jackson-datatype-jsr310`) support `java.time` directly.
