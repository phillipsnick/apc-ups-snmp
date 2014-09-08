# APC UPS SNMP 

Library for reading values of APC UPS battery via the network.


## Installation

```
npm install apc-ups-snmp
```


## Usage

```javascript
var apcUps = require('apc-ups-snmp');

var ups = new apcUps({
  host: '' // IP Address/Hostname
});
```

A full range of examples can be found within the [examples directory](https://github.com/phillipsnick/apc-ups-snmp/tree/master/examples)


## Methods

Note that in the web GUI a number of values are reported with 1-2 decimal places. The SNMP implementation by APC does not support decimals.


### getModel(callback)

Get the UPS Model number, eg 'Smart-UPS 2200 RM'

__Arguments__

* `callback(err, model)` - Callback function for error/response handling

__Example__

```js
ups.getModel(function(err, model) {{
  if (err) {
    console.log(err);
    return;
  }

  console.log('The UPS model is:', model);
});
```

---------------------------------------

### getTemperature(callback)

Get the internal temperature of the UPS.

__Arguments__

* `callback(err, temperature)` - Callback function for error/response handling

__Example__

```js
ups.getTemperature(function(err, temperature) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('The current temperature is:', temp, 'C');
});
```

---------------------------------------

### getInputVoltage(callback)

Get the input voltage.

__Arguments__

* `callback(err, voltage)` - Callback function for error/response handling

__Example__

```js
ups.getInputVoltage(function(err, voltage) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('The current input voltage is:', voltage, 'VAC');
});
```

---------------------------------------

### getInputFrequency(callback)

Get the input frequency.

__Arguments__

* `callback(err, hz)` - Callback function for error/response handling

__Example__

```js
ups.getInputFrequency(function(err, hz) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('The current input frequency is:', hz, 'Hz');
});
```

---------------------------------------

### getOutputVoltage(callback)

Get the output voltage.

__Arguments__

* `callback(err, voltage)` - Callback function for error/response handling

__Example__

```js
ups.getOutputVoltage(function(err, voltage) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('The current output voltage is:', voltage, 'VAC');
});
```

---------------------------------------

### getOutputFrequency(callback)

Get the output frequency.

__Arguments__

* `callback(err, hz)` - Callback function for error/response handling

__Example__

```js
ups.getOutputFrequency(function(err, hz) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('The current output frequency is:', hz, 'Hz');
});
```

---------------------------------------

### getOutputLoadPercentage(callback)

Get the output load percentage.

__Arguments__

* `callback(err, percentage)` - Callback function for error/response handling

__Example__

```js
ups.getOutputLoadPercentage(function(err, percentage) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('The current load is:', percentage, '%');
});
```

---------------------------------------

### getOutputLoad(callback)

Get the output in amps.

__Arguments__

* `callback(err, amps)` - Callback function for error/response handling

__Example__

```js
ups.getOutputLoad(function(err, amps) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('The current load is:', amps, 'amps');
});
```

---------------------------------------

### getBatteryCapacity(callback)

Get the battery capacity percentage.

__Arguments__

* `callback(err, percentage)` - Callback function for error/response handling

__Example__

```js
ups.getBatteryCapacity(function(err, percentage) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('The current battery capacity is:', percentage, '%');
});
```

---------------------------------------

### getBatteryStatus(callback)

Get the battery status.

__Arguments__

* `callback(err, status)` - Callback function for error/response handling, see the table below for translated statuses. 

|Status|Translation|
|------|-----------|
|1|unknown|
|2|batteryNormal|
|3|batteryLow|
|4|batteryInFaultCondition|

The translated key is available within the library using `ups.batteryStatus[#]`, as shown in the example below.

__Example__

```javascript
ups.getBatteryStatus(function(err, status) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('The current battery status is', ups.batteryStatus[status], '(', status, ')');
});
```

---------------------------------------

### getBatteryRunTime(callback)

Get the battery runtime remaining in minutes.

__Arguments__

* `callback(err, percentage)` - Callback function for error/response handling

__Example__

```javascript
ups.getBatteryRunTime(function(err, minutes) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Expected battery run time is', minutes, 'minutes');
});
```

---------------------------------------

### getLastFailCause(callback)

Get the reason for last transfer to battery power.

__Arguments__

* `callback(err, failCause)` - Callback function for error/response handling, see the table below for translated causes.
 
|Fail Cause|Translation|
|----------|-----------|
|1|noTransfer|
|2|highLineVoltage|
|3|brownout|
|4|blackout|
|5|smallMomentarySag|
|6|deepMomentarySag|
|7|smallMomentarySpike|
|8|largeMomentarySpike|
|9|selfTest|
|10|rateOfVoltageChange|

The translated key is available within the library using `ups.failCause[#]`, as shown in the example below.

```javascript
ups.getLastFailCause(function(err, failCause) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('The last reason for transfer to battery power is,', apcUps.failCause[failCause], '(', failCause, ')');
});
```

---------------------------------------

### getBatteryReplaceIndicator(callback)

Get the battery replacement indicator.

__Arguments__

* `callback(err, failCause)` - Callback function for error/response handling, see the table below for translated indicators.

|Indicator|Translation|
|---------|-----------|
|1|noBatteryNeedsReplacing|
|2|batteryNeedsReplacing|

The translated key is available within the library using `ups.batteryIndicator[#]`, as shown in the example below.

```javascript
ups.getBatteryReplaceIndicator(function(err, indicator) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Battery replace indicator is', apcUps.batteryIndicator[indicator], '(', indicator, ')');
});
```

---------------------------------------

### getLastDiagnosticsTestDate(callback)

Get date self diagnostics was last run.

Note the date will be formatted as mm/dd/yy.

__Arguments__

* `callback(err, date)` - Callback function for error/response handling

__Example__

```javascript
ups.getLastDiagnosticsTestDate(function(err, date) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('The last diagnostics test was performed on', date, '(mm/dd/yy)');
});
```

---------------------------------------

### getLastDiagnosticsTestResult(callback)

Get the last self diagnostics result.

__Arguments__

* `callback(err, result)` - Callback function for error/response handling, see the table below for translated results.

|Result|Translation|
|------|-----------|
|1|ok|
|2|failed|
|3|invalidTest|
|4|testInProgress|

The translated key is available within the library using `ups.testResult[#]`, as shown in the example below.

__Example__

```javascript
ups.getLastDiagnosticsTestResult(function(err, result) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('The last diagnostics test result was', apcUps.testResult[result], '(', result, ')');
});
```


## Notes

Have only implemented a few basic values to begin with, have plans for a few more just need to find some time to add these in.

All the MIBs have been hard coded into this module, for more details see the PowerNet-MIB at ftp://ftp.apc.com/apc/public/software/pnetmib/mib/411/powernet411.mib


## Licence

[The MIT License (MIT)](https://github.com/phillipsnick/apc-ups-snmp/blob/master/LICENSE)
