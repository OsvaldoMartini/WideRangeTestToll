package uk.nhs.bcss.security;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.concurrent.TimeUnit;

public class MillissecondsCalculator {

	public static Long MillisecondsFromDays(int i) {
    	LocalDate localDate = LocalDate.now().plusDays(i);
    	LocalDateTime tomorrowStartOfDay = localDate.atStartOfDay();
    	
    	LocalDateTime d1 = LocalDateTime.now();
    	//LocalDateTime d2 = LocalDateTime.parse("19/07/06 00:00:00", DateTimeFormatter.ofPattern("yy/MM/dd HH:mm:ss"));

    	long days = d1.until(tomorrowStartOfDay, ChronoUnit.DAYS);
    	d1 = d1.plusDays(days);
    	long hours = d1.until(tomorrowStartOfDay, ChronoUnit.HOURS);
    	d1 = d1.plusHours(hours);
    	long minutes = d1.until(tomorrowStartOfDay, ChronoUnit.MINUTES);
    	d1 = d1.plusMinutes(minutes);
    	long seconds = d1.until(tomorrowStartOfDay, ChronoUnit.SECONDS);
    	//long milliseconds = d1.until(tomorrowStartOfDay, ChronoUnit.MILLIS);
    	
    	long daysMilli = TimeUnit.DAYS.toMillis(days);     
    	long minutesMilli = TimeUnit.MINUTES.toMillis(minutes); 
    	long hoursMilli = TimeUnit.HOURS.toMillis(hours);    
    	long secodsMilli = TimeUnit.SECONDS.toMillis(seconds);
    	return daysMilli + minutesMilli + hoursMilli + secodsMilli;
	}
}
