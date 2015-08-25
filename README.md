# aivis

This is a simple application to create TODO list of today's calls. Application
consists of just one page and there is no need for some middleware or backend.

## Build & development

Run `grunt` for building and `grunt serve` for preview.

## Testing

Running `grunt test` will run the unit tests with karma.

## Features

### Add Call

Section to add new record of call. It consists of these inputs:

* name ­ validate for max. of 30 characters
* phone number ­ see phone number validation below
* time ­ just time, in mm:ss format

Phone number validation ­ each phone number should start with '+', or '00' string followed by
digit characters or characters '(', ')', '­'. You should ignore all whitespaces when storing
record and convert first letter '+' to '00' (there should be just one format to display phone
number). Characters '(',')' and '­' can be used just once and should be just on position 2 to 8
in the string.

Example of valid phone numbers to store:

* +(420) 111 222 333
* +(420)­111222333
* +420111222333
* 00420111222333

Stored and display format of phone number ­ 00XXX XXX XXX
Store all data to local storage.

### List of calls

Display list of calls stored by user as shown in wireframe.
Header consists of name (sortable), phone number, time (sortable).

Each row consists of these columns:

* name
* phone number
* time
* delete action ­ deletes this record from storage
* checkbox ­ disabled, checked if the time of call < current time

Default sort of list is by time ASC. User can sort by name and time.

Below the table are 3 buttons

* all ­ display all records in list
* next ­ display just calls in future
* finished ­ display just calls in past

### Next call

This section should show to the user the next call of the day.
In the ordered list of calls (by time ASC) find first record where time of call > current time and
display that record.

## Live demo
Demo can be found [here](http://labored-flame.surge.sh/#/)