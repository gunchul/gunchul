
const POSE_DOWN = 0;
const POSE_UP = 1;
const POSE_START = 2;
const POSE_STOP = 3;
const POSE_COUNT_MAX = 100;

var pos_count = 0;
var pose_last_state = POSE_STOP; /* 0:DOWN, 1:UP, 2:START, 3:STOP */

function pos_winner(val0, val1, val2, val3)
{
    let max_val = val0;
    let max_index = 0;

    if (max_val < val1)
    {
        max_val = val1;
        max_index = 1;
    }
    if (max_val < val2)
    {
        max_val = val2;
        max_index = 2;
    }
    if (max_val < val3)
    {
        max_val = val3;
        max_index = 3;
    }
    return max_index;
}

/*
    STOP -> START
*/
function pose_state_do_at_down(state) {
    switch(state)
    {
        case POSE_DOWN:
            break;
        case POSE_UP:
            pos_count += 1;
            if (pos_count > POSE_COUNT_MAX)
            {
                pos_count = 0;
            }
            pose_last_state = state;
            break;
        case POSE_START:
            break;
        case POSE_STOP:
            pose_last_state = state;
            break;
    }
}

function pose_state_do_at_up(state) {
    switch(state)
    {
        case POSE_DOWN:
            pose_last_state = state;
            break;
        case POSE_UP:
            break;
        case POSE_START:
            break;
        case POSE_STOP:
            pose_last_state = state;
            break;
    }
}

function pose_state_do_at_start(state) {
    switch(state)
    {
        case POSE_DOWN:
            pose_last_state = state;
            pos_count = 0;
            break;
        case POSE_UP:
            break;
        case POSE_START:
            break;
        case POSE_STOP:
            break;
    }
}

function pose_state_do_at_stop(state) {
    switch(state)
    {
        case POSE_DOWN:
            break;
        case POSE_UP:
            break;
        case POSE_START:
            pose_last_state = state;
            break;
        case POSE_STOP:
            break;
    }
}

function pose_state(state) {
    var was = pose_last_state;
    if (pose_last_state == state)
    {
        return was != pose_last_state;
    }
    switch(pose_last_state)
    {
        case POSE_DOWN:
            pose_state_do_at_down();
            break;
        case POSE_UP:
            pose_state_do_at_up();
            break;
        case POSE_START:
            pose_state_do_at_start();
            break;
        case POSE_STOP:
            pose_state_do_at_stop();
            break;
    }
    return was != pose_last_state;
}

function pose_state_get() {
    return pose_last_state;
}

function pose_count_get() {
    return pos_count;
}
