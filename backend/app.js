
client.calls
  .create({
    to: "+918943713703",
    from: "+13159083441",
    twiml: '<Response><Say voice="alice">Accident alert! A User has encountered an accident at Christ College of Engineering, Irinjalakuda. Check your whatsapp for further location</Say></Response>',
  })
  .then(call => console.log(`Call initiated with SID: ${call.sid}`))
  .catch(error => console.error('Error:', error));
