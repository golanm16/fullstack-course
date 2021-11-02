let times_to_run = 0;
while (true) {
    times_to_run = prompt("how many days do you need to report");
    if (!isNaN(times_to_run)) {
        break;
    }
    console.log('need to be a number');
}
times_to_run = Number(times_to_run);
let sum = 0, count = 0, average = 0, today_measure = null;

for (i = 0; i < times_to_run; i++) {
    while (true) {
        today_measure = prompt("enter today temp measurement");
        if (!isNaN(today_measure) || today_measure.length === 0) {
            today_measure = Number(today_measure);
            break;
        }
        console.log('need to be a number');
    }
    if (count === 0) {
        average = today_measure;
    }
    let is_valid = true;
    if (today_measure - average > 20 || today_measure - average < -20) {
        while (true) {
            let input = prompt("are you sure you want to enter this measurement? y/n");
            if (input === 'y') {
                is_valid = true;
                break;
            }
            else if (input === 'n') {
                is_valid = false;
                i--;
                break;
            }
            console.log('need to enter a valid answer.');
        }
    }
    if (is_valid) {
        sum += today_measure;
        count++;
        average = sum / count;
    }
}
console.log('the average of the measurements is: ' + sum / count);

