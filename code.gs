function niceTime2(time) {
return Utilities.formatDate(time, Session.getTimeZone(),"M/d HH:mm");
}                     
                     
function sendAgenda() {
  var emailTemplate = '<h1 style="font-family: Segoe UI, Arial, sans-serif;">Today\'s Calendar Entries</h1><table border="1" cellpadding="5" cellspacing="0" style="border-collapse:collapse; font-family: Segoe UI, Arial, sans-serif; background-color:lightgoldenrodyellow; border:5px solid darkolivegreen; color:darkolivegreen;"><EVENTS></table>';                       
 
  var eventTemplate = '<tr valign="top"><td width="20%"><nobr><START></nobr> until <nobr><END></nobr></td><td width="20%"><b><TITLE></b></td><td width="40%"><DESCRIPTION></td><td width="20%"><LOC></td></tr>';
                          
  // Get today's events
  var now = new Date();
  var events = CalendarApp.getDefaultCalendar().getEventsForDay(now);
  var eventLines = "";
  var titl = "";
  var startTime = "";
  var endTime = "";
  // Add each event to the email
  for (var e in events) {
    var event = events[e];
    var allDayP = event.isAllDayEvent();
    if (allDayP)
    {
      titl = '<font color="red">' + event.getTitle() + '</font>';  
      if (Utilities.formatDate(event.getStartTime(), Session.getTimeZone(),"M/d") == Utilities.formatDate(now, Session.getTimeZone(),"M/d"))
      {
      startTime = "All Day Event The Next Day";
      endTime = Utilities.formatDate(event.getEndTime(), Session.getTimeZone(),"M/d")
      }
      else
      {
      startTime = "All Day Event Today";
      endTime = Utilities.formatDate(event.getEndTime(), Session.getTimeZone(),"M/d")
      }
    }  
    else
    {   
      titl = event.getTitle();
      startTime = niceTime2(event.getStartTime());
      endTime = niceTime2(event.getEndTime());
    }
    eventLines += eventTemplate
    .replace("<TITLE>", titl)
    .replace("<DESCRIPTION>", event.getDescription())
    .replace("<START>", startTime)
    .replace("<END>", endTime)
    .replace("<LOC>", event.getLocation());    
  }
  var email = emailTemplate.replace("<EVENTS>", eventLines);
  MailApp.sendEmail(Session.getUser().getEmail(), "My Calendar Listings for " + Utilities.formatDate(now, Session.getTimeZone(),"M/d/yyyy"), "", {"htmlBody" : email});
  //Send email to wife...
  //MailApp.sendEmail("user@domain.com", "Your Hubby's Calendar Listings for " + now.toLocaleDateString(), "", {"htmlBody" : email});
}