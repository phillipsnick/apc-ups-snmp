var apcUps = require('../lib/app')
  , config = require('./config');

var ups = new apcUps(config);

/**
 * Get the UPS model name (e.g. 'APC Smart-UPS 600')
 */
ups.getModel(function(err, model) {
  if (err) {
    console.log(err.toString());
    return;
  }

  console.log('The UPS model is:', model);
});

/**
 * Get the current internal UPS temperature expressed in Celsius.
 */
ups.getTemperature(function(err, temp) {
  if (err) {
    console.log(err.toString());
    return;
  }

  console.log('The current temperature is:', temp, 'C');
});

/**
 * Get the current utility line voltage in VAC
 */
ups.getInputVoltage(function(err, voltage) {
  if (err) {
    console.log(err.toString());
    return;
  }

  console.log('The current input voltage is:', voltage, 'VAC');
});

/**
 * Get the current input frequency to the UPS system in Hz.
 */
ups.getInputFrequency(function(err, hz) {
  if (err) {
    console.log(err.toString());
    return;
  }

  console.log('The current input frequency is:', hz, 'Hz');
});

/**
 * Get the output voltage of the UPS system in VAC.
 */
ups.getOutputVoltage(function(err, voltage) {
  if (err) {
    console.log(err.toString());
    return;
  }

  console.log('The current output voltage is:', voltage, 'VAC');
});

/**
 * Get the current output frequency to the UPS system in Hz.
 */
ups.getOutputFrequency(function(err, hz) {
  if (err) {
    console.log(err.toString());
    return;
  }

  console.log('The current output frequency is:', hz, 'Hz');
});

/**
 * Get the current UPS load expressed in percent of rated capacity.
 */
ups.getOutputLoadPercentage(function(err, percentage) {
  if (err) {
    console.log(err.toString());
    return;
  }

  console.log('The current load is:', percentage, '%');
});

/**
 * Get the current in amperes drawn by the load on the UPS
 */
ups.getOutputLoad(function(err, amps) {
  if (err) {
    console.log(err.toString());
    return;
  }

  console.log('The current load is:', amps, 'amps');
});

/**
 * Get the remaining battery capacity expressed in percent of full capacity.
 */
ups.getBatteryCapacity(function(err, capacity) {
  if (err) {
    console.log(err.toString());
    return;
  }

  console.log('The current battery capacity is:', capacity, '%');
});

/**
 * Get the battery status
 */
ups.getBatteryStatus(function(err, status) {
  if (err) {
    console.log(err.toString());
    return;
  }

  console.log('The current battery status is', apcUps.batteryStatus[status], '(', status, ')');
});

/**
 * Get the UPS battery run time remaining before battery exhaustion
 */
ups.getBatteryRunTime(function(err, minutes) {
  if (err) {
    console.log(err.toString());
    return;
  }

  console.log('Expected battery run time is', minutes, 'minutes');
});

/**
 * The reason for the occurrence of the last transfer to UPS battery power.
 */
ups.getLastFailCause(function(err, failCause) {
  if (err) {
    console.log(err.toString());
    return;
  }

  console.log('The last reason for transfer to battery power is,', apcUps.failCause[failCause], '(', failCause, ')');
});

/**
 * Get the UPS battery replace indicator
 */
ups.getBatteryReplaceIndicator(function(err, indicator) {
  if (err) {
    console.log(err.toString());
    return;
  }

  console.log('Battery replace indicator is', apcUps.batteryIndicator[indicator], '(', indicator, ')');
});

/**
 * The date the last UPS diagnostics test was performed in mm/dd/yy format.
 */
ups.getLastDiagnosticsTestDate(function(err, date) {
  if (err) {
    console.log(err.toString());
    return;
  }

  console.log('The last diagnostics test was performed on', date, '(mm/dd/yy)');
});

/**
 * Get the results of the last UPS diagnostics test performed
 */
ups.getLastDiagnosticsTestResult(function(err, result) {
  if (err) {
    console.log(err.toString());
    return;
  }

  console.log('The last diagnostics test result was', apcUps.testResult[result], '(', result, ')');
})